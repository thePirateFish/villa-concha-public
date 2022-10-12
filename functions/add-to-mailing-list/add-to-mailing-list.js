// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const { google } = require('googleapis')
require('dotenv').config()

const SCOPES = ['https://www.googleapis.com/auth/admin.directory.group.member',
  'https://www.googleapis.com/auth/admin.directory.group',
  'https://www.googleapis.com/auth/admin.directory.user',
  'https://www.googleapis.com/auth/admin.directory.user.security']
const GROUP_KEY = 'mailing-list@villa-concha.com'
const ADMIN_EMAIL = 'admin@villa-concha.com'

const addEmail = async (email) => {
  const client = new google.auth.JWT({
    key: process.env.GAPI_PRIVATE_KEY[0] === '-' ? process.env.GAPI_PRIVATE_KEY : JSON.parse(process.env.GAPI_PRIVATE_KEY),
    scopes: SCOPES,
    subject: ADMIN_EMAIL,
    email: process.env.GAPI_CLIENT_EMAIL
  })

  const url = 'https://www.googleapis.com/admin/directory/v1/groups/' + GROUP_KEY + '/members'
  const newMember = { email: email, role: 'MEMBER' }
  const res = await client.request({
    url: url,
    method: 'POST',
    body: JSON.stringify(newMember)
  })

  return res.data
}

exports.handler = async (event, context, callback) => {
  const body = JSON.parse(event.body)
  await addEmail(body.email).then(data => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(data)
    })
  }).catch(err => {
    console.log(err)
    callback(Error(err))
  })

}
