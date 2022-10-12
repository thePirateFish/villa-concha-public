import React from 'react'
import styles from './split-view-centered.module.css'
import Button from './button'
import urlFor from '../util/image-url-builder'

const SplitViewCentered = ({ children }) => {


    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <div className={styles.subtitle}>
                    {data.subtitle}
                </div>
                <div className={styles.title}>
                    {data.title}
                </div>
                <div className={styles.body}>
                    {data.body}
                </div>
                <Button text={data.links[0].text} linkDest={data.links[0].dest} primary={true} />
            </div>
            <div className={styles.right}>
                <div className={styles.topRight}>
                    <picture>
                        <source srcSet={data.images[0].asset.fluid.srcSetWebp} type="image/webp" sizes="32vw" />
                        <source srcSet={data.images[0].asset.fluid.srcSet} type="image/jpeg" sizes="32vw" />
                        <img className={styles.exploreImg} src={urlFor(data.images[0]).rect(271, 5, 6000, 3000).width(500).format('jpg')} />
                    </picture>
                </div>
                <div className={styles.bottomRight}>
                    <picture>
                        <source srcSet={data.images[1].asset.fluid.srcSetWebp} type="image/webp" sizes="32vw" />
                        <source srcSet={data.images[1].asset.fluid.srcSet} type="image/jpeg" sizes="32vw" />
                        <img className={styles.exploreImg} src={urlFor(data.images[1]).rect(1280, 848, 6000, 3500).width(500).format('jpg')} />
                    </picture>
                </div>
            </div>
        </div>
    )
}

export default SplitViewTwoImages