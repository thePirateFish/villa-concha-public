import React, { useState } from 'react'
import styles from './carousel.module.css'
import Picture from './picture'
import Title from './title'
import Icon from './icon'
import Video from '../components/video'
import { useMediaQuery } from 'react-responsive'

const classNames = require('classnames');


const Carousel = ({ images, featuredVideo, ...props }) => {

    const isMediumScreen = useMediaQuery({ query: '(max-width: 1000px)' })
    const scrollbarSize = isMediumScreen ? 5 : 8;
    const [selected, setSelected] = useState(0)
    const dividerIndex = 0
    const arrLength = images.length
    const arrLengthWithDivider = arrLength + 1
    const [thumbnailStart, setThumbnailStart] = useState((selected - 4 + images.length) % images.length)
    const [thumbnailEnd, setThumbnailEnd] = useState((thumbnailStart + scrollbarSize) % images.length)
    const [scrollbarButtonsDisabled, setScrollbarButtonsDisabled] = useState(false)
    const [displayFullScreen, setDisplayFullScreen] = useState(false)
    const [showVideo, setShowVideo] = useState(false)

    const handleDisplayArrowRight = () => {
        const newSelected = (selected + 1) % images.length
        setSelected(newSelected)
        if (isHidden(newSelected)) {
            handleScrollbarRight()
        }
    }

    const handleDisplayArrowLeft = () => {
        const newSelected = (selected - 1 + images.length) % images.length
        setSelected(newSelected)
        if (isHidden(newSelected)) {
            handleScrollbarLeft()
        }
    }

    const handleScrollbarRight = () => {
        var newStart = (thumbnailStart + 1) % (arrLengthWithDivider)
        setThumbnailStart(newStart)
        if (newStart == arrLength) {
            setTimeout(() => setThumbnailStart((newStart + 1) % arrLengthWithDivider), 500)
        }
        var newEnd = (newStart + scrollbarSize) % (arrLength)
        setThumbnailEnd(newEnd)
        if (newEnd == arrLength) {
            setThumbnailEnd((newEnd + 1) % (arrLengthWithDivider))
        }
        setScrollbarButtonsDisabled(true)
        setTimeout(() => setScrollbarButtonsDisabled(false), 500)
    }

    const handleScrollbarLeft = () => {
        var newStart = (thumbnailStart - 1 + arrLengthWithDivider) % (arrLengthWithDivider)
        setThumbnailStart(newStart)
        if (newStart == 0) {
            setTimeout(() => setThumbnailStart((newStart - 1 + arrLengthWithDivider) % arrLengthWithDivider), 500)
        }
        var newEnd = (newStart + scrollbarSize) % (arrLength)
        setThumbnailEnd(newEnd)
        setScrollbarButtonsDisabled(true)

        setTimeout(() => setScrollbarButtonsDisabled(false), 500)
    }

    const isHidden = (index) => {
        if ((thumbnailStart < thumbnailEnd)) {
            return index >= thumbnailStart && index <= thumbnailEnd ? false : true
        }
        else {
            return index >= thumbnailStart || index <= thumbnailEnd ? false : true
        }
    }

    const calculateStyle = (index) => {
        var spanStyle = {
            order: (((index - thumbnailStart) + (images.length + 1)) % (images.length + 1))
        }

        return spanStyle
    }

    const playVideo = () => {
        setShowVideo(true)
        setSelected(null)
    }

    const videoComponent = <Video videoAsset={featuredVideo.video.asset} playsInline={false} poster={featuredVideo.poster.asset.fluid.srcWebp} autoplay={false} showControls={true} />
    const handleThumbnailClick = (image) => {
        setSelected(images.indexOf(image))
        setShowVideo(false)
    }

    const calculateDisplayedImageSizes = () => {
        if (displayFullScreen) {
            return '100vw'
        } else if (isMediumScreen) {
            return '65vw'
        }
        return '50vw'
    }

    const calculateDisplayedImageObjectFit = () => {
        if (displayFullScreen) {
            return 'contain'
        }
        return 'contain'
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

    return (
        <div className={styles.wrapper} onKeyDown={(e) => handleKeyDown(e)} tabIndex="-1">
            <div className={styles.upper}>
                <button className={classNames(styles.arrowIcon, { [styles.arrowIconFullScreenLeft]: displayFullScreen })} onClick={() => handleDisplayArrowLeft()} disabled={scrollbarButtonsDisabled} onKeyDown={(e) => handleKeyDown(e)}>
                    <Icon symbol={'before'} />
                </button>
                <div className={classNames({ [styles.displayedImage]: !displayFullScreen }, { [styles.displayFullScreen]: displayFullScreen })} onClick={() => setDisplayFullScreen(!showVideo && !displayFullScreen)} onKeyDown={(e) => handleKeyDown(e)}>
                    <div className={classNames(styles.displayedImageWrapper, { [styles.cursor]: !displayFullScreen })}>
                        {showVideo || <Picture fluid={images[selected].asset.fluid} sizes={calculateDisplayedImageSizes()} objectFit={calculateDisplayedImageObjectFit()} />}
                    </div>
                    <div className={styles.displayedVideoWrapper}>{showVideo && videoComponent}</div>
                </div>
                <button className={classNames(styles.arrowIcon, { [styles.arrowIconFullScreenRight]: displayFullScreen })} onClick={() => handleDisplayArrowRight()} disabled={scrollbarButtonsDisabled} onKeyDown={(e) => handleKeyDown(e)}>
                    <Icon symbol={'next'} onClick={() => setSelected((selected + 1) % images.length)} />
                </button>
            </div>
            <div className={classNames(styles.info, { [styles.infoFullScreen]: displayFullScreen })}>
                {showVideo || <Title color={'black'} size={'small'}>{`${selected + 1} / ${images.length}`}</Title>}
            </div>
            <div className={classNames(styles.scrollbar, { [styles.hide]: displayFullScreen })}>
                <button className={styles.arrowIcon} onClick={() => handleScrollbarLeft()} disabled={scrollbarButtonsDisabled}>
                    <Icon symbol={'before'} />
                </button>
                <div className={classNames(styles.thumbnails, { [styles.hide]: displayFullScreen })}>
                    <span style={calculateStyle(dividerIndex)} className={classNames({ [styles.thumbHidden]: isHidden(arrLength) })} />
                    {images.map((image, index) => {
                        const spanStyle = calculateStyle(index + 1)
                        return <span style={spanStyle} className={classNames(styles.thumb, { [styles.selected]: images.indexOf(image) == selected }, { [styles.thumbHidden]: isHidden(index) })} onClick={() => handleThumbnailClick(image)}>
                            <div className={styles.picWrapper}><Picture fluid={image.asset.fluid} sizes={'10vw'} /></div>
                        </span>

                    })}
                </div>
                <button className={styles.arrowIcon} onClick={() => handleScrollbarRight()} disabled={scrollbarButtonsDisabled}>
                    <Icon symbol={'next'} />
                </button>
            </div>
            <div className={classNames(styles.featuredVideoThumbnailContainer, { [styles.featuredVideoThumbnailSelected]: showVideo }, { [styles.hide]: displayFullScreen })} onClick={() => playVideo()}>
                <div className={styles.featuredVideoThumbnail} >
                    <Picture fluid={featuredVideo.poster.asset.fluid} sizes={'10vw'} />
                </div>
                <div className={styles.playBtn} ><Icon symbol={'play'} /></div>
            </div>
        </div>
    )
}

export default Carousel