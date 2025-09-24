const client = require('./index.js')


module.exports.signup = async function (req, res, userObject) {

  let uid = userObject.uid;
  let email = userObject.email;
  let date = Date.now(); // stores it as a BIGINT

  try {
    await client.query(`INSERT INTO users (id, email, date_joined) VALUES ('${uid}', '${email}', '${date}') ON CONFLICT (id) DO NOTHING;`)

    res.status(200).send({ email: `${email}`});
    console.log('User added successfully');
  } catch (error) {
    console.log(error, " error adding user")
    res.status(400).send(error, " error adding user")
  }


  return
}

module.exports.login = function (req, res, userObject) {

  let uid = userObject.uid;

    client.query(`SELECT email, date_joined, high_score_5, high_score_10, high_score_15, games_played_5, games_played_10, games_played_15 FROM users WHERE id = '${uid}';`).then((result) => {
      let email = result.rows[0].email
      let date_joined = result.rows[0].date_joined
      let high_score_5 = result.rows[0].high_score_5
      let high_score_10 = result.rows[0].high_score_10
      let high_score_15 = result.rows[0].high_score_15
      let games_played_5 = result.rows[0].games_played_5
      let games_played_10 = result.rows[0].games_played_10
      let games_played_15 = result.rows[0].games_played_15

      console.log(email, date_joined, high_score_5, high_score_10, high_score_15, games_played_5, games_played_10, games_played_15, "this is all user stats from the thenified function")

      res.status(200).send({ 
        "email": `${email}`, 
        "date_joined": date_joined, 
        "high_score_5": high_score_5,
        "high_score_10": high_score_10,
        "high_score_15": high_score_15,
        "games_played_5": games_played_5,
        "games_played_10": games_played_10,
        "games_played_15": games_played_15
      });
      console.log('User logged in successfully');
    }).catch((error) => {
      console.log(error, " error logging in user")
      res.status(400).send(error, " error logging in user")
    })
}

module.exports.update_stats = async function (req, res, userObject) {

  console.log(`THIS IS REQ.BODY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`, req.body, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")

  let uid = userObject.uid;
  let currScore = req.body.score;
  let gameType = req.body.gameType; // expects '5', '10', or '15'

  try {

    // update number of games completed for the specific game type
    await client.query(`UPDATE users
      SET games_played_${gameType} = games_played_${gameType} + 1
      WHERE id = '${uid}';`)

    // update highest score for the specific game type if the new one is higher
    await client.query(`UPDATE users
      SET high_score_${gameType} = GREATEST(high_score_${gameType},'${currScore}')
      WHERE id = '${uid}';`)

    // also update the general games_played counter for backward compatibility
    await client.query(`UPDATE users
      SET games_played = games_played + 1
      WHERE id = '${uid}';`)

    // get the updated stats to return
    const result = await client.query(`SELECT high_score_${gameType}, games_played_${gameType}, games_played FROM users WHERE id = '${uid}';`)
    const updatedHighScore = result.rows[0][`high_score_${gameType}`]
    const updatedGamesPlayed = result.rows[0][`games_played_${gameType}`]
    const totalGamesPlayed = result.rows[0].games_played

    res.status(201).send({
      "high_score": updatedHighScore,
      "games_played": updatedGamesPlayed,
      "total_games_played": totalGamesPlayed,
      "game_type": gameType
    })

  } catch (error) {
    console.log(error, " error updating user stats")
    res.status(500).send(error, " error updating user stats")
  }


}


// module.exports.new_bookmark = async function (req, res, userObject) {
//   // add a new bookmark to the db for that user and return success to the client
// }

// module.exports.profile = async function (req, res, userObject) {
//   // replace with info for profile page
//   // username, email, date joined
//   // add options for username and profile photo in the db first
//   // or could simply use the ones from firebase instead and only pull the quotes etc. from the db
// }

// module.exports.bookmarks = async function (req, res, userObject) {
//   // replace with bookmarked quotes for that user
//   // pull them from the SQL DB and paginate over a certain amount
// }
