import React from 'react'
import styles from './split-view-four-images.module.css'
import Button from './button'
import Picture from './picture'

const SplitViewFourImages = (props) => {

    const { data, errors } = props

    const fluidImageTopLeft = data.images[0].asset.fluid
    const fluidImageBottomLeft = data.images[1].asset.fluid
    const fluidImageTopRight = data.images[2].asset.fluid
    const fluidImageBottomRight = data.images[3].asset.fluid
    const sizes = "25vw"

    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <div className={styles.topLeft}>
                    <Picture fluid={fluidImageTopLeft} sizes={sizes} />
                </div>
                <div className={styles.bottomLeft}>
                    <Picture fluid={fluidImageBottomLeft} sizes={sizes} />
                </div>
                <div className={styles.topRight}>
                    <Picture fluid={fluidImageTopRight} sizes={sizes} />
                </div>
                <div className={styles.bottomRight}>
                    <Picture fluid={fluidImageBottomRight} sizes={sizes} />
                </div>

            </div>
            <div className={styles.right}>
                <div className={styles.rightInner}>
                    <div className={styles.subtitle}>
                        {data.subtitle}
                    </div>
                    <div className={styles.title}>
                        <span> {data.title.substr(0, data.title.indexOf(' '))}</span><br />
                        <span className={styles.titleLineTwo}>{data.title.substr(data.title.indexOf(' '))}</span>
                    </div>
                    <div className={styles.body}>
                        {data.body}
                    </div>
                    <Button text={data.links[0].text} linkDest={data.links[0].dest} primary={true} />
                </div>
            </div>
        </div>
    )
}

export default SplitViewFourImages