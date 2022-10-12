import React from 'react'
import styles from './checkerboard-view.module.css'
import Picture from './picture'
import { useMediaQuery } from 'react-responsive'

const CheckerboardView = ({ textImagePairs, dataOne, dataTwo, picOne, picTwo, ...props }) => {

    const smallView = useMediaQuery({ query: '(max-width: 900px)' })

    var imageSizes = "35vw"

    if (smallView) {
        imageSizes = "100vw"
    }

    return (

        <div className={styles.wrapper}>
            {textImagePairs.map((pair, index) => {
                const { text, fluid } = pair
                const pictureElement = <div className={styles.image}><Picture fluid={fluid} sizes={imageSizes} objectFit={'cover'} /></div>
                const textElement = <div className={styles.text}>{text}</div>
                if (index % 2 == 0) {
                    return (
                        <div className={styles.row}>
                            {textElement}
                            {pictureElement}
                        </div>
                    )
                } else {
                    return (
                        <div className={styles.row}>
                            {pictureElement}
                            {textElement}
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default CheckerboardView