import React from 'react'

import styles from './container-wide.module.css'

const ContainerWide = ({children}) => {
  return <div className={styles.root}>{children}</div>
}

export default ContainerWide
