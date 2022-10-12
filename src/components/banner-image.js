import React from 'react'
import styles from './banner-image.module.css'
import { useMediaQuery } from 'react-responsive'

const BannerImage = ({ fluid, children, props }) => {

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 449px)' })

    var imageSizes = "100vw"

    if (isTabletOrMobile) {
        imageSizes = "200vw"
    }

    return (

        <div className={styles.wrapper}>
            <picture className={styles.picture}>
                <source srcSet={fluid.srcSetWebp} type="image/webp" sizes={imageSizes} />
                <source srcSet={fluid.srcSet} type="image/jpeg" sizes={imageSizes} />
                <img className={styles.image} src={fluid.src} />
            </picture>
            <div className={styles.children}>{children}</div>
        </div>
    )
}

export default BannerImage