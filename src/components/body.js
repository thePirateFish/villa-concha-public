import React from 'react'
import styles from './body.module.css'
const BlockContent = require('@sanity/block-content-to-react')
const classNames = require('classnames');

const serializers = {
  types: {
    block(props) {
      return (<div >
        {props.children}
      </div>)
    }
  }
}

const Body = ({ blocks, color = '', fontSize = '16px', style = {} }) => {

  var bodyClass = classNames(
    styles.body,
    { [styles.gold]: color == 'gold' },
    { [styles.white]: color == 'white' }
  )

  const bodyStyle = {
    fontSize: fontSize
  }
  Object.assign(bodyStyle, style)

  const serializers = {
    types: {
      block(props) {
        return (<div style={bodyStyle}>
          {props.children}
        </div>)
      }
    }
  }
  return (
    <>
      <BlockContent className={bodyClass} blocks={blocks} renderContainerOnSingleChild={true} />
    </>
  )
}

export default Body