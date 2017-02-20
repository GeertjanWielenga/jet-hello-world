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
			self.newBeerImage = ko.observable();
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
			  var name = self.newBeerItem();
			  var url = "http://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=dc6zaTOxFJmzC";
			  var xhr = new XMLHttpRequest();
			  xhr.onload = function () {
				if (xhr.readyState == 4 && xhr.status == 200) {
				  var response = JSON.parse(xhr.responseText);
				  var data = response.data;
				  self.newBeerImage(data[0].images.downsized.url);
				}
			  };
			  xhr.open('GET', url, false);
			  xhr.send();
			  self.beerCollection.add(
					  {
						name: self.newBeerItem(),
						image: self.newBeerImage()
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
