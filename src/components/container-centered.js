import React from 'react'

import styles from './container-centered.module.css'

const ContainerCentered = ({children}) => {
  return <div className={styles.root}>{children}</div>
}

export default ContainerCentered
