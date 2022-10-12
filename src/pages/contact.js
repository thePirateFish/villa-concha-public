import React from 'react'
import { graphql } from 'gatsby'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import BannerImage from '../components/banner-image'
import SplitView from '../components/split-view'
import Title from '../components/title'
import Line from '../components/line'
import MapSubsection from '../components/map-subsection'
import ContainerCenteredThin from '../components/container-centered-thin'
import DropdownSection from '../components/dropdown-section'
import FAQSection from '../sections/faq-section'
import ContactSection from '../sections/contact-section'
const BlockContent = require('@sanity/block-content-to-react')

export const query = graphql`
  query ContactPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    contactPage: sanityPages(title: {eq: "Contact Us"}) {
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

const ContactPage = props => {
  const { data, errors } = props

  const contactPage = (data || {}).contactPage

  contactPage.sections.forEach((section, index) => {
    Object.assign(section, { body: contactPage._rawSections[index].body })
    const rawSubsections = contactPage._rawSections[index].subsections
    section.subsections.forEach((subsection, index) => {
      Object.assign(subsection, { body: rawSubsections[index].body })
    })
  })

  const contactPageTitle = <Title size={'medLarge'} color={'white'}>{contactPage.title}</Title>

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  const locationSectionData = contactPage.sections[0]

  const locationSectionLeft = <MapSubsection lat={locationSectionData.coordinates.lat} lng={locationSectionData.coordinates.lng} />

  const contactSectionRight = <ContactSection title={locationSectionData.title} body={locationSectionData.body} subsections={locationSectionData.subsections} />

  const faqSectionData = contactPage.sections[1]

  const faqSectionTitle = <Title fontSize={'36px'} color={'black'}>{faqSectionData.title}</Title>
  var faqBody = null
  const faqSectionLeftCol = faqSectionData.subsections.map((subsectionData, index) => {
    faqBody = <BlockContent blocks={subsectionData.body} renderContainerOnSingleChild={true} />
    if (index < faqSectionData.subsections.length / 2) {
      return <DropdownSection title={subsectionData.title} body={faqBody} />
    }
  })
  const faqSectionRightCol = faqSectionData.subsections.map((subsectionData, index) => {
    faqBody = <BlockContent blocks={subsectionData.body} renderContainerOnSingleChild={true} />
    if (index >= faqSectionData.subsections.length / 2) {
      return <DropdownSection title={subsectionData.title} body={faqBody} />
    }
  })
  const faqSectionMain =
    <FAQSection leftCol={faqSectionLeftCol} rightCol={faqSectionRightCol}>
    </FAQSection>

  return (
    <Layout activePage={7}>
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      <BannerImage fluid={contactPage.image.asset.fluid}>{contactPageTitle}</BannerImage>
      <ContainerCenteredThin>
        <SplitView left={locationSectionLeft} right={contactSectionRight} />
        {/* <ContactSection map={locationSectionLeft} title={locationSectionData.title} body={locationSectionData.body} subsections={locationSectionData.subsections} /> */}
      </ContainerCenteredThin>
      <Line />
      <ContainerCenteredThin flexDirection={'column'}>
        {faqSectionTitle}
        {faqSectionMain}
      </ContainerCenteredThin>

    </Layout>
  )
}

export default ContactPage
