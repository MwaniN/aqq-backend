const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "My_Database_URL_Goes_Here"
});

module.exports = admin;