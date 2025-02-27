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