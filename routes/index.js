const express = require('express');
// const app = express();
const router = express.Router();

const Url = require('../models/Url');

// app.get("/", (req, res) => {
//     res.render('index.ejs');
// })

router.get('/', (req, res) => {
    Url.find()
        .then((result) => {
            res.render('index', {urls: result});
        })
        .catch((err) => {
            console.log(err);
        })
})

//@route  GET:/code
//@desc redirect to long url

router.get('/:code', async (req, res) => {
    try {
        const url = await Url.findOne({urlCode: req.params.code});
        if(url){
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json('Not found url');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json('server error');
    }
})
module.exports = router;