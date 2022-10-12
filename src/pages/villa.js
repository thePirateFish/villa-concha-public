import React from 'react'
import { graphql } from 'gatsby'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import MainImage from '../components/main-image'
import CheckerboardView from '../components/checkerboard-view'
import SplitView from '../components/split-view'
import TextSubsection from '../components/text-subsection'
import Title from '../components/title'
import Body from '../components/body'
import Button from '../components/button'
import Picture from '../components/picture'
import Line from '../components/line'
import MapSubsection from '../components/map-subsection'
import ContainerCenteredThin from '../components/container-centered-thin'
import VillaPageFloorplanSection from '../sections/villa-page-floorplan-section'

export const query = graphql`
  query VillaPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    villaPage: sanityPages(title: {eq: "The Villa"}) {
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
  }
  }
`

const VillaPage = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
  const villaPage = (data || {}).villaPage

  villaPage.sections.forEach((section, index) => {
    Object.assign(section, { body: villaPage._rawSections[index].body })
    const rawSubsections = villaPage._rawSections[index].subsections
    section.subsections.forEach((subsection, index) => {
      Object.assign(subsection, { body: rawSubsections[index].body })
    })
  })

  const villaPageTitle = <Title size={'medLarge'} color={'white'}>{villaPage.title}</Title>
  const floorplanSectionData = villaPage.sections[0]
  const locationSectionData = villaPage.sections[1]
  const locationSectionBodyStyle = { textAlign: 'left' }
  const locationSectionBody = <Body blocks={locationSectionData.body} fontSize={'18px'} style={locationSectionBodyStyle} />
  const locationSectionTitle = <Title size={'medium'}>{locationSectionData.title}</Title>
  const locationSectionLeft =
    <TextSubsection >
      {locationSectionTitle}
      <br />
      {locationSectionBody}
    </TextSubsection>
  const locationSectionRight = <MapSubsection lat={locationSectionData.coordinates.lat} lng={locationSectionData.coordinates.lng} />

  const informationSectionData = villaPage.sections[2]
  const titleStyle = { paddingBottom: '15px', flex: 1 }
  const informationTitleSectionStyle = { display: 'flex', flexDirection: 'row', justifyContent: 'center' }
  const informationSectionTitle = <div style={informationTitleSectionStyle}><Title style={titleStyle} size={'medium'}>{informationSectionData.title}</Title><div style={titleStyle} /></div>

  const informationSectionBodyStyle = { textAlign: 'left' }
  const informationSectionBodyOne = <Body blocks={informationSectionData.subsections[0].body} fontSize={'20px'} style={informationSectionBodyStyle} />
  const informationSectionBodyTwo = <Body blocks={informationSectionData.subsections[1].body} fontSize={'20px'} style={informationSectionBodyStyle} />

  const informationSectionLeft =
    <TextSubsection >
      <Title style={titleStyle} size={'medium'}>{informationSectionData.title}</Title>
      {informationSectionBodyOne}
    </TextSubsection>

  const informationSectionRight =
    <TextSubsection >
      {informationSectionBodyTwo}
    </TextSubsection>

  const servicesSectionData = villaPage.sections[3]
  const servicesSectionImageOne = servicesSectionData.images[0].asset.fluid
  const servicesSectionImageTwo = servicesSectionData.images[1].asset.fluid
  const servicesSectionSubsectionOneButton = <Button size={'large'} text={servicesSectionData.subsections[0].links[0].text} linkDest={servicesSectionData.subsections[0].links[0].dest} primary={true} />
  const servicesSectionSubsectionTwoButton = <Button size={'large'} text={servicesSectionData.subsections[1].links[0].text} linkDest={servicesSectionData.subsections[1].links[0].dest} primary={true} />

  const servicesSectionTopLeft =
    <TextSubsection buttons={[servicesSectionSubsectionOneButton]}>
      <Title fontSize={'32px'} >{servicesSectionData.subsections[0].title}</Title>
      <br />
      <Body blocks={servicesSectionData.subsections[0].body} color={'black'} fontSize={'20px'} />
    </TextSubsection>

  const servicesSectionBottomRight =
    <TextSubsection buttons={[servicesSectionSubsectionTwoButton]}>
      <Title fontSize={'32px'}>{servicesSectionData.subsections[1].title}</Title>
      <br />
      <Body blocks={servicesSectionData.subsections[1].body} color={'black'} fontSize={'20px'} />
    </TextSubsection>

  const bookingSectionData = villaPage.sections[4]
  const bookingSectionImage = bookingSectionData.images[0].asset.fluid
  const bookingTitleStyle = { paddingBottom: '35px' }
  const bookingSectionTitle = <Title style={bookingTitleStyle} fontSize={'36px'} color={'black'}>{bookingSectionData.title}</Title>
  const bookingSectionBody = <Body blocks={bookingSectionData.body} color={'black'} fontSize={'20px'} />
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
    <Layout activePage={1}>
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      <MainImage fluid={villaPage.image.asset.fluid}>{villaPageTitle}</MainImage>
      <VillaPageFloorplanSection floorplanSectionData={floorplanSectionData} />
      <Line />
      <ContainerCenteredThin>
        <SplitView left={locationSectionLeft} right={locationSectionRight} />
      </ContainerCenteredThin>
      <Line />
      <ContainerCenteredThin>
        <SplitView left={informationSectionLeft} right={informationSectionRight} />
      </ContainerCenteredThin>
      <Line />
      <ContainerCenteredThin>
        <CheckerboardView textImagePairs={[{ text: servicesSectionTopLeft, fluid: servicesSectionImageOne }, { text: servicesSectionBottomRight, fluid: servicesSectionImageTwo }]} />
      </ContainerCenteredThin>
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

export default VillaPage
