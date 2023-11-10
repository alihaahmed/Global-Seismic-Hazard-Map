// Create map object
let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
  });

// Add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(myMap);

// Load GeoJSON data
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Set logic to determine marker size
function markerSize(magnitude) {
    return magnitude * 7;
}

// Set logic to determine marker color by depth
function markerColor(depth) {
    if (depth < 10) return "lime";
    else if (depth < 30) return "greenyellow";
    else if (depth < 50) return "yellow";
    else if (depth < 70) return "orange";
    else if (depth < 90) return "orangered";
    else return "red";
}

// Fetch data with d3 
// Create geoJSON layer with retrieved data 
// onEachFeature option to give each feature a popup with earthquake location, time and magnitude data
// pointToLayer option to create circle markers, with marker size determined by earthquake magnitude and marker colour determined by earthquake depth
d3.json(url).then(function(data) {
    L.geoJSON(data, {
        onEachFeature:  function onEachFeature(feature, layer) {
            layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Date: ${new Date(feature.properties.time)}</p><hr><p>Magnitude: ${feature.properties.mag}</p><hr><p>Depth: ${feature.geometry.coordinates[2]}</p>`)
    },
        pointToLayer: function createMarker(feature, latlng) {
            var markerOptions = {
                radius: markerSize(feature.properties.mag),
                fillColor: markerColor(feature.geometry.coordinates[2]),
                color: "black",
                weight: 0.4,
                fillOpacity: 0.8
            }
            return L.circleMarker(latlng, markerOptions);
        }
    }).addTo(myMap);
});

// Set up legend
var legend = L.control({position: "bottomright"});
legend.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    depth_scale = [-10, 10, 30, 50, 70, 90];
    div.innerHTML = "<h3>Depth</h3>";

    for (var i=0; i < depth_scale.length; i++) {
        div.innerHTML += 
        '<i style="background:' + markerColor(depth_scale[i] + 1) + '"></i> ' +
            depth_scale[i] + (depth_scale[i + 1] ? '&ndash;' + depth_scale[i + 1] + '<br>' : '+');
    }
    return div;
};

// Add legend to map
legend.addTo(myMap);