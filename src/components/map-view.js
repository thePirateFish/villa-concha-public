import React from 'react'
import styles from './map-view.module.css'
import GoogleMap from 'google-map-react'
import MapMarker from './map-marker'

const MapView = (props) => {

    const { data, errors } = props

    if (errors) {
        return (
            <Layout>
                <GraphQLErrorList errors={errors} />
            </Layout>
        )
    }

    return (
        <div>
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <div className={styles.title}>
                        {data.title}
                    </div>
                    <div className={styles.body}>
                        {data.body}
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.map}>
                        <GoogleMap
                            apiKey={'AIzaSyB9gIwcF7J3rLRkH0nAglUHpD1WuBV86h0'}
                            center={[data.coordinates.lat, data.coordinates.lng]}
                            zoom={16}
                        >
                            <MapMarker lat={data.coordinates.lat} lng={data.coordinates.lng} />
                        </GoogleMap>
                    </div>
                </div>
            </div>
            <hr className={styles.line} />
        </div>
    )
}

export default MapView