var layers = new Array();

function init() {
  var map = L.map('map', {
    maxZoom: 3.6,
    minZoom: 1,
    center:[-165,308],//DONT FORGET TO CHANGE THIS TO 0,0
    zoom:1,//DONT FORGET TO CHANGE THIS TO 1
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

  layers.push(L.polygon([[-52.5,75.5],[-95.5,75.5],[-95.5,94],[-71,94],[-71,103],[-52.5,103]],{color:'red',fillOpacity: 0.5}).addTo(map));
  layers.push(L.rectangle([[-71,104], [-52.5,148]],{color:'green',fillOpacity: 0.5}).addTo(map));
  layers.push(L.rectangle([[-71,148.5], [-52.5,192.5]],{color:'blue',fillOpacity: 0.5}).addTo(map));
  layers.push(L.rectangle([[-71,193], [-52.5,237]],{color:'yellow',fillOpacity: 0.5}).addTo(map));
  layers.push(L.rectangle([[-71,238], [-52.5,281]],{color:'black',fillOpacity: 0.5}).addTo(map));
  layers.push(L.rectangle([[-80.5,282], [-52.5,315]],{color:'orange',fillOpacity: 0.5}).addTo(map))
  layers.push(L.rectangle([[-135,75.5], [-96,94]],{color:'aqua',fillOpacity: 0.5}).addTo(map));
  layers.push(L.rectangle([[-165,75.5], [-136,94]],{color:'purple',fillOpacity: 0.5}).addTo(map));
  layers.push(L.polygon([[-80.5,105],[-94.5,105],[-94.5,133],[-118,133],[-118,144.5],[-109,145],[-109,166],[-80.5,166]],{color:'magenta',fillOpacity: 0.5}).addTo(map));
  layers.push(L.rectangle([[-150,104.5], [-119,144.5]],{color:'peru',fillOpacity: 0.5}).addTo(map));
  layers.push(L.rectangle([[-108,176.5], [-80.5,218]],{color:'red',fillOpacity: 0.5}).addTo(map));
  layers.push(L.rectangle([[-108.5,228], [-80.5,270]],{color:'green',fillOpacity: 0.5}).addTo(map));
  layers.push(L.polygon([[-81.5,281],[-318,281],[-318,315],[-235,315],[-235,308],[-164.5,308],[-164.5,315],[-81.5,315]],{color:'blue',fillOpacity: 0.5}).addTo(map));
  layers.push(L.rectangle([[-199.5,161.5], [-165.5,189.5]],{color:'yellow',fillOpacity: 0.5}).addTo(map));
  layers.push(L.rectangle([[-199.5,191], [-165.5,222.5]],{color:'black',fillOpacity: 0.5}).addTo(map));
  layers.push(L.rectangle([[-199.5,223], [-165.5,241.5]],{color:'orange',fillOpacity: 0.5}).addTo(map));
  layers.push(L.rectangle([[-234.5,242.5], [-165.5,265]],{color:'aqua',fillOpacity: 0.5}).addTo(map));
  layers.push(L.rectangle([[-234.5,161.5], [-200.5,190]],{color:'purple',fillOpacity: 0.5}).addTo(map));
  layers.push(L.rectangle([[-234.5,191], [-200.5,222.5]],{color:'magenta',fillOpacity: 0.5}).addTo(map));
  layers.push(L.rectangle([[-234.5,223], [-200.5,241.5]],{color:'peru',fillOpacity: 0.5}).addTo(map));
  layers.push(L.rectangle([[-264,75], [-235,94]],{color:'red',fillOpacity: 0.5}).addTo(map));
  layers.push(L.rectangle([[-303.5,75], [-265,94]],{color:'green',fillOpacity: 0.5}).addTo(map));
  layers.push(L.rectangle([[-291.5,104], [-250,145]],{color:'blue',fillOpacity: 0.5}).addTo(map));
  layers.push(L.polygon([[-260.75,168],[-290,168],[-290,190.5],[-279,191],[-279,195],[-268,195],[-268,176],[-260.75,176]],{color:'yellow',fillOpacity: 0.5}).addTo(map));
  layers.push(L.polygon([[-292.5,104.5],[-319,104.5],[-319,166],[-291,166],[-291,146],[-293,146]],{color:'black',fillOpacity: 0.5}).addTo(map));
  layers.push(L.rectangle([[-319.5,176.5], [-291,218]],{color:'orange',fillOpacity: 0.5}).addTo(map));
  layers.push(L.rectangle([[-319.5,228], [-291,270]],{color:'aqua',fillOpacity: 0.5}).addTo(map));
  layers.push(L.polygon([[-304,75],[-347.5,75],[-347.5,103],[-329,103],[-329,94],[-304,94]],{color:'purple',fillOpacity: 0.5}).addTo(map));
  layers.push(L.rectangle([[-347.5,104], [-329,147.5]],{color:'magenta',fillOpacity: 0.5}).addTo(map));
  layers.push(L.rectangle([[-347.5,148.5], [-329,192.5]],{color:'peru',fillOpacity: 0.5}).addTo(map));
  layers.push(L.rectangle([[-347.5,193.5], [-329,236.5]],{color:'red',fillOpacity: 0.5}).addTo(map));
  layers.push(L.rectangle([[-347.5,237.5], [-329,281.5]],{color:'green',fillOpacity: 0.5}).addTo(map));
  layers.push(L.rectangle([[-347.5,282], [-319,314.5]],{color:'yellow',fillOpacity: 0.5}).addTo(map));

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

