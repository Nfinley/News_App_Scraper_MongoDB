/* Created by Nigel Finley */
// This file manages the information getting to the browser for the comments

'use strict';

//TODO this function is not working. The id and the comment are getting passed in but the post is not working
// Handles the click of the add comment button and will
$(document).on("click", "#sendComment", function() {
    // Grab the id associated with the article from the submit button
    let thisId = $(this).attr("data-id");
    // console.log(thisId + " " + $("#commentBody").val());

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "PUT",
        url: "/news/update/" + thisId,
        data: {
            // Value taken from note textarea
            body: $("#commentBody").val()

        }

    }).done(function(data) {
        // Log the response
        console.log("This is the done data: " + data);
        // Empty the notes section
        $("#commentBody").val("");
    });


});
