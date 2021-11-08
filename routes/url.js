const express = require('express');
const router = express.Router();
const validurl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../models/Url');

//@route POST /API/URL/SHORTEN
//@desc create short URL
router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    const baseUrl = config.get('baseUrl');

    //check base url
    if(!validurl.isUri(process.env.BASEURL)){
        return res.status(401).json('Invalid base url');
    }

    //create url code
    const urlCode = shortid.generate();

    //check long url
    if(validurl.isUri(longUrl)){
        try {
            let url = await Url.findOne({longUrl});

            if(url){
                Url.find()
                    .then((result) => {
                        console.log(result);
                        res.render('index', {urls: result});
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            } else {
                const shortUrl = process.env.BASEURL + '/' + urlCode;
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                })

                await url.save();
                Url.find()
                    .then((result) => {
                        res.render('index', {urls: result});
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json('Server error');
        }
    } else {
        res.status(401).json('Invalid long url');
    }
});

module.exports = router;