import React from 'react'
import styles from './three-column-view.module.css'
import Button from './button'
import Picture from './picture'

const ThreeColumnView = (props) => {

    const { data, errors } = props
    const fluidImageTopLeft = data.images[0].asset.fluid
    const fluidImageMiddle = data.images[1].asset.fluid
    const fluidImageTopRight = data.images[2].asset.fluid
    const fluidImageBottomRight = data.images[3].asset.fluid

    return (
        <div className={styles.wrapper}>
            <div className={styles.leftTop}>
                <Picture fluid={fluidImageTopLeft} sizes={"20vw"} />
            </div>
            <div className={styles.leftMiddle}>
                <div className={styles.title}>
                    {data.subsections[0].title}
                </div>
                <div className={styles.body}>
                    {data.subsections[0].body}
                </div>
                <Button text={data.subsections[0].links[0].text} linkDest={data.subsections[0].links[0].dest} />
            </div>
            <div className={styles.leftBottom}>
                {/* left bottom text goes here*/}
            </div>
            <div className={styles.centerTop}>
                {/* center top text goes here */}
            </div>
            <div className={styles.centerMiddle}>
                <Picture fluid={fluidImageMiddle} sizes={"20vw"} />
            </div>
            <div className={styles.centerBottom}>
                <div className={styles.title}>
                    {data.subsections[1].title}
                </div>
                <div className={styles.body}>
                    {data.subsections[1].body}
                </div>
                <Button text={data.subsections[1].links[0].text} linkDest={data.subsections[1].links[0].dest} />
            </div>
            <div className={styles.rightTop}>
                <Picture fluid={fluidImageTopRight} sizes={"20vw"} />
            </div>
            <div className={styles.rightBottom}>
                <Picture fluid={fluidImageBottomRight} sizes={"20vw"} />
            </div>
        </div>
    )
}

export default ThreeColumnView