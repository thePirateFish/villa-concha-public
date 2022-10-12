import React from 'react'
import styles from './subtitle.module.css'
const classNames = require('classnames');

const Subtitle = ({ text, size, color }) => {

    var subtitleClass = classNames(
        styles.subtitle,
        { [styles.large]: size == 'large' },
        { [styles.small]: size == 'small' },
        { [styles.medium]: size == 'medium' },
        { [styles.medLarge]: size == 'medLarge' },
        { [styles.gold]: color == 'gold' },
        { [styles.white]: color == 'white' },
        { [styles.black]: color == 'black' }
    )

    return (
        <div className={subtitleClass}>
            {text}
        </div>
    )
}

export default Subtitle