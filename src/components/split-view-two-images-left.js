import React from 'react'
import styles from './split-view-two-images-left.module.css'
import Button from './button'
import Picture from './picture'


const SplitViewTwoImagesLeft = (props) => {

    const {data, errors} = props


    const fluidImageTopLeft = data.images[0].asset.fluid
    const fluidImageBottomLeft = data.images[1].asset.fluid

    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <div className={styles.topLeft}>
                    <Picture fluid={fluidImageTopLeft} sizes={"32vw"} />
                </div>
                <div className={styles.bottomLeft}>
                    <Picture fluid={fluidImageBottomLeft} sizes={"32vw"} />
                </div>
                
            </div>
            <div className={styles.right}>
                <div className={styles.rightInner}>
            <div className={styles.subtitle}>
                    {data.subtitle}
                </div>
                <div className={styles.title}>
                    {data.title}
                </div>
                <div className={styles.body}>
                    {data.body}
                </div>
                <Button text={data.links[0].text} linkDest={data.links[0].dest} primary={true}/>
                </div>
            </div>
        </div>  
    )
}

export default SplitViewTwoImagesLeft