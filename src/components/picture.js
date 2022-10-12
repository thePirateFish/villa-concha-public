import React from 'react'
import styles from './picture.module.css'

const Picture = ({ fluid, sizes, objectFit = 'cover' }) => {

    const imageStyle = {
        objectFit: objectFit
    }
    return (
        <div className={styles.wrapper}>
            <picture className={styles.picture}>
                <source srcSet={fluid.srcSetWebp} type="image/webp" sizes={sizes} />
                <source srcSet={fluid.srcSet} type="image/jpeg" sizes={sizes} />
                <img style={imageStyle} className={styles.image} src={fluid.src} />
            </picture>
        </div>
    )
}

export default Picture