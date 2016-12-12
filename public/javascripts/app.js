/* Created by Nigel Finley */
// This file manages the information getting to the browser for the comments

'use strict';

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
            body: $("#comment").val()

        }

    }).done(function(data) {
        // Log the response
        console.log("This is the done data: " + data);
        //TODO append a trash can button to the page with an ajax delete reference route
        $("#commentBox").append('<p class="footerHeader">'+data+'   '+ '<button type="submit" class="btn btn-danger trashButton" id="trashDelete">X</button> </p>');
        // Empty the notes section
        $("#comment").val("");
    });


});
