'use strict';

const News = require('../models/News'),
    cheerio = require("cheerio"),
    request = require("request");


module.exports = {
    insertNews: (req, res) => {
        console.log("getting your news!");


        request("http://www.digitalmusicnews.com/", function (error, response, html) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            let $ = cheerio.load(html);
            // Now, we grab every h2 within an article tag, and do the following:
            $("article h2").each(function (i, element) {

                // Save object with the scraped page data
                let result = {};

                // result.title = $(this).children("h2").children("a").text();
                // result.link = $(this).children("h2").children("a").attr("href");
                // result.brief = $(this).find('.cb-excerpt').text();
                // result.image =$(this).find('.cb-mask').children("img").attr("src");

                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(this).children("a").text();
                result.link = $(this).children("a").attr("href");
                result.brief = $(this).parent().attr('class', 'cb-excerpt').text();
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
                        console.log(doc);
                    }
                });

            });
            res.send("Scrape Complete");
        });
    },

//     News.update({"title": dataObj.title.trim()}, {$setOnInsert: dataObj}, {upsert: true}, function (err, results) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(results);
//     }
// })



//    get News Function which will look in the database for all the content
    getNews: (req, res) => {
            News.find({}).limit(5).exec(function (error, doc) {
                console.log("The data: ", doc);
                // Log any errors
                if (error) {
                    console.log(error);
                }
                // Or send the doc to the browser as a json object
                else {
                    let hbsObject = {news: doc};
                    res.render('index', hbsObject);
                    // res.json(doc);
                    console.log(doc);
                }
            });
    },


//create function for 'populateNote' which look for article by ID and populates the notes (.populate("note")
    populateNote: (req, res) => {
        // Using the id passed in the id parameter, executes a query that finds news article by id
        News.findOne({"_id": req.params.id})
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
                    res.json(doc);
                }
            });

    },

//create function to create new note and update existing note
    updateNote: (req, res) => {
        // Create a note and pass the req.body to the entry
        let newNote = new Note(req.body);

        // And save the new note the db
        newNote.save(function (error, doc) {
            // Log any errors
            if (error) {
                console.log(error);
            }
            // If no errors
            else {
                // Use the article id to find and update the attached note if any
                Article.findOneAndUpdate({"_id": req.params.id}, {"note": doc._id})
                // Execute the above query
                    .exec(function (err, doc) {
                        // Log any errors
                        if (err) {
                            console.log(err);
                        }
                        else {
                            // Or send the document to the browser
                            res.send(doc);
                        }
                    });
            }
        });
    }

};
