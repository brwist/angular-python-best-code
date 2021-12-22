module.exports = {
    "development": {
      "dialect": "sqlite",
      "storage": "user.db",
      "logging" : false
    },
    "production": {
      "username": process.env.DB_USERNAME || '',
      "password": process.env.DB_PASSWORD || '',
      "database": process.env.DB_NAME || "user",
      "host": process.env.DB_HOST || "127.0.0.1",
      "dialect": "sqlite"
    }
  }