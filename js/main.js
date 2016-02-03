function init() {

  var map = L.map('map', {
      maxZoom: 3,
      minZoom: 1,
      crs: L.CRS.Simple
  }).setView([0, 0], 1);

  map.setMaxBounds(new L.LatLngBounds([0,550], [500,0]));

  var imageUrl = '/Users/alessandro/Documents/Research/Images/10th floor.jpg'
  var imageBounds = [[500,0], [0,500]];

  L.imageOverlay(imageUrl, imageBounds).addTo(map);
}

init();
