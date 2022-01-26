import React from 'react';
import ReactMapGL ,{ Marker ,Popup } from 'react-map-gl';
import { useState } from 'react';
import  getCenter from 'geolib/es/getCenter';


function Map({ searchResults }) {
  
    const [selectedLocation , setSelectedLocation] = useState({});
    //transforming search results into an object
    // in the form { latitude: 51.5, longitude: 7.4 } using the map method.
     const coordinates = searchResults.map(result => ({
         longitude: result.long,
         latitude : result.lat
     }));
    //  console.log(coordinates);

     const center = getCenter(coordinates);
     //console.log(center);

     const [ viewport , setViewPort] = useState({
        width : '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11
    });

  return (
  <ReactMapGL 
  className = ""
   mapStyle= 'mapbox://styles/muwongelawrence/ckyvhxc5e003914pdgkn3zj8m'
   mapboxApiAccessToken = { process.env.mapbox_key }
   { ...viewport }
   onViewportChange={(nextViewport) => setViewPort(nextViewport)}
  >
      {/* adding a marker to the searchResults */}
      { searchResults.map(result => (
            <div key = { result.long }>
                <Marker
                  longitude={result.long}
                  latitude={ result.lat }
                  offsetTop={ -20 }
                  offsetTop = { -10 }
                >
                     <p 
                     role = 'img'
                     onClick = {() => setSelectedLocation(result)}
                     className = " cursor-pointer text-2xl animate-bounce"
                     aria-label = "push -pin"
                     >
                         📌️
                    </p>
                </Marker>

                {/* popup when we click on a marker */}
                { selectedLocation.long === result.long ? (
                         <Popup
                           closeOnClick = { true } 
                           onClose = {() => setSelectedLocation({})}
                           latitude={result.lat}
                           longitude={result.long}
                         >
                           { result .title }  
                         </Popup>
                ): (false)}
            </div>
      ))}

  </ReactMapGL>
  );
}

export default Map;
