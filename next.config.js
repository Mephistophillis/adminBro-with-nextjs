require('dotenv').config()

module.exports = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    DB_NAME: process.env.DB_NAME,
    WEB_URI: process.env.WEB_URI,
    EMAIL_FROM: process.env.EMAIL_FROM,
  },
}
