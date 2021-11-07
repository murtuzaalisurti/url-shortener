const mongoose = require('mongoose');
const config = require('config');
const dotenv = require('dotenv').config();
const db = process.env.MONGOURI;

const connect_db = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true
        });
        console.log("mongodb connected");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connect_db;