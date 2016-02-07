function init() {
  var map = L.map('map', {
    maxZoom: 3,
    minZoom: 1,
    crs: L.CRS.Simple
  }).setView([000,0], 1);

  map.setMaxBounds(new L.LatLngBounds([0,510], [550,0]));

  var imageUrl = '../images/10th floor.jpg'
  var imageBounds = [[500,0], [0,500]];

  L.imageOverlay(imageUrl, imageBounds).addTo(map);
}

init();
