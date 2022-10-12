import React from 'react'
import styles from './title.module.css'
const classNames = require('classnames');

const Title = ({ children, size, color, style = {}, fontSize }) => {

    var titleClass = classNames(
        styles.title,
        { [styles.large]: size == 'large' },
        { [styles.small]: size == 'small' },
        { [styles.medium]: size == 'medium' },
        { [styles.medLarge]: size == 'medLarge' },
        { [styles.gold]: color == 'gold' },
        { [styles.white]: color == 'white' },
        { [styles.black]: color == 'black' }
    )

    const titleStyle = {
        fontSize: fontSize
    }

    Object.assign(titleStyle, style)

    return (
        <div style={titleStyle} className={titleClass}>
            {children}
        </div>
    )
}

export default Title