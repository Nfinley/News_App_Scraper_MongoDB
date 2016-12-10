'use strict';

const express = require('express'),
    newsController = require('../controllers/newsController'),
    router = express.Router();


/* GET news listing via the scraper, scraper function housed in controller */
router.get('/', newsController.insertNews);


//create get route to GET THE ARTICLES
router.get('/getNews', newsController.getNews);

//create get route to pull articles by Object ID with the notes (add News.find() + .populate("note") in controller )
router.get('/:id', newsController.populateNote);



//create post to create a new note or update existing note
router.post('/:id', newsController.updateNote);

module.exports = router;
