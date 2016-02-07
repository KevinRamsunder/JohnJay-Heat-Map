function init() {
  var map = L.map('map', {
    maxZoom: 3,
    minZoom: 1,
    crs: L.CRS.Simple
  }).setView([0,0], 1);

  map.setMaxBounds(new L.LatLngBounds([0,510], [550,0]));

  var imageUrl = '../images/10th floor.jpg'
  var imageBounds = [[500,0], [0,500]];

  L.imageOverlay(imageUrl, imageBounds).addTo(map);

//[south,west], [north,east]
var redBounds = [[233,230], [279,275]];
var hotRectangle = L.rectangle(redBounds,{color:'#f00',fillOpacity: 0.5}).addTo(map);

//[south,west], [north,east]
var blueBounds = [[233,275], [279,320]];
var coldRectangle = L.rectangle(blueBounds,{color:'#00f',fillOpacity: 0.5}).addTo(map);
  
}

init();
