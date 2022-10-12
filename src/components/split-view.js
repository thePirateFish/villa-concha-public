import React from 'react'
import styles from './split-view.module.css'

const SplitView = ({ left, right, leftBg, rightBg }) => {

    const customStyles = {
        leftStyle: {
            backgroundColor: leftBg
        },
        rightStyle: {
            backgroundColor: rightBg
        }
    }
    return (
        <div className={styles.wrapper}>
            <div style={customStyles.leftStyle} className={styles.left}>
                {left}
            </div>
            <div style={customStyles.rightStyle} className={styles.right}>
                {right}
            </div>
        </div>
    )
}

export default SplitView