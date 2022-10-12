import { Link } from 'gatsby'
import React from 'react'
import Icon from './icon'
import { cn } from '../lib/helpers'
import urlFor from '../util/image-url-builder'
import FadeLink from './fade-link'
const classNames = require('classnames');

import styles from './header.module.css'

const Header = ({ onHideNav, onShowNav, showNav, siteTitle, logo, links, activePage }) => {

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.branding}>
          <Link to='/'>
            <picture>
              <source srcSet={logo.asset.fixed.srcSetWebp} type={"image/webp"} sizes="246px" />
              <source srcSet={logo.asset.fixed.srcSet} type={"image/jpeg"} sizes="246px" />
              <img className={styles.logo} src={urlFor(logo).width(250).format('webp')} />
            </picture>
          </Link>
        </div>

        <button className={styles.toggleNavButton} onClick={showNav ? onHideNav : onShowNav}>
          <Icon symbol='hamburger' />
        </button>

        <nav className={cn(styles.nav, showNav && styles.showNav)}>
          <ul>
            {links.map((link, index) => {
              return (
                <li>
                  <div className={classNames(styles.navLink)}>
                    <FadeLink className={classNames(styles.link, { [styles.navLinkActive]: index + 1 == activePage })} to={link.dest}>{link.text}</FadeLink>
                  </div>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Header
