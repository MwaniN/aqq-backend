const verifyToken = require('./firebaseAuthMiddleware.js');
const express = require('express')
const axios = require('axios')
const cors = require ('cors')
const app = express()
const port = 3000

const client = require('./db');
const models = require('./db/models.js')

require('dotenv').config()

app.use(cors())

const fs = require('fs').promises;

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

app.get ('/random4Anime', (req, res) => {

  let topAnimeNameArray = null

  async function retrieveTopAnime() {
    const data = await fs.readFile("topAnimeNameArray.txt", "utf8");
    topAnimeNameArray = Buffer.from(data);

    topAnimeNameArray = JSON.parse(topAnimeNameArray);

    let randomIndexes = []

    while (randomIndexes.length <= 3) {
      rndInt = randomIntFromInterval(0, topAnimeNameArray.length - 1);

      if (!randomIndexes.includes(rndInt)) {
        randomIndexes.push(rndInt)
      }

    }

    let random4Anime = []

    for (let index of randomIndexes) {
      random4Anime.push(topAnimeNameArray[index])
    }

    res.send(JSON.stringify(random4Anime))
  }

  retrieveTopAnime()
  // let animeArr = [];
    // axios.get('https://api.jikan.moe/v4/random/anime').then( function (response) {
    //   let animeData = response.data.data;
    //   let animeName = animeData.title_english || animeData.title;

    //   animeArr.push(animeName)

    //   axios.get('https://api.jikan.moe/v4/random/anime').then( function (response) {
    //     let animeData = response.data.data;
    //     let animeName = animeData.title_english || animeData.title;

    //     animeArr.push(animeName)

    //     axios.get('https://api.jikan.moe/v4/random/anime').then( function (response) {
    //       let animeData = response.data.data;
    //       let animeName = animeData.title_english || animeData.title;

    //       animeArr.push(animeName)
    //       res.send(animeArr)

    //     })
    //   })
    // })
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

app.post('/verifyUserID', (req, res) => {

  // the below passes in the callback that will be executed once the identity is verified

  verifyToken(req, res, () => {
    console.log("You did it! Here a particular request would be processed like updating the SQL backend.")
  })

})

// sign up will create a new user entry in the database

// login will confirm that the logged in user is in the database and return some information

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
})