const express = require('express')
const axios = require('axios')
const cors = require ('cors')
const app = express()
const port = 3000


app.use(cors())


app.get ('/randomAnime', (req, res) => {
    axios.get('https://api.jikan.moe/v4/random/anime').then( function (response) {
      let animeName = response.data.data.title
      console.log(animeName, " THIS IS animeName")
      res.send(animeName)
    })
})

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
})