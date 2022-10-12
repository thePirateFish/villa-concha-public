import React from 'react'
import styles from './icon-text.module.css'
import Icon from './icon'
const classNames = require('classnames');

const IconText = ({ icon, text, fontSize = '16px', marginLeft = '15px', iconSize = '30px' }) => {

    var iconTextClass = classNames(
        styles.wrapper,
    )

    var textStyle = {
        fontSize: fontSize,
        marginLeft: marginLeft
    }

    var iconStyle = {
        width: iconSize,
        height: iconSize
    }

    return (
        <div className={iconTextClass}>
            <span style={iconStyle} className={styles.icon}>{icon}</span><span style={textStyle} className={styles.text}>{text}</span>
        </div>
    )
}

export default IconText