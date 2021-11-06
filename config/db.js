const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

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