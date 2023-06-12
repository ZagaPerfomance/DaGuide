const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || 'DaGuide',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
  },
  server: {
    port: process.env.PORT || 4444,
    isProduction: process.env.NODE_ENV === 'production',
  },
  jwtSecret: process.env.JWT_SECRET || 'mysecretkey',
  email: {
    host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
    port: process.env.EMAIL_PORT || 587,
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
  },
  cache: {
    isEnabled: process.env.CACHE_ENABLED || false,
    expiry: process.env.CACHE_EXPIRY || 3600, // seconds
  },
  logLevel: process.env.LOG_LEVEL || 'info',
};