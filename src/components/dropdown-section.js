import React, { useState } from 'react'
import Icon from './icon'
import styles from './dropdown-section.module.css'
const classNames = require('classnames');

const DropdownSection = ({ title, body, ...props }) => {

    const [expanded, setExpanded] = useState(false)

    const getSymbol = () => {
        if (expanded) {
            return 'expand-less'
        }
        return 'expand-more'
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.titleBar} onClick={() => setExpanded(!expanded)}>
                <div className={styles.title}>
                    {title}
                </div>
                <div className={styles.icon} >
                    <Icon symbol={getSymbol()} />
                </div>
            </div>
            <div className={classNames(styles.bodySection, { [styles.bodySectionHidden]: !expanded })}>
                <div className={classNames(styles.body, { [styles.bodyHidden]: !expanded })}>
                    {body}
                </div>
            </div>
        </div>
    )
}

export default DropdownSection