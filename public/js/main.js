$(document).ready(function() {
  var obj = {}
  var rooms = {}
  var vav = {}

  function init() {
    var map = L.map('map', {
      // maxZoom: 3.6,
      // minZoom: 1,
      // center: [-390, 150], //DONT FORGET TO CHANGE THIS TO 0,0
      // zoom: 1, //DONT FORGET TO CHANGE THIS TO 1
      // crs: L.CRS.Simple
    });

    var imageUrl = 'images/10th floor.jpg';
    var width = 2109,
    height = 2271;

    var southWest = map.unproject([0, height], map.getMaxZoom() - 1);
    var northEast = map.unproject([width, 0], map.getMaxZoom() - 1);
    var bounds = new L.LatLngBounds(southWest, northEast);

    var random_color_layer = L.imageOverlay(imageUrl, bounds)
    random_color_layer.addTo(map);
    map.setMaxBounds(bounds);

    $.ajax({
      url: "/json/floor_10/room_num.json",
      dataType: 'json',
      success: function(response) {
        rooms = response;

        addToMap(rooms, map);
        // removeFromMap(map)
      }
    });

    $.ajax({
      url: "/json/floor_10/vav.json",
      dataType: 'json',
      success: function(response) {
        vav = response;
      }
    });

    //right side
    L.polygon([
      [-81.5, 281],
      [-318, 281],
      [-318, 315],
      [-235, 315],
      [-235, 308],
      [-164.5, 308],
      [-164.5, 315],
      [-81.5, 315]
    ], {
      color: 'blue',
      fillOpacity: 0.5
    }).addTo(map);

    //10.T.02 Mens Toilet
    L.polygon([
      [-260.75, 168],
      [-290, 168],
      [-290, 190.5],
      [-279, 191],
      [-279, 195],
      [-268, 195],
      [-268, 176],
      [-260.75, 176]
    ], {
      color: 'blue',
      fillOpacity: 0.5
    }).addTo(map);

    // stair doesnt have room number
    // layers.push(L.rectangle([[-234.5,223], [-200.5,241.5]],{color:'peru',fillOpacity: 0.5}).addTo(map));

    var info = L.control();
    info.onAdd = function(map) {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      return this._div;
    };

    info.update = function(latlong) {
      this._div.innerHTML = latlong;
    };

    map.on('mousemove', function(e) {
      info.update(e.latlng);
    });

    info.addTo(map);

    // var vavBox = vav['47112'];

    // animation scaffolding
    // function animation() {
    //   $.each(roomObj, function(i, element) {
    //       setTimeout(function() {
    //         // remove room layers from map

    //         // change data: color and opacity

    //         // re-add
    //       }, 1000*i);
    //   });
    // };

    // animation();

    // read csv file
    $.ajax({
      type: "GET",
      url: "data/Room47102.csv",
      dataType: "text",
      success: function(data) {process(data);}
    });
  }

  function process(data) {
    var file = data.split(/\r\n|\n/);
    var lines = [];

    for (var i=1; i<file.length; i++) {
      var data = file[i].split(',');
      lines.push(data)
      // console.log(data[0]);
      // console.log(data[1]);
      // break;
    }

    // console.log(lines)
  }

  function addToMap(data, map) {
    for (var i in data) {
      rand_color = "#" + ((1 << 24) * Math.random() | 0).toString(16)
      if (data[i].length == 2) {
        obj[data[i]] = L.rectangle(data[i], {
          color: rand_color,
          fillOpacity: 0.7
        });
        obj[data[i]].addTo(map);
      } else {
        obj[data[i]] = L.polygon(data[i], {
          color: rand_color,
          fillOpacity: 0.7
        });
        obj[data[i]].addTo(map);
      }
    }
  }

  function removeFromMap(map) {
    for (var i in obj) {
      map.removeLayer(obj[i])
    }
  }
  // init();
});