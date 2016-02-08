function init() {
  var map = L.map('map', {
    maxZoom: 3.6,
    minZoom: 1,
    center:[0,0],
    zoom:1,
    crs: L.CRS.Simple
  });

  
  var imageUrl = '../images/10th floor.jpg';
  var width=2109,height=2271;

  var southWest = map.unproject([0, height], map.getMaxZoom()-1);
  var northEast = map.unproject([width, 0], map.getMaxZoom()-1);
  var bounds = new L.LatLngBounds(southWest, northEast);

  L.imageOverlay(imageUrl, bounds).addTo(map);
  map.setMaxBounds(bounds);

  console.log(southWest+" "+northEast);
  
  var redBounds = [[-71,104], [-52.5,148]];
  var redRectangle = L.rectangle(redBounds,{color:'#f00',fillOpacity: 0.5}).addTo(map);

  var blueBounds = [[-71,148.5], [-52.5,192.5]];
  var blueRectangle = L.rectangle(blueBounds,{color:'#00f',fillOpacity: 0.5}).addTo(map);

  var yellowBounds = [[-71,193], [-52.5,237]];
  var yellowRectangle = L.rectangle(yellowBounds,{color:'#ff0',fillOpacity: 0.5}).addTo(map);

  var greenBounds = [[-71,238], [-52.5,281]];
  var greentRectangle = L.rectangle(greenBounds,{color:'#0f0',fillOpacity: 0.5}).addTo(map);

  var polygon = L.polygon([[-52.5,75.5],[-95.5,75.5],[-95.5,94],[-71,94],[-71,103],[-52.5,103]],{color:'#0f0',fillOpacity: 0.5}).addTo(map);

}

init();
