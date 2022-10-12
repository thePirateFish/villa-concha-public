import React from "react"
import SanityMuxPlayer from "sanity-mux-player";
import styles from './video.module.css'

const Video = ({ videoAsset, poster, autoplay, showControls, ...props }) => (
  <div className={styles.wrapper}>
    <SanityMuxPlayer
      assetDocument={videoAsset}
      autoload={true}
      autoplay={autoplay}
      showControls={showControls}
      loop={true}
      muted={true}
      poster={poster}
      {...props}
    />
  </div>
)
export default Video