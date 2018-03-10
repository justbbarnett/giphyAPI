
// question 1: I need help getting enter to work
// question 2: Set random return for API

$(document).ready(function(){
//set the original array, query and data

var animals = ["puppies", "dogs", "kittens", "cats", "pigs", "elephants"];

//create function to pull and display animal gifs
function displayAnimals () {

    

    //pull data from the button
    var animal = $(this).attr("data-name");
    console.log(animal)

    //create the queryURL for the API
    var apiKey = "&api_key=2Kg0Qjt1YynUKJQvECMo5cVQZxn2NRbb"
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=10&rating=pg" + apiKey
    console.log(queryURL);

    //call data and retrive "response" from the API
    // $.GET(queryURL).then(function (response) {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
    

        //pull the array of results
        var animalResults = response.data;
        console.log(animalResults);

        for (i=0 ; i< animalResults.length; i++) {

            //set the image tag and give it a src attr from results
            var animalDiv = $("<div>")
            animalDiv.addClass("animal-giphy")

            var imgStill = animalResults[i].images.fixed_height_small_still.url
            var imgAnimate = animalResults[i].images.fixed_height_small.url
            
            var animalImage = $("<img>");
            animalImage.attr("src", imgStill); //this is where the image will start
            animalImage.attr("data-state", "still"); //setting "still state" as data for toggle
            animalImage.attr("data-still", imgStill)
            animalImage.attr("data-animated", imgAnimate)
            animalImage.addClass("gif")


            var rating = animalResults[i].rating
            var pRating = $("<p>").text("Rating: " + rating)

            animalDiv.append(animalImage).append(pRating)

            $("#giphy-dump").prepend(animalDiv);
        }


    });
};

function toggleGifs () { //toggle gifs tis set to iccur when the "animal-giphy" div is clicked

    console.log ( $(this).data() );
    console.log ( $(this).attr("data-state") + "   - attr - 'data-state'"); //should be "Still" for the onload, never changes
    console.log ( $(this).data("state")  + "   - data - 'state'"); //data state that changes

    var currentState = $(this).data("state");
    console.log (currentState)

    if ("still" === currentState) {
        $(this).data("state", "animated");
        $(this).attr("src", $(this).data("animated"));
    }
    else {
        $(this).data("state", "still");
        $(this).attr("src", $(this).data("still"));
    } 
};


function animalButtons () {

    $("#animal-buttons").empty();

    for (var i = 0; i < animals.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie-btn to our button
        a.addClass("btn btn-primary animal-btn");
        // Adding a data-attribute
        a.attr("data-name", animals[i]);
        // Providing the initial button text
        a.text(animals[i]);
        // Adding the button to the buttons-view div
        $("#animal-buttons").append(a);
    }
}

$("#animal-form").on("submit", function(event) {
    console.log(event);
    event.preventDefault();
    // This line grabs the input from the textbox
    var animal = $("#animal-input").val().trim();
   

    // logging the variable above
    console.log(animal);

    // Adding animal from the textbox to array
    animals.push(animal);

    // Calling renderButtons which handles the processing of our movie array
    animalButtons();
    $("#animal-input").val(" ");
    
});

$(document).on("click", ".animal-btn", displayAnimals);
$(document).on("click", ".gif", toggleGifs);

animalButtons ();
})
