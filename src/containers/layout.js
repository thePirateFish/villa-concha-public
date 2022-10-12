import { graphql, StaticQuery } from 'gatsby'
import React, { useState } from 'react'
import Layout from '../components/layout'
import Helmet from 'react-helmet'
import favicon from '../assets/favicon.png'

const query = graphql`
  query SiteTitleQuery {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
    }
    navbar: sanityNavbar(title: {eq: "Navbar"}) {
      title
      logo {
        asset {
          url
          fluid {
            srcWebp
          }
          fixed {
            srcSetWebp
            srcSet
          }
          title
          assetId
        }
      }
      links {
        dest
        text
      }
    }
    footer: sanityFooter(title: {eq: "Footer"}) {
    body
    email
    formDesc
    headerOne
    headerTwo
    logo {
      asset {
        fluid {
          srcSetWebp
          srcSet
          src
        }
      }
    }
    phone
  }
  }
`

function LayoutContainer(props) {
  const [showNav, setShowNav] = useState(false)
  function handleShowNav() {
    setShowNav(true)
  }
  function handleHideNav() {
    setShowNav(false)
  }
  return (
    <div>
      <Helmet>
        <link rel="icon" href={favicon} />
      </Helmet>

      <StaticQuery
        query={query}
        render={data => {
          if (!data.site) {
            throw new Error(
              'Missing "Site settings". Open the Studio at http://localhost:3333 and some content in "Site settings"'
            )
          }
          return (
            <Layout
              {...props}
              showNav={showNav}
              siteTitle={data.site.title}
              onHideNav={handleHideNav}
              onShowNav={handleShowNav}
              headerLogo={data.navbar.logo}
              headerLinks={data.navbar.links}
              footer={data.footer}
              activePage={props.activePage}
            />
          )
        }}
      />
    </div>
  )
}

export default LayoutContainer
