import React from 'react'
import styles from './split-view-two-images.module.css'
import Button from './button'
import urlFor from '../util/image-url-builder'
import Picture from './picture'

const SplitViewTwoImages = (props) => {

    const { data, errors } = props

    if (errors) {
        return (
            <Layout>
                <GraphQLErrorList errors={errors} />
            </Layout>
        )
    }

    const fluidImageTopRight = data.images[0].asset.fluid
    const fluidImageBottomRight = data.images[1].asset.fluid

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
                    <Picture fluid={fluidImageTopRight} sizes={"32vw"} />
                </div>
                <div className={styles.bottomRight}>
                    <Picture fluid={fluidImageBottomRight} sizes={"32vw"} />
                </div>
            </div>
        </div>
    )
}

export default SplitViewTwoImages