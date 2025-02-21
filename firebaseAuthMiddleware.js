const admin = require('./firebaseAdmin.js')

const getAuthToken = function (req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
}


const verifyToken = function (req, res, next) {
  const idToken = getAuthToken(req);

  admin.auth().verifyIdToken(idToken).then((decodedToken) => {
    const uid = decodedToken.uid
    console.log(decodedToken);
    // user is authenticated, proceed with handling the request
    // use next() to run a callback related to the particular request
    // that way it can be used multiple times.
    // It's a callback.
    next();
    res.status(200).send({ message: 'Request processed successfully'});
  }).catch((error) => {
    // Handle error, such as invalid or expired token
    res.status(401).send({ error: 'Unauthorized'});
  })

};

module.exports = verifyToken;
