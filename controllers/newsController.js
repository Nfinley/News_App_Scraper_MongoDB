'use strict';

const News = require('../models/News'),
    cheerio = require("cheerio"),
    request = require("request"),
    Note = require("../models/Note.js");



//function to grab comments as attached to each article

function getComments(id){

    News.findOne({"_id": id})

    // then populate all of the notes associated with it
        .populate("note")
        // now, execute our query
        .exec(function (error, doc) {
            // Log any errors
            if (error) {
                console.log(error);
            }
            // Otherwise, send the doc to the browser as a json object
            else {
                // res.json(doc);
                console.log("In the comments function: " , doc);
                //doc.note.body returns just the comment
                return doc;
            }
        });
    // return [id];

}

module.exports = {
    scrapeNews: (req, res) => {
        console.log("getting your news!");


        request("http://www.digitalmusicnews.com/", function (error, response, html) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            let $ = cheerio.load(html);
            // Now, we grab every h2 within an article tag, and do the following:
            $("article h2").each(function (i, element) {

                // Save object with the scraped page data
                let result = {};


                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(this).children("a").text();
                result.link = $(this).children("a").attr("href");
                result.brief = $(this).nextAll('.cb-excerpt').text();
                //GET THIS ONE WORKING
                // result.image = $(this).parent().attr('class', 'cb-mask').children("img").attr("src");

                // Using our Article model, create a new entry
                // This effectively passes the result object to the entry (and the title and link)
                let entry = new News(result);

                // Now, save that entry to the db
                entry.save(function (err, doc) {
                    // Log any errors
                    if (err) {
                        console.log(err);
                    }
                    // Or log the doc
                    else {
                        // console.log(doc);
                    //    Add a res.redirect to the getNews route
                    }
                });

            });
            res.redirect('/news/getNews');
        });
    },

//     News.update({"title": dataObj.title.trim()}, {$setOnInsert: dataObj}, {upsert: true}, function (err, results) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(results);
//     }
// })



//    get News Function which will look in the database for all the content (update show articles based on session variables instead of database
    getNews: (req, res) => {
            News.find({}).exec(function (error, doc) {
                // console.log("The data: ", doc);
                // Log any errors
                if (error) {
                    console.log(error);
                }
                // Or send the doc to the browser as a json object
                else {

                    //saves the content as a session variable and as an array
                    req.session.newsArray = doc;

                    //need to send a response
                    // res.json(req.session.newsArray);
                    res.redirect('/news/renderNews')
                }
            });
    },

    //put the first article on the page by default
    renderNews: (req, res) => {

        // (req.params.index);
        let hbsObject = {news: req.session.newsArray[0], index: 0, body: getComments(req.session.newsArray[0]._id)};
        console.log("This is the initial load: " + JSON.stringify(hbsObject));
        res.render('index', hbsObject);

    },


    //this is the route for the next arrow to display the second article (the right arrow)
    nextArticle: (req, res) => {
        let articleIndex = parseInt(req.params.index);
        //set to zero as a quick error handling incase user types in something in the url
        let newIndex=0;
        let idValue;

        // hanlding for the last article in the array and cycles back to the first article
        if(articleIndex === req.session.newsArray.length -1) {
            newIndex = 0;
            idValue = req.session.newsArray[newIndex]._id;

        } else {
            newIndex = articleIndex +1;
            idValue = req.session.newsArray[newIndex]._id;
            // console.log("Should be next ID: " + idValue);

        }
        //get the new session id number from the index value

        //renders the articles and comments to the page
        let hbsObject = {news: req.session.newsArray[newIndex], index: newIndex, body: getComments(idValue)};
        res.render('index', hbsObject);


    },

    //this will handle the click for the previous (the left arrow)
    previousArticle: (req, res) => {
        let articleIndex = parseInt(req.params.index);
        //set to zero as a quick error handling in case user types in something unexpected in the url
        let newIndex=0;
        let idValue;


        //handling for the first article is the user clicks the right arrow it displays the last article in the array
        if(articleIndex === 0) {
            newIndex = req.session.newsArray.length  -1;
            idValue = req.session.newsArray[newIndex]._id;

        } else {
            newIndex = articleIndex -1
            idValue = req.session.newsArray[newIndex]._id;

        }
        //renders the articles and comments to the page
        let hbsObject = {news: req.session.newsArray[newIndex], index: newIndex, body: getComments(idValue)};
        res.render('index', hbsObject);


    },


//function that creates new note and update existing note
    updateNote: (req, res) => {
        console.log("This is content of data: ", req.body, req.params.id);
        // Create a note and pass the req.body to the entry

        let newNote = new Note(req.body);
        console.log("HI", newNote);
        // And save the new note the db
        newNote.save(function (error, doc) {
            console.log("This is the DOCC: " , doc);
            // Log any errors
            if (error) {
                console.log(error);
            }
            // If no errors
            else {
                // Use the article id to find and update the attached note if any
                News.findOneAndUpdate({"_id": req.params.id}, {"note": doc._id})
                // Execute the above query
                    .exec(function (err, doc) {
                        // Log any errors
                        if (err) {
                            console.log(err);
                        }
                        else {
                            // Or send the document to the browser
                            res.send(req.body.body);

                        }
                    });
            }
        });
    },

//    TODO create a delete route
    deleteNote: (req, res) => {
        News.update({"_id": req.params.id}, {$unset: {note: "$oid"}}, function (error, response) {
            if (error) {
                console.log(error);
            } else {
                res.send(response);
                console.log(response);
            }
        })


    }

};

