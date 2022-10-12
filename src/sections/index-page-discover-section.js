import React from 'react'
import styles from './index-page-discover-section.module.css'
import SplitView from '../components/split-view'
import TextSubsection from '../components/text-subsection'
import Title from '../components/title'
import Body from '../components/body'
import Button from '../components/button'
import Picture from '../components/picture'
import { useMediaQuery } from 'react-responsive'

const IndexPageDiscoverSection = ({ data, ...props }) => {

  const smallView = useMediaQuery({ query: '(max-width: 450px)' })

  const calculateTitleOneSize = () => {
    if (smallView) {
      return '40px'
    }
    return 'min(5vw, 70px)'
  }

  const calculateTitleTwoSize = () => {
    if (smallView) {
      return '40px'
    }
    return 'min(5vw, 70px)'
  }

  const discoverSectionLeftBg = 'white'
  const discoverSectionRightBg = '#1a1a1a'
  const titleStyle = { lineHeight: '.9', whiteSpace: 'nowrap' }
  const discoverSectionTitleOne = <Title fontSize={calculateTitleOneSize()} style={titleStyle} color={'white'}>{data.title.substr(0, data.title.indexOf(' '))}</Title>
  const discoverSectionTitleTwo = <Title fontSize={calculateTitleTwoSize()} style={titleStyle} color={'gold'}>{data.title.substr(data.title.indexOf(' '))}</Title>
  const discoverSectionBody = <Body fontSize={'20px'} blocks={data.body} color={'white'} />
  const discoverSectionButton = <Button size={'large'} text={data.links[0].text} linkDest={data.links[0].dest} primary={true} />
  const discoverSectionLeft =
    <div className={styles.wrapper}>
      <div className={styles.col}>
        <div className={styles.colItem} >
          <Picture fluid={data.images[0].asset.fluid} sizes={"(min-width: 1300px) 25vw, (min-width: 900px) 38vw, 50vw"} objectFit={'cover'} />
        </div>
        <div className={styles.colItem}>
          <Picture fluid={data.images[1].asset.fluid} sizes={"(min-width: 900px) 25vw, 50vw"} objectFit={'cover'} />
        </div>
      </div>
      <div className={styles.col}>
        <div className={styles.colItem} >
          <Picture fluid={data.images[2].asset.fluid} sizes={"(min-width: 900px) 25vw, 50vw"} objectFit={'cover'} />
        </div>
        <div className={styles.colItem}>
          <Picture fluid={data.images[3].asset.fluid} sizes={"(min-width: 900px) 25vw, 50vw"} objectFit={'cover'} />
        </div>
      </div>
    </div>

  const discoverSectionRight =
    <TextSubsection buttons={[discoverSectionButton]}>
      {discoverSectionTitleOne}
      {discoverSectionTitleTwo}
      <br />
      {discoverSectionBody}
    </TextSubsection>

  return (
    <SplitView left={discoverSectionLeft} right={discoverSectionRight} leftBg={discoverSectionLeftBg} rightBg={discoverSectionRightBg} />
  )
}

export default IndexPageDiscoverSection