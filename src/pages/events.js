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
import BannerImage from '../components/banner-image'
import ContainerCenteredThin from '../components/container-centered-thin'
import CheckerboardView from '../components/checkerboard-view'

export const query = graphql`
  query EventsPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    eventsPage: sanityPages(title: {eq: "Events"}) {
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
    }
  }
  }

`

const EventsPage = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site

  const eventsPage = (data || {}).eventsPage

  eventsPage.sections.forEach((section, index) => {
    Object.assign(section, { body: eventsPage._rawSections[index].body })
    const rawSubsections = eventsPage._rawSections[index].subsections
    section.subsections.forEach((subsection, index) => {
      Object.assign(subsection, { body: rawSubsections[index].body })
    })
  })

  const eventsPageTitle = <Title size={'medLarge'} color={'white'}>{eventsPage.title}</Title>

  const eventsPageSectionOne = eventsPage.sections[0]
  const eventsPageSectionOneTitle = <Title fontSize={'36px'}>{eventsPageSectionOne.title}</Title>
  const eventsPageSectionOneBody = <Body blocks={eventsPageSectionOne.body} size={'large'} />
  const eventsPageSectionOneRight =
    <TextSubsection>
      {eventsPageSectionOneTitle}
      <br />
      {eventsPageSectionOneBody}
    </TextSubsection>

  const eventsPageSectionTwo = eventsPage.sections[1]
  const eventsPageSectionTwoTitle = <Title fontSize={'36px'}>{eventsPageSectionTwo.title}</Title>
  const eventsPageSectionTwoBody = <Body blocks={eventsPageSectionTwo.body} size={'large'} />
  const eventsPageSectionTwoLeft =
    <TextSubsection>
      {eventsPageSectionTwoTitle}
      <br />
      {eventsPageSectionTwoBody}
    </TextSubsection>

  const eventsPageSectionThree = eventsPage.sections[2]
  const eventsPageSectionThreeTitle = <Title fontSize={'36px'}>{eventsPageSectionThree.title}</Title>
  const eventsPageSectionThreeBody = <Body blocks={eventsPageSectionThree.body} size={'large'} />
  const eventsPageSectionThreeRight =
    <TextSubsection>
      {eventsPageSectionThreeTitle}
      <br />
      {eventsPageSectionThreeBody}
    </TextSubsection>

  const eventsPageSectionFour = eventsPage.sections[3]
  const eventsPageSectionFourTitle = <Title fontSize={'32px'}>{eventsPageSectionFour.title}</Title>
  const eventsPageSectionFourBody = <Body blocks={eventsPageSectionFour.body} size={'large'} />
  const eventsPageSectionFourLeft =
    <TextSubsection>
      {eventsPageSectionFourTitle}
      <br />
      {eventsPageSectionFourBody}
    </TextSubsection>

  const bookingSectionData = eventsPage.sections[4]
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
    <Layout activePage={3}>
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      <BannerImage fluid={eventsPage.image.asset.fluid}>{eventsPageTitle}</BannerImage>
      <ContainerCenteredThin>
        <CheckerboardView textImagePairs={[{ text: eventsPageSectionOneRight, fluid: eventsPageSectionOne.images[0].asset.fluid },
        { text: eventsPageSectionTwoLeft, fluid: eventsPageSectionTwo.images[0].asset.fluid },
        { text: eventsPageSectionThreeRight, fluid: eventsPageSectionThree.images[0].asset.fluid },
        { text: eventsPageSectionFourLeft, fluid: eventsPageSectionFour.images[0].asset.fluid }]} />
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

export default EventsPage
