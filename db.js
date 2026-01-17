const mongoose = require('mongoose');
require('dotenv').config();

console.log('RAW ENV VALUE:', process.env.MONGODB_URL_LOCAL);
console.log('TYPE:', typeof process.env.MONGODB_URL_LOCAL);

const mongoURL = process.env.MONGODB_URL_LOCAL;

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
