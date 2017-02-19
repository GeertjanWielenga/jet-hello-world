define(['ojs/ojcore'], function (oj) {
  var BeerService = {
	resourceUrl: 'http://localhost:8080/good-beers',
	createBeerModel: function () {
	  var Beer = oj.Model.extend({
		urlRoot: this.resourceUrl,
		idAttribute: "name",
		parse: function (response) {
		  var tags = [];
		  var responseName = response.name;
		  var name = response.name.replace(/ /g, '+');
		  var url = "http://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=dc6zaTOxFJmzC";
		  var xhr = new XMLHttpRequest();
		  xhr.onload = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
			  var response = JSON.parse(xhr.responseText);
			  var data = response.data;
			  tags.push({
				name: responseName,
				image: data[0].images.downsized.url
			  });
			  console.log(name + ": " + data[0].images.downsized.url);
			}
		  };
		  xhr.open('GET', url, false);
		  xhr.send();
		  return tags;
		}
	  });
	  return new Beer();
	},
	createBeerCollection: function () {
	  var Beers = oj.Collection.extend({
		url: this.resourceUrl,
		model: this.createBeerModel()
	  });
	  return new Beers();
	}
  };
  return BeerService;
});