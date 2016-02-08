//function init() {
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
  

  var layers = new Array();

  layers.push(L.polygon([[-52.5,75.5],[-95.5,75.5],[-95.5,94],[-71,94],[-71,103],[-52.5,103]],{color:'#0f0',fillOpacity: 0.5}).addTo(map));
  layers.push(L.rectangle([[-71,104], [-52.5,148]],{color:'#f00',fillOpacity: 0.5}).addTo(map));
  layers.push(L.rectangle([[-71,148.5], [-52.5,192.5]],{color:'#00f',fillOpacity: 0.5}).addTo(map));
  layers.push(L.rectangle([[-71,193], [-52.5,237]],{color:'#ff0',fillOpacity: 0.5}).addTo(map));
  layers.push(L.rectangle([[-71,238], [-52.5,281]],{color:'#0f0',fillOpacity: 0.5}).addTo(map));
  layers.push(L.rectangle([[-80.5,282], [-52.5,315]],{color:'#f0f',fillOpacity: 0.5}).addTo(map))
  layers.push(L.rectangle([[-135,75.5], [-96,94]],{color:'#f0f',fillOpacity: 0.5}).addTo(map));
  layers.push(L.rectangle([[-165,75.5], [-136,94]],{color:'#3f8',fillOpacity: 0.5}).addTo(map));
//}

//init();
