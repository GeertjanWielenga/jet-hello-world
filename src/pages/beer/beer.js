define([
  'src/providers/beer-service',
  'ojs/ojcore', 'knockout', 'jquery',
  'src/app/appController', 'ojs/ojdialog',
  'ojs/ojlistview',
  'ojs/ojcollectiontabledatasource'],
		function (beerservice, oj, ko, $, app) {
		  function mainContentViewModel() {
			var self = this;
			self.newBeerItem = ko.observable();
			self.selectedItem = ko.observable(-1);
			self.selectedImage = ko.observable();
			self.beerCollection = beerservice.createBeerCollection();
			self.dataSource = new oj.CollectionTableDataSource(this.beerCollection);
			self.optionChangeListener = function (event, ui) {
			  if (ui.option === 'currentItem') {
				var newCurrentItem = ui.value;
				self.dataSource.get(newCurrentItem).
						then(function (rowObj) {
						  var obj = rowObj['data'];
						  self.selectedItem(obj.name);
						  self.selectedImage(obj.image);
						});
			  }
			};
			self.createNewBeer = function (event, ui) {
   			  $("#createDialog").ojDialog("open");
			};
			self.deleteSelectedBeer = function (event, ui) {
   			  self.beerCollection.get(self.selectedItem()).destroy();
			};
			self.editSelectedBeer = function (event, ui) {
   			  $("#confirmDialog").ojDialog("open");
			};
			self.saveNewBeer = function () {
			  self.beerCollection.add(
					  {
						name:'new beer ' + Math.random(),
						image:'src/css/images/avatar_24px.png'
					  }, 
					  { 
						at:0
					  }
					);
   			  $("#createDialog").ojDialog("close");
			};
			self.confirm = function () {
			  $("#confirmDialog").ojDialog("close");
			};
		  }
		  return new mainContentViewModel();
		}
);
