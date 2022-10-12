import React from 'react'
import styles from './index-page-villa-section.module.css'
import SplitView from '../components/split-view'
import TextSubsection from '../components/text-subsection'
import Title from '../components/title'
import Body from '../components/body'
import Button from '../components/button'
import Picture from '../components/picture'

const classNames = require('classnames');

const IndexPageVillaSection = ({ data, ...props }) => {
  const villaSectionTitle = <Title size={'large'}>{data.title}</Title>
  const villaSectionBody = <Body blocks={data.body} fontSize={'20px'} />
  const villaSectionButton = <Button size={'large'} text={data.links[0].text} linkDest={data.links[0].dest} primary={true} />
  const villaSectionLeft =
    <TextSubsection buttons={[villaSectionButton]}>
      {villaSectionTitle}
      <br />
      {villaSectionBody}
    </TextSubsection>
  const villaSectionPictureOne = data.images[0].asset.fluid
  const villaSectionPictureTwo = data.images[1].asset.fluid
  const villaSectionRight =
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <Picture fluid={villaSectionPictureOne} sizes={"(min-width: 900px) 32vw, 90vw"} objectFit={'cover'} />
      </div>
      <div className={styles.row}>
        <Picture fluid={villaSectionPictureTwo} sizes={"(min-width: 900px) 32vw, 90vw"} objectFit={'cover'} />
      </div>
    </div>

  return (
    <SplitView left={villaSectionLeft} right={villaSectionRight} />
  )
}

export default IndexPageVillaSection