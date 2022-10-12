import React from 'react'
import { graphql } from 'gatsby'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import BannerImage from '../components/banner-image'
import Title from '../components/title'
import Calendar from '../components/calendar'

export const query = graphql`
  query BookingPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    bookingPage: sanityPages(title: {eq: "Booking"}) {
      title
        image {
            asset {
                fluid {
                    srcSet
                    srcSetWebp
                    src
                }
            }
        }
        sections {
        title
        subtitle
        images {
            asset {
            fluid {
                srcSet
                srcSetWebp
                src
            }
            }
        }
        subsections {
            subtitle
            title
            
            links {
            dest
            text
            }
        }
        links {
            dest
            text
        }
        coordinates {
          lat
          lng
      }
    }
    }
    rates: rates {
      rates {
        available
        date
        min_length_of_stay
        price
      }
  }
  }
`
const BookingPage = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
  const bookingPage = (data || {}).bookingPage
  const ratesData = (data || {}).rates
  const createDateMap = () => {
    const dateDataMap = {};
    ratesData.rates.map((rateObj) => {
      var newRateObj = {
        'available': rateObj.available,
        'price': rateObj.price,
        'min_length_of_stay': rateObj.min_length_of_stay
      }
      dateDataMap[rateObj.date] = newRateObj
    });
    return dateDataMap;
  }
  const bookingPageTitle = <Title size={'medLarge'} color={'white'}>{bookingPage.title}</Title>
  const dateMap = createDateMap();

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  return (
    <Layout activePage={6}>
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      <BannerImage fluid={bookingPage.image.asset.fluid}>{bookingPageTitle}</BannerImage>
      <Calendar ratesData={dateMap} sectionData={bookingPage.sections[0]} />
    </Layout>
  )
}

export default BookingPage
