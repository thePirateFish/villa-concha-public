import React from 'react'
import styles from './container-centered-thin.module.css'

const ContainerCenteredThin = ({bgColor='white', flexDirection='row', children}) => {

  const containerStyles = {
    backgroundColor: bgColor,
    flexDirection: flexDirection
  }

  return <div style={containerStyles} className={styles.root}>{children}</div>
}
export default ContainerCenteredThin
