leaflet-marker-direction
=============
<br>
Plugin for Leaflet to display the path and the direction of the marker <br>

Check out the [demo](https://jackzoushao.github.io/leaflet-marker-direction/examples/marker-direction.html)

Leaflet versions
-----
The plugin is based on Leaflet 1.0.0  or above

Usage
----
````js
// inite map
var map = L.map('map').setView([30.201479, 120.155908], 13);
L.tileLayer(...).addTo(map);

// your data
var list = [ 
             {"lon":"120.15261","lat":"30.182835"},
             {"lon":"120.152431666667","lat":"30.1828733333333"},
             {"lon":"120.15239","lat":"30.182755"},
             {"lon":"120.152303333333","lat":"30.1826566666667"}
           ];
// iterate your data       
for(var i in list){
    var img = new Image();
    img.src = './images/arrow3.png';
    var options = {
        label: 'your label',
        labelFlag: labelFlag,
        labelColor: 'black',
        img: img
    };
    
    // use angeMaker plugin
    var angleMarker = L.angleMarker(latlng, options);
    var angle = 0;
    
    // get angele between A(previousPoint) and B(nextPoint)
    angle = angleMarker.getAngle(previousLatLng, nextLanLng);
    
    // set angele A -> B
    angleMarker.setHeading(angle);
    map.addLayer(angleMarker);
}
````
### Options
*`label` Text near the your marker <br>
*`labelFlag` whethe to display the text <br>
*`labelColor` The color of the text <br>
*`img`  Your custom maker <br>
### update history
