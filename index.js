const express = require('express')
const axios = require('axios')
const cors = require ('cors')
const app = express()
const port = 3000
require('dotenv').config()

app.use(cors())


app.get ('/random3Anime', (req, res) => {
  let animeArr = [];
    axios.get('https://api.jikan.moe/v4/random/anime').then( function (response) {
      let animeData = response.data.data;
      let animeName = animeData.title_english || animeData.title;

      animeArr.push(animeName)

      axios.get('https://api.jikan.moe/v4/random/anime').then( function (response) {
        let animeData = response.data.data;
        let animeName = animeData.title_english || animeData.title;

        animeArr.push(animeName)

        axios.get('https://api.jikan.moe/v4/random/anime').then( function (response) {
          let animeData = response.data.data;
          let animeName = animeData.title_english || animeData.title;

          animeArr.push(animeName)
          res.send(animeArr)

        })
      })
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
      res.send(response.data.data)
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