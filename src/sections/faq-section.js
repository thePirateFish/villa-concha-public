import React from 'react'
import styles from './faq-section.module.css'
const classNames = require('classnames');

const FAQSection = ({ leftCol, rightCol }) => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.col}>
                {leftCol}
            </div>
            <div className={styles.col}>
                {rightCol}
            </div>
        </div>
    )
}

export default FAQSection