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

module.exports.login = async function (req, res, userObject) {

  let uid = userObject.uid;

  try {
    let email = await client.query(`SELECT email FROM users WHERE id = '${uid}';`)

    res.status(200).send({ email: `${email}`});
    console.log('User logged in successfully');
  } catch (error) {
    console.log(error, " error logging in user")
    res.status(400).send(error, " error logging in user")
  }

}

module.exports.profile = async function (req, res, userObject) {
  // replace with info for profile page
  // username, email, date joined
}

module.exports.bookmarks = async function (req, res, userObject) {
  // replace with bookmarked quotes for that user
  // pull them from the SQL DB and paginate over a certain amount
}

module.exports.new_bookmark = async function (req, res, userObject) {
  // add a new bookmark to the db for that user and return success to the client
}