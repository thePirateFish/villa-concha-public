import React, { useState } from 'react'
import styles from './villa-page-floorplan-section.module.css'
import SplitView from '../components/split-view'
import TextSubsection from '../components/text-subsection'
import Body from '../components/body'
import Picture from '../components/picture'
import Icon from '../components/icon'
import IconText from '../components/icon-text'
import ContainerCenteredThin from '../components/container-centered-thin'
import { useMediaQuery } from 'react-responsive'
const classNames = require('classnames');

const VillaPageFloorplanSection = ({ floorplanSectionData, ...props }) => {
  const [selected, setSelected] = useState(0)
  const [displayFullScreen, setDisplayFullScreen] = useState(false)

  const smallView = useMediaQuery({ query: '(max-width: 900px)' })

  const images = floorplanSectionData.images
  const floorplanSectionBody = <Body blocks={floorplanSectionData.body} fontSize={'18px'} color={'black'} />
  const iconOne = <Icon symbol={floorplanSectionData.subsections[0].title.toLowerCase()} />
  const iconTwo = <Icon symbol={floorplanSectionData.subsections[3].title.toLowerCase()} />
  const iconThree = <Icon symbol={floorplanSectionData.subsections[1].title.toLowerCase()} />
  const iconFour = <Icon symbol={floorplanSectionData.subsections[4].title.toLowerCase()} />
  const iconFive = <Icon symbol={floorplanSectionData.subsections[2].title.toLowerCase()} />
  const iconSix = <Icon symbol={floorplanSectionData.subsections[5].title.toLowerCase()} />
  const floorplanSectionTable =
    <div className={styles.table}>
      <span>
        <IconText icon={iconOne} text={`${floorplanSectionData.subsections[0].title}: ${floorplanSectionData.subsections[0].body[0].children[0].text}`} />
        <IconText icon={iconTwo} text={`${floorplanSectionData.subsections[3].title}: ${floorplanSectionData.subsections[3].body[0].children[0].text}`} />
        <IconText icon={iconThree} text={`${floorplanSectionData.subsections[1].title}: ${floorplanSectionData.subsections[1].body[0].children[0].text}`} />
      </span>
      <span>
        <IconText icon={iconFour} text={`${floorplanSectionData.subsections[4].title}: ${floorplanSectionData.subsections[4].body[0].children[0].text}`} />
        <IconText icon={iconFive} text={`${floorplanSectionData.subsections[2].title}: ${floorplanSectionData.subsections[2].body[0].children[0].text}`} />
        <IconText icon={iconSix} text={`${floorplanSectionData.subsections[5].title}: ${floorplanSectionData.subsections[5].body[0].children[0].text}`} />
      </span>
    </div>

  const tsStyle =
  {
    paddingLeft: '20px',
    paddingRight: '20px'
  }

  const floorplanSectionLeft =
    <TextSubsection style={tsStyle}>
      {floorplanSectionBody}
      <br />
      {floorplanSectionTable}
    </TextSubsection>

  const calculateImageSize = () => {
    if (displayFullScreen) {
      return '100vw'
    } else if (smallView) {
      return '90vw'
    }
    return '32vw'
  }

  const calculateThumbSize = () => {
    if (smallView) {
      return '10vw'
    }
    return '5vw'
  }

  const handleDisplayArrowLeft = () => {
    const newSelected = (selected - 1 + images.length) % images.length
    setSelected(newSelected)
  }

  const handleDisplayArrowRight = () => {
    const newSelected = (selected + 1) % images.length
    setSelected(newSelected)
  }

  const handleThumbnailClick = (image) => {
    setSelected(images.indexOf(image))
  }

  const handleKeyDown = (e) => {
    if (!scrollbarButtonsDisabled && e.keyCode == '37') {
      handleDisplayArrowLeft()
    } else if (!scrollbarButtonsDisabled && e.keyCode == '39') {
      handleDisplayArrowRight()
    } else if (e.keyCode == '27') {
      setDisplayFullScreen(false)
    }
  }

  const floorplanSectionRight = <div className={styles.floorplanWrapper}>
    <div className={classNames({ [styles.displayedImageWrapper]: !displayFullScreen }, { [styles.displayFullScreen]: displayFullScreen })} onClick={() => setDisplayFullScreen(!displayFullScreen)} onKeyDown={(e) => handleKeyDown(e)}>
      <div className={classNames(styles.displayedImage, { [styles.cursor]: !displayFullScreen })}>
        <Picture fluid={images[selected].asset.fluid} sizes={calculateImageSize()} objectFit={'contain'} />
      </div>
    </div>
    <div className={styles.buttonSection}>
      <button className={classNames(styles.arrowIcon, { [styles.arrowIconFullScreenLeft]: displayFullScreen })} onClick={() => handleDisplayArrowLeft()} onKeyDown={(e) => handleKeyDown(e)}>
        <Icon symbol={'before'} />
      </button>
      {images.map((image, index) => {
        return <span className={classNames(styles.thumb, { [styles.selected]: images.indexOf(image) == selected })} onClick={() => handleThumbnailClick(image)}>
          <div className={styles.picWrapper}><Picture fluid={image.asset.fluid} sizes={calculateThumbSize()} /></div>
        </span>

      })}
      <button className={classNames(styles.arrowIcon, { [styles.arrowIconFullScreenRight]: displayFullScreen })} onClick={() => handleDisplayArrowRight()} onKeyDown={(e) => handleKeyDown(e)}>
        <Icon symbol={'next'} />
      </button>
    </div>
  </div>

  return (
    <>
      <div className={styles.title}>{floorplanSectionData.title} </div>
      <ContainerCenteredThin>
        <SplitView left={floorplanSectionLeft} right={floorplanSectionRight} />
      </ContainerCenteredThin>
    </>
  )
}

export default VillaPageFloorplanSection