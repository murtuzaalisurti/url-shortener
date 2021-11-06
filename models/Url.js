const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    urlCode: {
        type: String,
        required: true
    },
    longUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true
    },
    date: { 
        type: String, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Url', UrlSchema);