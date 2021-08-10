const contentful = require('contentful')
require("dotenv").config({ path: "../../.env" });

const client = contentful.createClient({
    // This is the access token for this space. Normally you get the token in the Contentful web app
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    space: process.env.CONTENTFUL_SPACE_ID
})

const clientPreview = contentful.createClient({
    // This is the access token for this space. Normally you get the token in the Contentful web app
    accessToken: process.env.CONTENTFUL_ACCESS_PREVIEW_TOKEN,
    space: process.env.CONTENTFUL_SPACE_ID,
    host: "preview.contentful.com"
})

module.exports = {client, clientPreview}
