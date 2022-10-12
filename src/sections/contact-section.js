import React from 'react'
import styles from './contact-section.module.css'
import Title from '../components/title'
import Body from '../components/body'
import Icon from '../components/icon'
const BlockContent = require('@sanity/block-content-to-react')

const serializers = {
  types: {
    block(props) {
      return (<div>
        {props.children}
      </div>)
    }
  }
}

const ContactSection = ({ title, body, subsections }) => {
  const iconOne = <Icon size={'20px'} fill={'black'} symbol={subsections[0].subtitle.toLowerCase()} />
  const iconTwo = <Icon size={'20px'} fill={'black'} symbol={subsections[1].subtitle.toLowerCase()} />
  const iconThree = <Icon size={'20px'} fill={'black'} symbol={subsections[2].subtitle.toLowerCase()} />
  const iconFour = <Icon size={'20px'} fill={'black'} symbol={subsections[3].subtitle.toLowerCase()} />

  return (
    <div>
      <Title size={'medium'}>{title}</Title>
      <br />
      <Body blocks={body} size={'large'} />

      <div className={styles.tableWrapper}>
        <div className={styles.leftCol}>
          <div className={styles.iconText} >
            {iconOne}
            <div className={styles.tableHeader}>{subsections[0].title}:</div>
          </div>
          <div className={styles.iconText}>
            {iconTwo}
            <div className={styles.tableHeader}>{subsections[1].title}:</div>
          </div>
          <div className={styles.iconText}>
            {iconThree}
            <div className={styles.tableHeader}>{subsections[2].title}:</div>
          </div>
          <div className={styles.iconText}>
            {iconFour}
            <div className={styles.tableHeader}>{subsections[3].title}:</div>
          </div>
        </div>
        <div className={styles.rightCol}>
          <BlockContent serializers={serializers} blocks={subsections[0].body} renderContainerOnSingleChild={true} />
          <BlockContent serializers={serializers} blocks={subsections[1].body} renderContainerOnSingleChild={true} />
          <BlockContent serializers={serializers} blocks={subsections[2].body} renderContainerOnSingleChild={true} />
          <BlockContent serializers={serializers} blocks={subsections[3].body} renderContainerOnSingleChild={true} />
        </div>
      </div>
    </div>
  )
}

export default ContactSection