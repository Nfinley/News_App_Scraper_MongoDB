'use strict';

const express = require('express'),
    newsController = require('../controllers/newsController'),
    router = express.Router();


/* GET news listing via the scraper, scraper function housed in controller */
router.get('/', newsController.scrapeNews);


//get route to GET THE ARTICLES from the data base and store them in  a session variable
router.get('/getNews', newsController.getNews);

// get route to render the page based on the session variable data
router.get('/renderNews', newsController.renderNews);


//This will handle the right arrow click on the page
router.get('/next/:index/:id', newsController.nextArticle);

//This will handle the right arrow click on the page
router.get('/previous/:index/:id', newsController.previousArticle);



//create post to create a new note or update existing note
router.put('/update/:id', newsController.updateNote);

//route that will delete the note
router.delete('/delete/:id', newsController.deleteNote);

//create get route to pull articles by Object ID with the notes (add News.find() + .populate("note") in controller )
// router.get('/:id', newsController.populateNote);

module.exports = router;
