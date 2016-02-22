var layers = new Array();

function init() {
  var map = L.map('map', {
    maxZoom: 3.6,
    minZoom: 1,
    center:[-390,150],//DONT FORGET TO CHANGE THIS TO 0,0
    zoom:2,//DONT FORGET TO CHANGE THIS TO 1
    crs: L.CRS.Simple
  });

  var imageUrl = 'images/10th floor.jpg';
  var width=2109,height=2271;

  var southWest = map.unproject([0, height], map.getMaxZoom()-1);
  var northEast = map.unproject([width, 0], map.getMaxZoom()-1);
  var bounds = new L.LatLngBounds(southWest, northEast);

  L.imageOverlay(imageUrl, bounds).addTo(map);
  map.setMaxBounds(bounds);

  var layers = new Array();

  for (var i in data) {
    rand_color = "#"+((1<<24)*Math.random()|0).toString(16)
    if (data[i].length == 2)
      layers.push(L.rectangle(data[i],{color:rand_color,fillOpacity: 0.7}).addTo(map));
    else{
      layers.push(L.polygon(data[i],{color:rand_color,fillOpacity: 0.7}).addTo(map));
    }
  }

  //right side
  layers.push(L.polygon([[-81.5,281],[-318,281],[-318,315],[-235,315],[-235,308],[-164.5,308],[-164.5,315],[-81.5,315]],{color:'blue',fillOpacity: 0.5}).addTo(map));

  //10.T.02 Mens Toilet
  layers.push(L.polygon([[-260.75,168],[-290,168],[-290,190.5],[-279,191],[-279,195],[-268,195],[-268,176],[-260.75,176]],{color:'blue',fillOpacity: 0.5}).addTo(map));

  // stair doesnt have room number
  // layers.push(L.rectangle([[-234.5,223], [-200.5,241.5]],{color:'peru',fillOpacity: 0.5}).addTo(map));


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
}

init();
