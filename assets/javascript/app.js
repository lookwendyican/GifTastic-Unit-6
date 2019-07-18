
// JavaScript function that wraps everything (TAKE FROM # 14 DYNAMIC ELELEMNTS SOULTIONS)
$(document).ready(function () {

    var marineAnimalsArr = ["walrus", "orca", "sea lion", "octopus", "starfish", "manatee", "anemone", "humpback whale", "sea turtle", "jelly fish", "manta ray", "spinner dolphins"];

    console.log(marineAnimalsArr);
    // Add click event listen listener to all buttons



    // Grab and store the marineLife property value from the button
    function getMarineLife() {


        var marineLife = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + marineLife + "&api_key=H7AMXuqlVS2NrgKHKo7Mzsdf3kZeFA8x&limit=10";



        // Perform an AJAX request with the queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(queryURL);

                // console.log(response);
                // console.log(response.data[i].images.fixed_height.url);
                // console.log(response.data[i].rating);
                // console.log(response.data[i].images.fixed_height_still.url);

                // storing the data from the AJAX request in the results variable
                var results = response.data;
                console.log(results);

                // Looping through each result item
                for (var i = 0; i < results.length; i++) {

                    // Creating and storing a div tag
                    var marineAnimalDiv = $("<div>");

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + results[i].rating);

                    // Creating and storing an image tag
                    var marineAnimalImage = $("<img>");
                    // Setting the src attribute of the image to a property pulled off the result item
                    marineAnimalImage.attr("src", results[i].images.fixed_height.url);
                    marineAnimalImage.attr("data-still", results[i].images.fixed_height_still.url);
                    marineAnimalImage.attr("data-animate", results[i].images.fixed_height.url);
                    marineAnimalImage.attr("data-state", "animate");
                    marineAnimalImage.addClass("makelive");

                    // Appending the paragraph and image tag to the marineAnimalDiv
                    marineAnimalDiv.append(p);
                    marineAnimalDiv.append(marineAnimalImage);

                    // Prependng the marineAnimalDiv to the HTML page in the "#gifs-appear-here" div
                    $("#marineLife-view").prepend(marineAnimalDiv);
                }

            })  //End of AJAX/then function 
    } //End of getMarinLife function

    // Function for displaying Marine Animals data
    function renderButtons() {

        // Deleting the Marine Animals prior to adding new animals
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of marine animals
        for (var i = 0; i < marineAnimalsArr.length; i++) {

            // Then dynamicaly generate buttons for each marine animal in the array
            var a = $("<button>");
            // Adding a class of marineAnimal-btn to our button
            a.addClass("marineAnimal-btn button4");
            // Adding a data-attribute
            a.attr("data-name", marineAnimalsArr[i]);
            // Providing the initial button text
            a.text(marineAnimalsArr[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }

    // This function handles events where a marine animal button is clicked
    $("#add-marineLife").on("click", function (event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var marineLife = $("#marineLife-input").val().trim();

        // Adding marineLife from the textbox to our array
        marineAnimalsArr.push(marineLife);

        // Calling renderButtons which handles the processing of our marineLife array
        renderButtons();
    });

    $(document).on("click", 'img', function () {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        console.log(state)
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    // Adding a click event listener to all elements with a class of "marineLife-btn"
    $(document).on("click", ".marineAnimal-btn", getMarineLife);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();



});  //End of Doc ready   


