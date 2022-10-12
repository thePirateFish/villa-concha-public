/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
// You can delete this file if you're not using it

/**
 * You can uncomment the following line to verify that
 * your plugin is being loaded in your site.
 *
 * See: https://www.gatsbyjs.org/docs/creating-a-local-plugin/#developing-a-local-plugin-that-is-outside-your-project
 */
exports.onPreInit = () => console.log("Loaded gatsby-source-smoobu")
const clientConfig = require('./client-config')
const fetch = require('node-fetch');
const moment = require('moment');

const bookingOptions = {
    method: 'GET',
    headers: {
        'Api-Key': clientConfig.smoobu.apiKey,
        'Cache-Control': 'no-cache'
    }
}

const RATES_NODE_TYPE = `Rates`

exports.sourceNodes = async ({
    actions,
    createContentDigest,
    createNodeId,
    getNodesByType,
}) => {
    const { createNode } = actions

    const todaysDate = new Date()
    const today = moment(todaysDate).format('YYYY-MM-DD')
    const endDate = moment(today).add(2, 'y').format('YYYY-MM-DD')
    const ratesData = await fetch(`https://login.smoobu.com/api/rates?apartments[]=476478&start_date=${today}&end_date=${endDate}`, bookingOptions)
        .then(res => res.json())
        .then(json => {
            return json
        })
        .then(json => {
            const ratesObj = json.data['476478']
            const rates = []
            for (const date in ratesObj) {
                var newRatesObj = { date: moment(date).format('MM-DD-YYYY') }
                Object.assign(newRatesObj, ratesObj[date])
                rates.push(newRatesObj)
            }
            createNode({
                rates,
                id: createNodeId(`${RATES_NODE_TYPE}-1`),
                parent: null,
                children: [],
                internal: {
                    type: RATES_NODE_TYPE,
                    content: JSON.stringify(rates),
                    contentDigest: createContentDigest(rates),
                },
            })
        })
    return
}
