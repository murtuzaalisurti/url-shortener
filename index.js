const express = require('express');
const connect_db = require('./config/db');
const dotenv = require('dotenv').config();
const app = express();

//listening to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {`Server running in PORT ${PORT}`});

//connect to database
connect_db();

//middllewares
app.use(express.json({extended: false}));
app.use(express.urlencoded({extended: true}));

//ejs view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static("public"));

//get request
// app.get("/", (req, res) => {
//     res.render('index.ejs');
// })

//defining routes
app.use('/', require('./routes/index'))
app.use('/api/url', require('./routes/url'))
