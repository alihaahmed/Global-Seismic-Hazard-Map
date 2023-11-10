# Deployment
Link to live site: https://alihaahmed.github.io/Global-Seismic-Hazard-Map/

# Background 
The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. This project leverages USGS data to develop a real-time map of all seismic hazard, activity and impact around the world in the past seven days.

The [USGS GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) provides earthquake data in a number of different formats, updated every 5 minutes. The JSON representation of this data was requested and pulled in with JavaScript's D3 library and the Leaflet library was used to create a map that plots all recent earthquakes using the geometric values/coordinates within the fetched JSON data. Logic has been set for adjusting data marker size and colour to reflect earthquake magnitude and depth; larger marker reflect earthquakes with higher magnitudes, whereas darker-coloured markers reflect earthquakes with greater depth on a green-red colour scale. Additional context is provided with the use of a legend and marker popups which indicate each earthquake's location, date, magnitude and depth when the associated marker is clicked.

![Screenshot 2023-11-09 203754](https://github.com/alihaahmed/leaflet-challenge/assets/131709158/2e129be1-618e-456c-a732-99f4c9bb6241)
