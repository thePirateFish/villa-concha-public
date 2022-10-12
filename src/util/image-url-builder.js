import imageUrlBuilder from '@sanity/image-url'
import clientConfig from '../../client-config'
const sanityClient = require('@sanity/client')

const client = sanityClient(clientConfig.sanity)
const builder = imageUrlBuilder(client)

function urlFor(source) {
    return builder.image(source)
  }

export default urlFor