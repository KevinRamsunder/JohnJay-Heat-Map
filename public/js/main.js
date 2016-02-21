var layers = new Array();

function init() {
  var map = L.map('map', {
    maxZoom: 3.6,
    minZoom: 1,
    center:[-165,308],//DONT FORGET TO CHANGE THIS TO 0,0
    zoom:1,//DONT FORGET TO CHANGE THIS TO 1
    crs: L.CRS.Simple
  });

  var imageUrl = '../images/10thFloor.jpg';
  var width=2109,height=2271;

  var southWest = map.unproject([0, height], map.getMaxZoom()-1);
  var northEast = map.unproject([width, 0], map.getMaxZoom()-1);
  var bounds = new L.LatLngBounds(southWest, northEast);

  L.imageOverlay(imageUrl, bounds).addTo(map);
  map.setMaxBounds(bounds);

  var info = L.control();
  info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      return this._div;
  };

  info.update = function (latlong) {
    this._div.innerHTML = latlong;
  };

  map.on('mousemove',function(e){
    info.update(e.latlng);
  });

  info.addTo(map);


  var layers = new Array();
  var shape = L.polygon([[-52.5,75.5],[-95.5,75.5],[-95.5,94],[-71,94],[-71,103],[-52.5,103]],{color:'red',fillOpacity: 0.5});
  layers.push(shape).addTo(map);
}

init();

