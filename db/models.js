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

    client.query(`SELECT email, date_joined FROM users WHERE id = '${uid}';`).then((result) => {
      let email = result.rows[0].email
      let date_joined = result.rows[0].date_joined

      console.log(email, date_joined, "this is email and date_joined from the thenified function")

      res.status(200).send({ "email": `${email}`, "date_joined" : date_joined});
      console.log('User logged in successfully');
    }).catch((error) => {
      console.log(error, " error logging in user")
      res.status(400).send(error, " error logging in user")
    })
}

module.exports.update_stats = function (req, res, userObject) {

  let uid = userObject.uid;

  client.query(``)


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
