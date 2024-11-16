const express = require('express')
const axios = require('axios')
const cors = require ('cors')
const app = express()
const port = 3000
require('dotenv').config()

app.use(cors())


app.get ('/randomAnime', (req, res) => {
    axios.get('https://api.jikan.moe/v4/random/anime').then( function (response) {
      let animeName = response.data.data.title
      console.log(animeName, " THIS IS animeName")
      res.send(animeName)
    })
})

app.get('/randomQuote', (req, res) => {
  axios(
    {
      method: 'get',
      url: 'https://animechan.io/api/v1/quotes/random',
      headers: {
        'x-api-key': process.env.API_KEY}
      }
    ).then(function (response) {
      res.send(response.data.data.content)
    }).catch(
      function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      }
    )
})

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
})