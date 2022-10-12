import React from 'react'
import { graphql } from 'gatsby'
import ContainerCentered from '../components/container-centered'
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
  query ServicesPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    servicesPage: sanityPages(title: {eq: "Services"}) {
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

const ServicesPage = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
  const servicesPage = (data || {}).servicesPage

  servicesPage.sections.forEach((section, index) => {
    Object.assign(section, { body: servicesPage._rawSections[index].body })
    const rawSubsections = servicesPage._rawSections[index].subsections
    section.subsections.forEach((subsection, index) => {
      Object.assign(subsection, { body: rawSubsections[index].body })
    })
  })


  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  const servicesPageTitle = <Title size={'medLarge'} color={'white'}>{servicesPage.title}</Title>

  const servicesPageSectionOne = servicesPage.sections[0]
  const servicesPageSectionOneTitle = <Title size={'large'}>{servicesPageSectionOne.title}</Title>
  const servicesPageSectionOneBody = <Body blocks={servicesPageSectionOne.body} size={'large'} />


  const servicesPageSectionTwo = servicesPage.sections[1]
  const servicesPageSectionTwoSubsectionOneTitle = <Title fontSize={'32px'}>{servicesPageSectionTwo.subsections[0].title}</Title>
  const servicesPageSectionTwoSubsectionOneBody = <Body fontSize={'16px'} blocks={servicesPageSectionTwo.subsections[0].body} />
  const servicesPageSectionTwoSubsectionTwoTitle = <Title fontSize={'32px'}>{servicesPageSectionTwo.subsections[1].title}</Title>
  const servicesPageSectionTwoSubsectionTwoBody = <Body fontSize={'16px'} blocks={servicesPageSectionTwo.subsections[1].body} />
  const sectionTwoSubsectionOneText =
    <TextSubsection>
      {servicesPageSectionTwoSubsectionOneTitle}
      {servicesPageSectionTwoSubsectionOneBody}
    </TextSubsection>
  const sectionTwoSubsectionTwoText =
    <TextSubsection>
      {servicesPageSectionTwoSubsectionTwoTitle}
      {servicesPageSectionTwoSubsectionTwoBody}
    </TextSubsection>

  const servicesPageSectionThree = servicesPage.sections[2]
  const servicesPageSectionThreeTitle = <Title size={'medLarge'}>{servicesPageSectionThree.title}</Title>
  const servicesPageSectionThreeBody = <Body blocks={servicesPageSectionThree.body} size={'large'} />

  const servicesPageSectionFour = servicesPage.sections[3]
  const servicesPageSectionFourImageOne = <Picture fluid={servicesPageSectionFour.images[0].asset.fluid} sizes={"32vw"} />
  const servicesPageSectionFourImageTwo = <Picture fluid={servicesPageSectionFour.images[1].asset.fluid} sizes={"32vw"} />
  const servicesPageSectionFourImageThree = <Picture fluid={servicesPageSectionFour.images[2].asset.fluid} sizes={"32vw"} />

  const servicesPageSectionFourSubsectionOneTitle = <Title fontSize={'32px'}>{servicesPageSectionFour.subsections[0].title}</Title>
  const servicesPageSectionFourSubsectionOneBody = <Body fontSize={'16px'} blocks={servicesPageSectionFour.subsections[0].body} />
  const servicesPageSectionFourSubsectionTwoTitle = <Title fontSize={'32px'} size={'medLarge'}>{servicesPageSectionFour.subsections[1].title}</Title>
  const servicesPageSectionFourSubsectionTwoBody = <Body fontSize={'16px'} blocks={servicesPageSectionFour.subsections[1].body} />
  const servicesPageSectionFourSubsectionThreeTitle = <Title fontSize={'32px'} size={'medLarge'}>{servicesPageSectionFour.subsections[2].title}</Title>
  const servicesPageSectionFourSubsectionThreeBody = <Body fontSize={'16px'} blocks={servicesPageSectionFour.subsections[2].body} />

  const sectionFourSubsectionOneText =
    <TextSubsection>
      {servicesPageSectionFourSubsectionOneTitle}
      {servicesPageSectionFourSubsectionOneBody}
    </TextSubsection>
  const sectionFourSubsectionTwoText =
    <TextSubsection>
      {servicesPageSectionFourSubsectionTwoTitle}
      {servicesPageSectionFourSubsectionTwoBody}
    </TextSubsection>
  const sectionFourSubsectionThreeText =
    <TextSubsection>
      {servicesPageSectionFourSubsectionThreeTitle}
      {servicesPageSectionFourSubsectionThreeBody}
    </TextSubsection>


  const bookingSectionData = servicesPage.sections[4]
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

  return (
    <Layout activePage={4}>
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      <BannerImage fluid={servicesPage.image.asset.fluid}>{servicesPageTitle}</BannerImage>
      <ContainerCentered>
        {servicesPageSectionOneTitle}
        {servicesPageSectionOneBody}
      </ContainerCentered>
      <ContainerCenteredThin>
        <CheckerboardView textImagePairs={[{ text: sectionTwoSubsectionOneText, fluid: servicesPageSectionTwo.images[0].asset.fluid }, { text: sectionTwoSubsectionTwoText, fluid: servicesPageSectionTwo.images[1].asset.fluid }]} />
      </ContainerCenteredThin>
      <ContainerCentered>
        {servicesPageSectionThreeTitle}
        {servicesPageSectionThreeBody}
      </ContainerCentered>
      <ContainerCentered>
        <CheckerboardView textImagePairs={[{ text: sectionFourSubsectionOneText, fluid: servicesPageSectionFour.images[0].asset.fluid }, { text: sectionFourSubsectionTwoText, fluid: servicesPageSectionFour.images[1].asset.fluid }, { text: sectionFourSubsectionThreeText, fluid: servicesPageSectionFour.images[2].asset.fluid }]} />
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

export default ServicesPage
