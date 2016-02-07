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
var redBounds = [[405,149], [430,213]];
var redRectangle = L.rectangle(redBounds,{color:'#f00',fillOpacity: 0.5}).addTo(map);

//[south,west], [north,east]
var blueBounds = [[405,214], [430,277]];
var blueRectangle = L.rectangle(blueBounds,{color:'#00f',fillOpacity: 0.5}).addTo(map);

//[south,west], [north,east]
var yellowBounds = [[405,278], [430,340]];
var yellowRectangle = L.rectangle(yellowBounds,{color:'#ff0',fillOpacity: 0.5}).addTo(map);

//[south,west], [north,east]
var greenBounds = [[405,341], [430,405]];
var greentRectangle = L.rectangle(greenBounds,{color:'#0f0',fillOpacity: 0.5}).addTo(map);  
}

init();
