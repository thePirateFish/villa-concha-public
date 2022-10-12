import React from 'react'
import Header from './header'
import Footer from './footer'
import posed from 'react-pose';
import { TransitionState } from 'gatsby-plugin-transition-link'

import '../styles/layout.css'
import styles from './layout.module.css'

const Fade = posed.div({
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
})

const Layout = ({ children, onHideNav, onShowNav, showNav, siteTitle, headerLogo, headerLinks, footer, activePage }) => (
  <TransitionState>
    {({ transitionStatus }) => (
      <>
        <Header siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} logo={headerLogo} links={headerLinks} activePage={activePage} />
        <Fade
          pose={
            ['entering', 'entered'].includes(transitionStatus)
              ? 'visible'
              : 'hidden'
          }>
          <div className={styles.content}>{children}</div>

        </Fade>
        <Footer data={footer} />
      </>
    )}
  </TransitionState>
)

export default Layout
