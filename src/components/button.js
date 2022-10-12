import React from 'react'
import {Link} from 'gatsby'
import AniLink from "gatsby-plugin-transition-link/AniLink";
import FadeLink from './fade-link'
import styles from './button.module.css'
const classNames = require('classnames');


const Button = ({text, linkDest, primary, size, ...props}) => {
    const buttonStyle = {
        
    }

    var buttonClass = classNames(
        styles.button,
        {[styles.primary]: primary},
        {[styles.secondary]: !primary},
        {[styles.small]: size=='small'},
        {[styles.medium]: size=='medium'},
        {[styles.large]: size=='large'}
    )

    return (
        <div style={buttonStyle} className={buttonClass}>
            <FadeLink className={styles.link} to={linkDest}>{text}</FadeLink>
        </div>
    )
}

export default Button