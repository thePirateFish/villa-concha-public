import React from 'react'
import styles from './text-subsection.module.css'

const TextSubsection = ({ children, buttons = [], justifyContent = 'space-evenly', style = {} }) => {

    var wrapperStyle = {
        justifyContent: justifyContent
    }

    Object.assign(wrapperStyle, style);

    return (
        <div style={wrapperStyle} className={styles.wrapper}>
            <div className={styles.children}>
                {children}
            </div>
            <div className={styles.buttonSection}>
                {buttons.map(button => (
                    <span>{button}</span>
                ))}
            </div>

        </div>
    )
}

export default TextSubsection