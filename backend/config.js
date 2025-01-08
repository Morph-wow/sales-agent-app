require('dotenv').config({ path: './.env' }); // Specifica il percorso del .env
require('dotenv').config(); // Carica le variabili di ambiente dal file .env

const config = {
  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN,
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  salesforce: {
    loginUrl: process.env.SALESFORCE_LOGIN_URL,
    username: process.env.SALESFORCE_USERNAME,
    password: process.env.SALESFORCE_PASSWORD,
    consumerKey: process.env.SALESFORCE_CLIENT_ID, // Client ID
    secretKey: process.env.SALESFORCE_CLIENT_SECRET, // Client Secret
  },
  
};

module.exports = config;
