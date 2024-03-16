const dotenv = require('dotenv');
const program = require('./commanders.js');

const { mode } = program.opts();
dotenv.config({
    path: mode === 'production' ? './.env.production' : './.env.development',
});

const configObject = {
    PORT: process.env.PORT || 4000,
    mongo_url: process.env.MONGO_URL,
    jwt_secret_key: process.env.jwt_secret_key,
    percistance: process.env.PERCISTANCE,
    logger: process.env.LOGGER,
    mailerDir: process.env.GMAIL_APP_USER,
    mailerPass: process.env.GMAIL_APP_PASS,
};

module.exports = configObject;
