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
  query ExperiencesPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    experiencesPage: sanityPages(title: {eq: "Experiences"}) {
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

const ExperiencesPage = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
  const experiencesPage = (data || {}).experiencesPage

  experiencesPage.sections.forEach((section, index) => {
    Object.assign(section, { body: experiencesPage._rawSections[index].body })
    const rawSubsections = experiencesPage._rawSections[index].subsections
    section.subsections.forEach((subsection, index) => {
      Object.assign(subsection, { body: rawSubsections[index].body })
    })
  })

  const experiencesPageTitle = <Title size={'medLarge'} color={'white'}>{experiencesPage.title}</Title>

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  const experiencesPageSectionOne = experiencesPage.sections[0]
  const experiencesPageSectionOneTitle = <Title size={'large'}>{experiencesPageSectionOne.title}</Title>
  const experiencesPageSectionOneBody = <Body blocks={experiencesPageSectionOne.body} size={'large'} />


  const experiencesPageSectionTwo = experiencesPage.sections[1]
  const experiencesPageSectionTwoSubsectionOneTitle = <Title fontSize={'32px'}>{experiencesPageSectionTwo.subsections[0].title}</Title>
  const experiencesPageSectionTwoSubsectionOneBody = <Body fontSize={'16px'} blocks={experiencesPageSectionTwo.subsections[0].body} />
  const experiencesPageSectionTwoSubsectionTwoTitle = <Title fontSize={'32px'}>{experiencesPageSectionTwo.subsections[1].title}</Title>
  const experiencesPageSectionTwoSubsectionTwoBody = <Body fontSize={'16px'} blocks={experiencesPageSectionTwo.subsections[1].body} />
  const experiencesPageSectionTwoSubsectionThreeTitle = <Title fontSize={'32px'}>{experiencesPageSectionTwo.subsections[2].title}</Title>
  const experiencesPageSectionTwoSubsectionThreeBody = <Body fontSize={'16px'} blocks={experiencesPageSectionTwo.subsections[2].body} />

  const textOne = <TextSubsection>
    {experiencesPageSectionTwoSubsectionOneTitle}
    {experiencesPageSectionTwoSubsectionOneBody}
  </TextSubsection>

  const textTwo = <TextSubsection>
    {experiencesPageSectionTwoSubsectionTwoTitle}
    {experiencesPageSectionTwoSubsectionTwoBody}
  </TextSubsection>

  const textThree = <TextSubsection>
    {experiencesPageSectionTwoSubsectionThreeTitle}
    {experiencesPageSectionTwoSubsectionThreeBody}
  </TextSubsection>


  const experiencesPageSectionThree = experiencesPage.sections[2]
  const experiencesPageSectionThreeTitle = <Title size={'medLarge'}>{experiencesPageSectionThree.title}</Title>
  const experiencesPageSectionThreeBody = <Body blocks={experiencesPageSectionThree.body} size={'large'} />

  const experiencesPageSectionFour = experiencesPage.sections[3]

  const experiencesPageSectionFourSubsectionOneTitle = <Title fontSize={'32px'}>{experiencesPageSectionFour.subsections[0].title}</Title>
  const experiencesPageSectionFourSubsectionOneBody = <Body fontSize={'16px'} blocks={experiencesPageSectionFour.subsections[0].body} />
  const experiencesPageSectionFourSubsectionTwoTitle = <Title fontSize={'32px'}>{experiencesPageSectionFour.subsections[1].title}</Title>
  const experiencesPageSectionFourSubsectionTwoBody = <Body fontSize={'16px'} blocks={experiencesPageSectionFour.subsections[1].body} />
  const experiencesPageSectionFourSubsectionThreeTitle = <Title fontSize={'32px'}>{experiencesPageSectionFour.subsections[2].title}</Title>
  const experiencesPageSectionFourSubsectionThreeBody = <Body fontSize={'16px'} blocks={experiencesPageSectionFour.subsections[2].body} />

  const sectionFourTextOne = <TextSubsection>
    {experiencesPageSectionFourSubsectionOneTitle}
    {experiencesPageSectionFourSubsectionOneBody}
  </TextSubsection>

  const sectionFourTextTwo = <TextSubsection>
    {experiencesPageSectionFourSubsectionTwoTitle}
    {experiencesPageSectionFourSubsectionTwoBody}
  </TextSubsection>

  const sectionFourTextThree = <TextSubsection>
    {experiencesPageSectionFourSubsectionThreeTitle}
    {experiencesPageSectionFourSubsectionThreeBody}
  </TextSubsection>


  const bookingSectionData = experiencesPage.sections[4]
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
    <Layout activePage={5}>
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      <BannerImage fluid={experiencesPage.image.asset.fluid}>{experiencesPageTitle}</BannerImage>
      <ContainerCentered>
        {experiencesPageSectionOneTitle}
        {experiencesPageSectionOneBody}
      </ContainerCentered>
      <ContainerCenteredThin>
        <CheckerboardView textImagePairs={[{ text: textOne, fluid: experiencesPageSectionTwo.images[0].asset.fluid }, { text: textTwo, fluid: experiencesPageSectionTwo.images[1].asset.fluid }, { text: textThree, fluid: experiencesPageSectionTwo.images[2].asset.fluid }]} />
      </ContainerCenteredThin>
      <ContainerCentered>
        {experiencesPageSectionThreeTitle}
        {experiencesPageSectionThreeBody}
      </ContainerCentered>
      <ContainerCentered>
        <CheckerboardView textImagePairs={[{ text: sectionFourTextOne, fluid: experiencesPageSectionFour.images[0].asset.fluid }, { text: sectionFourTextTwo, fluid: experiencesPageSectionFour.images[1].asset.fluid }, { text: sectionFourTextThree, fluid: experiencesPageSectionFour.images[2].asset.fluid }]} />
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

export default ExperiencesPage
