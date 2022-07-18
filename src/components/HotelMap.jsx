import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const OPTIONS = {
    minZoom: 17,
    maxZoom: 18,
  }
  

function HotelMap(props) {
    let center = {
        lng: props.Long,
        lat: props.Lat
    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCnIpcIycG34L3IZtCsfdtgMA8Risrm0hA"
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        map.setZoom(18)
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            option= {OPTIONS}
            mapContainerStyle={containerStyle}
            center={center}
            zoom={18}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {}
        </GoogleMap>
    ) : <></>
}

export default HotelMap;