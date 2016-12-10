'use strict';

const services = require('../services');


//this is the function that is called in the index router that will load the page
module.exports = {
    loadIndex: (req, res) => {
        res.render('index', {page_title: 'Scrappin Jams'});
    }
}

