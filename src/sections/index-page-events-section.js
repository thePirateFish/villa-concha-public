import React from 'react'
import styles from './index-page-events-section.module.css'
import TextSubsection from '../components/text-subsection'
import Title from '../components/title'
import Body from '../components/body'
import Button from '../components/button'
import Picture from '../components/picture'
const classNames = require('classnames');

const IndexPageEventsSection = ({ data, ...props }) => {

    const eventsSectionSubsectionOneButton = <Button size={'small'} text={data.subsections[0].links[0].text} linkDest={data.subsections[0].links[0].dest} primary={false} />
    const eventsSectionSubsectionTwoButton = <Button size={'small'} text={data.subsections[1].links[0].text} linkDest={data.subsections[1].links[0].dest} primary={false} />
    const eventsSectionSubsectionThreeButton = <Button size={'small'} text={data.subsections[2].links[0].text} linkDest={data.subsections[2].links[0].dest} primary={false} />

    return (
        <div className={styles.wrapper}>
            <div className={styles.col}>
                <div className={classNames(styles.colItem, styles.topLeft)}>
                    <Picture fluid={data.images[0].asset.fluid} sizes={"(min-width: 450px) 30vw, 70vw"} objectFit={'cover'} />
                </div>
                <div className={classNames(styles.colItem, styles.middleLeft)}>
                    <TextSubsection buttons={[eventsSectionSubsectionOneButton]}>
                        <Title fontSize={'28px'} color={'black'}>{data.subsections[0].title}</Title>
                        <br />
                        <Body fontSize={'18px'} blocks={data.subsections[0].body} color={'black'} />
                    </TextSubsection>
                </div>
                <div className={classNames(styles.colItem, styles.bottomLeft)}>
                    <Picture fluid={data.images[1].asset.fluid} sizes={"(min-width: 450px) 70vw, 70vw"} objectFit={'cover'} />
                </div>
            </div>
            <div className={styles.col}>
                <div className={classNames(styles.colItem, styles.topCenter)}>

                </div>
                <div className={classNames(styles.colItem, styles.middleCenter)}>
                    <Picture fluid={data.images[2].asset.fluid} sizes={"(min-width: 450px) 30vw, 70vw"} objectFit={'cover'} />
                </div>
                <div className={classNames(styles.colItem, styles.bottomCenter)}>
                    <TextSubsection buttons={[eventsSectionSubsectionTwoButton]}>
                        <Title fontSize={'28px'} color={'black'}>{data.subsections[1].title}</Title>
                        <br />
                        <Body fontSize={'18px'} blocks={data.subsections[1].body} color={'black'} />
                    </TextSubsection>
                </div>
            </div>
            <div className={styles.col}>
                <div className={classNames(styles.colItem, styles.topRight)}>
                    <TextSubsection buttons={[eventsSectionSubsectionThreeButton]}>
                        <Title fontSize={'28px'} color={'black'}>{data.subsections[2].title}</Title>
                        <br />
                        <Body fontSize={'18px'} blocks={data.subsections[2].body} color={'black'} />
                    </TextSubsection>
                </div>
                <div className={classNames(styles.colItem, styles.bottomRight)}>
                    <Picture fluid={data.images[3].asset.fluid} sizes={"(min-width: 450px) 70vw, 70vw"} objectFit={'cover'} />
                </div>
            </div>
        </div>
    )
}

export default IndexPageEventsSection