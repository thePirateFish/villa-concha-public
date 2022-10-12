import React from 'react'
import styles from './split-view-one-image-right.module.css'
import Icon from './icon'
import Picture from './picture'

const SplitViewOneImageRight = (props) => {

    const { data, errors } = props
    const fluidImage = data.images[0].asset.fluid

    return (

        <div className={styles.wrapper}>
            <div className={styles.title}>
                {data.title}
            </div>
            <div className={styles.bottom}>
                <div className={styles.left}>
                    <div className={styles.body}>
                        {data.body}
                    </div>
                    <table className={styles.stats}>
                        <tr>
                            <td>
                                <span className={styles.statsIcon}><Icon symbol={data.subsections[0].title.toLowerCase()} /></span>
                                {data.subsections[0].title}: {data.subsections[0].body}
                            </td>
                            <td>
                                <span className={styles.statsIcon}><Icon symbol={data.subsections[3].title.toLowerCase()} /></span>
                                {data.subsections[3].title}: {data.subsections[3].body}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className={styles.statsIcon}><Icon symbol={data.subsections[1].title.toLowerCase()} /></span>
                                {data.subsections[1].title}: {data.subsections[1].body}
                            </td>
                            <td>
                                <span className={styles.statsIcon}><Icon symbol={data.subsections[4].title.toLowerCase()} /></span>
                                {data.subsections[4].title}: {data.subsections[4].body}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className={styles.statsIcon}><Icon symbol={data.subsections[2].title.toLowerCase()} /></span>
                                {data.subsections[2].title}: {data.subsections[2].body}
                            </td>
                            <td>
                                <span className={styles.statsIcon}><Icon symbol={data.subsections[5].title.toLowerCase()} /></span>
                                {data.subsections[5].title}: {data.subsections[5].body}
                            </td>
                        </tr>
                    </table>
                </div>
                <div className={styles.right}>
                    <Picture fluid={fluidImage} sizes={"32vw"} />
                </div>

            </div>
            <hr className={styles.line} />
        </div>
    )
}

export default SplitViewOneImageRight