/* Created by Nigel Finley */
// This file manages the information getting to the browser for the comments

'use strict';

// Handles the click of the add comment button and will
$(document).on("click", "#sendComment", function() {
    // Grab the id associated with the article from the submit button
    let thisId = $(this).attr("data-id");
    // console.log(thisId + " " + $("#commentBody").val());
    let randomID = Math.floor(Math.random() * 10000);
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
        $("#commentBox").append('<p class="footerHeader" >'+data+'   '+ '<button type="submit" data-id="' + thisId + '" class="btn btn-danger trashButton" name="' + randomID + '" id="trashDelete" >X</button> </p>');
        // Empty the notes section
        $("#comment").val("");
    });


});

//TODO FIX the delete route

$(document).on("click", "#trashDelete", function () {
    // Grab the id associated with the article from the delete button
    let thisId = $(this).attr("data-id");
    let deletenote = $(this).attr("name");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "DELETE",
        url: "/news/delete/" + thisId,
    })
    // With that done
        .done(function (data) {

            // Log the response
            console.log(data);
            //deletes all comments. Need to figure out how to only delete one using the randomID
            $(".footerHeader").empty("");
        });

    // Also, remove the values entered in the input and textarea for note entry


});
