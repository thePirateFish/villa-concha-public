import React from 'react'
import { graphql } from 'gatsby'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import SplitView from '../components/split-view'
import TextSubsection from '../components/text-subsection'
import Title from '../components/title'
import Body from '../components/body'
import Button from '../components/button'
import Picture from '../components/picture'
import Line from '../components/line'
import ContainerCenteredThin from '../components/container-centered-thin'
import BannerImage from '../components/banner-image'
import Carousel from '../components/carousel'
import ContainerWide from '../components/container-wide'

export const query = graphql`
  query GalleryPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    galleryPage: sanityPages(title: {eq: "Gallery"}) {
        title
        _rawSections
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
    video {
        title
        video {
          asset {
            playbackId
            assetId
            filename
            status
            thumbTime
            _key
            _type
          }
        }
        poster {
          asset {
            fluid {
                srcSet
                srcSetWebp
                src
            }
          }
        }
      }
  }
  }
`
const GalleryPage = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
  const galleryPage = (data || {}).galleryPage

  galleryPage.sections.forEach((section, index) => {
    Object.assign(section, { body: galleryPage._rawSections[index].body })
    const rawSubsections = galleryPage._rawSections[index].subsections
    section.subsections.forEach((subsection, index) => {
      Object.assign(subsection, { body: rawSubsections[index].body })
    })
  })

  const galleryPageTitle = <Title size={'medLarge'} color={'white'}>{galleryPage.title}</Title>

  const carouselSection = galleryPage.sections[0]
  const carouselSectionTitleStyle = { paddingBottom: '40px' }
  const carouselSectionTitle = <Title style={carouselSectionTitleStyle} fontSize={'36px'} color={'black'}>{carouselSection.title}</Title>
  const carouselSectionBody = <Body blocks={carouselSection.body} size={'large'} />

  const carouselImages = carouselSection.images

  const bookingSectionData = galleryPage.sections[1]
  const bookingSectionImage = bookingSectionData.images[0].asset.fluid

  const bookingTitleStyle = { paddingBottom: '35px' }

  const bookingSectionTitle = <Title style={bookingTitleStyle} size={'medium'} color={'black'}>{bookingSectionData.title}</Title>
  const bookingSectionBody = <Body blocks={bookingSectionData.body} color={'black'} size={'medium'} />
  const bookingSectioneButtonOne = <Button text={bookingSectionData.links[0].text} linkDest={bookingSectionData.links[0].dest} size={'large'} primary={true} />
  const bookingSectioneButtonTwo = <Button text={bookingSectionData.links[1].text} linkDest={bookingSectionData.links[1].dest} size={'large'} primary={false} />

  const bookingSectionLeft = <Picture fluid={bookingSectionImage} sizes={"35vw"} />
  const bookingSectionRight =
    <TextSubsection buttons={[bookingSectioneButtonOne, bookingSectioneButtonTwo]}>
      {bookingSectionBody}
    </TextSubsection>

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  return (
    <Layout activePage={2}>
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      <BannerImage fluid={galleryPage.image.asset.fluid}>{galleryPageTitle}</BannerImage>
      <ContainerCenteredThin>
        {carouselSectionTitle}
      </ContainerCenteredThin>
      <ContainerCenteredThin>
        {carouselSectionBody}
      </ContainerCenteredThin>
      <ContainerWide>
        <Carousel images={carouselImages} featuredVideo={galleryPage.video} />
      </ContainerWide>
      <Line />
      <ContainerCenteredThin>
        {bookingSectionTitle}
      </ContainerCenteredThin>
      <ContainerCenteredThin>
        <SplitView left={bookingSectionLeft} right={bookingSectionRight} />
      </ContainerCenteredThin>
    </Layout>
  )
}

export default GalleryPage
