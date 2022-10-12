import React from 'react'
import { graphql } from 'gatsby'
import ContainerCentered from '../components/container-centered'
import ContainerWide from '../components/container-wide'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import Video from '../components/video'
import SplitView from '../components/split-view'
import Button from '../components/button'
import Picture from '../components/picture'
import Line from '../components/line'
import CheckerboardView from '../components/checkerboard-view'
import TextSubsection from '../components/text-subsection'
import Title from '../components/title'
import Body from '../components/body'
import VillaSection from '../sections/index-page-villa-section'
import EventsSection from '../sections/index-page-events-section'
import DiscoverSection from '../sections/index-page-discover-section'
import ContainerCenteredThin from '../components/container-centered-thin'

const BlockContent = require('@sanity/block-content-to-react')


export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    homepage: sanityPages(title: {eq: "Home Page"}) {
      title
      _rawSections
      sections {
        images {
          asset {
            url
            fluid {
              src
              srcWebp
              srcSetWebp
              srcSet
            }
            assetId
            title
            _id
            _key
            _rev
            _type
            extension
            id
            source {
              url
              sanityId
              name
              _type
              _key
            }
            path
            mimeType
          }
          crop {
            _key
            _type
            top
            bottom
            left
            right
          }
          hotspot {
            _key
            _type
            x
            y
            height
            width
          }
          _key
          _type
        }
        subsections {
          links {
            text
            dest
          }
          subtitle
          title
        }
        subtitle
        title
        links {
          dest
          text
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
              srcWebp
            }
          }
        }
      }
    }
  }

`

const IndexPage = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
  const homepage = (data || {}).homepage
  homepage.sections.forEach((section, index) => {
    Object.assign(section, { body: homepage._rawSections[index].body })
    const rawSubsections = homepage._rawSections[index].subsections
    section.subsections.forEach((subsection, index) => {
      Object.assign(subsection, { body: rawSubsections[index].body })
    })
  })

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  const videoAssetDoc = homepage.video.video.asset;
  const videoPoster = homepage.video.poster.asset.fluid.srcWebp
  const videoWrapperStyle = { maxHeight: '90vh', overflow: 'hidden' }
  const videoWrapper =
    <div style={videoWrapperStyle}>
      <Video videoAsset={videoAssetDoc} playsInline={true} poster={videoPoster} autoplay={true} showControls={false} />
    </div>

  const servicesSectionData = data.homepage.sections[3]
  const servicesSectionImageOne = servicesSectionData.images[0].asset.fluid
  const servicesSectionImageTwo = servicesSectionData.images[1].asset.fluid
  const servicesSectionSubsectionOneButton = <Button size={'large'} text={servicesSectionData.subsections[0].links[0].text} linkDest={servicesSectionData.subsections[0].links[0].dest} primary={true} />
  const servicesSectionSubsectionTwoButton = <Button size={'large'} text={servicesSectionData.subsections[1].links[0].text} linkDest={servicesSectionData.subsections[1].links[0].dest} primary={true} />

  const servicesSectionTopLeft =
    <TextSubsection buttons={[servicesSectionSubsectionOneButton]}>
      <Title fontSize={'36px'}>{servicesSectionData.subsections[0].title}</Title>
      <br />
      <Body blocks={servicesSectionData.subsections[0].body} fontSize={'18px'} />
    </TextSubsection>

  const servicesSectionBottomRight =
    <TextSubsection buttons={[servicesSectionSubsectionTwoButton]}>
      <Title fontSize={'36px'}>{servicesSectionData.subsections[1].title}</Title>
      <br />
      <Body blocks={servicesSectionData.subsections[1].body} fontSize={'18px'} />
    </TextSubsection>

  const bookingSectionData = data.homepage.sections[4]
  const bookingSectionImage = bookingSectionData.images[0].asset.fluid

  const bookingTitleStyle = { paddingBottom: '35px' }

  const bookingSectionTitle = <Title fontSize={'36px'} style={bookingTitleStyle} color={'black'}>{bookingSectionData.title}</Title>
  const bookingSectionBody = <Body blocks={bookingSectionData.body} color={'black'} fontSize={'18px'} />
  const bookingSectioneButtonOne = <Button text={bookingSectionData.links[0].text} linkDest={bookingSectionData.links[0].dest} size={'large'} primary={true} />
  const bookingSectioneButtonTwo = <Button text={bookingSectionData.links[1].text} linkDest={bookingSectionData.links[1].dest} size={'large'} primary={false} />

  const bookingSectionLeft = <Picture fluid={bookingSectionImage} sizes={"35vw"} />
  const bookingSectionRight =
    <TextSubsection buttons={[bookingSectioneButtonOne, bookingSectioneButtonTwo]}>
      {bookingSectionBody}
    </TextSubsection>

  return (
    <Layout activePage={0}>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      {videoWrapper}
      <ContainerCentered>
        <VillaSection data={homepage.sections[0]} />
      </ContainerCentered>
      <ContainerWide>
        <DiscoverSection data={homepage.sections[1]} />
      </ContainerWide>
      <ContainerCentered>
        <EventsSection data={data.homepage.sections[2]} />
      </ContainerCentered>
      <ContainerCentered>
        <CheckerboardView textImagePairs={[{ text: servicesSectionTopLeft, fluid: servicesSectionImageOne }, { text: servicesSectionBottomRight, fluid: servicesSectionImageTwo }]} />
      </ContainerCentered>
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

export default IndexPage
