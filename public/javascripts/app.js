/* Created by Nigel Finley */
// This file manages the information getting to the browser

'use strict';

// Grab the news articles as JSON
// $.getJSON("/articles", function (data) {
//     // loop over the articles
//     for(let i=0; i<data.length; i++){
//         //    display the information on the page
//         $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//     }
// });


// Whenever someone clicks a p tag
// $(document).on("click", "p", function() {
//     // Empty the notes from the note section
//     $("#notes").empty();
//     // Save the id from the p tag
//     var thisId = $(this).attr("data-id");
//
//     // Now make an ajax call for the Article
//     $.ajax({
//         method: "GET",
//         url: "/articles/" + thisId
//     })
//     // With that done, add the note information to the page
//         .done(function(data) {
//             console.log(data);
//             // The title of the article
//             $("#notes").append("<h2>" + data.title + "</h2>");
//             // An input to enter a new title
//             $("#notes").append("<input id='titleinput' name='title' >");
//             // A textarea to add a new note body
//             $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
//             // A button to submit a new note, with the id of the article saved to it
//             $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
//
//             // If there's a note in the article
//             if (data.note) {
//                 // Place the title of the note in the title input
//                 $("#titleinput").val(data.note.title);
//                 // Place the body of the note in the body textarea
//                 $("#bodyinput").val(data.note.body);
//             }
//         });
// });

// Handles the click of the add comment button and will
$(document).on("click", "#sendComment", function() {
    // Grab the id associated with the article from the submit button
    let thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "PUT",
        url: "/news/" + thisId,
        data: {
            // Value taken from note textarea
            body: $("#commentBody").val()

        }
    })
    // With that done
        .done(function(data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#commentBody").val("");
        });
    //
    // // Also, remove the values entered in the input and textarea for note entry
    // $("#titleinput").val("");

});
