import React from 'react'
import TransitionLink from "gatsby-plugin-transition-link"

const FadeLink = ({ to, children, ...props}) => (
    <TransitionLink className={props.className} to={to} exit={{ length: .6 }} entry={{delay: .4, length: .6}}>
      {children}
    </TransitionLink>
  )

export default FadeLink