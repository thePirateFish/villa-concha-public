import React from 'react'
import styles from './map-subsection.module.css'
import GoogleMap from 'google-map-react'
import MapMarker from './map-marker'

const MapSubsection = (props) => {
    return (
        <div className={styles.map}>
            <GoogleMap
                apiKey={'AIzaSyB9gIwcF7J3rLRkH0nAglUHpD1WuBV86h0'}
                center={[props.lat, props.lng]}
                zoom={16}
            >
                <MapMarker lat={props.lat} lng={props.lng} />
            </GoogleMap>
        </div>
    )
}

export default MapSubsection