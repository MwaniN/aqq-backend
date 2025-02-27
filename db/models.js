const client = require('./index.js')


module.exports.signup = async function (req, res, userObject) {

  let uid = userObject.uid;
  let email = userObject.email;
  let date = Date.now(); // stores it as a BIGINT

  await client.query(`INSERT INTO users (id, email, date_joined) VALUES ('${uid}', '${email}', ${date})`)

  res.status(200).send({ email: `${email}`});

  return
}