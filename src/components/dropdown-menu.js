import React, { useState } from 'react'
import Icon from './icon'
import styles from './dropdown-menu.module.css'
const classNames = require('classnames');

const DropdownMenu = ({ placeholderText, options, selected, handleOptionClick, expanded, handleExpandClick, ...props }) => {

    const getSymbol = () => {
        if (expanded) {
            return 'expand-less'
        }
        return 'expand-more'
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.mainBar} onClick={() => handleExpandClick(!expanded)}>
                <div className={styles.selected}>
                    {selected != null && `Guests: ${selected}`}
                    {selected != null || placeholderText}
                </div>
                <div className={styles.icon} >
                    <Icon symbol={getSymbol()} />
                </div>
            </div>
            <div className={classNames(styles.bodySection, { [styles.bodySectionHidden]: !expanded })}>
                <div className={classNames(styles.body, { [styles.bodyHidden]: !expanded })}>
                    {options.map(option => (
                        <div className={styles.option} onClick={() => handleOptionClick(option)}>
                            {option}
                        </div>

                    ))}
                </div>
            </div>
        </div>
    )
}

export default DropdownMenu