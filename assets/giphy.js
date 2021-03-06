//Array of topics
var addTopics = [];

 //Variables
 var btnTopic;     //the band associated with a particular button
 var btnIndex;     //the index associated with a particular button
 var gifButton;    //html for button tag and properties
 var band;         //value of the button clicked
 var userChoice;   //Html for form text box
 var submitMe;     //Html for form submit button
 var queryURL;     //the URL of the api search request
 var apiKey = "KdLPLmYR2xIjhRZwF8RtpB0O3abx1klt";
 var w = 0;        //counter for gif sets
 var giphyDiv;     //The divs that contain the gifs
 var bandDataList; //THe <ul> containing the gif data

 //Functions for the app are collected inside an object called allTheBandGifs

 var allTheBandGifs = {

topics: [
    "Oingo Boingo",
    "Elvis Presley",
    "Hozier",
    "Duran Duran",
    "Sex Pistols",
    "Tom Odell",
    "Tom Waits",
    "Elton John",
    "Freddie Mercury",
    "Siouxsie and the Banshees",
    "The Cure"
],

//Function to create buttons and attach array topics

makeAButton:  function() {
    for( var i = 0; i < allTheBandGifs.topics.length; i++) {
    btnTopic = allTheBandGifs.topics[i];
    gifButton = "<button class='jsMade' data-topic='" + btnTopic + "'>" + btnTopic;
    $("#bandButtons").append(gifButton);
    }
},

//Function to create a text form and submit button

userForm: function () {
  userChoice = "<input type='text'>";
  submitMe = "<button id='submitButton'>What's Your Jam?";
  $("#userForm").append(userChoice);
  $("#userForm").append(submitMe);

},


//Click the button to make a request from the GIPHY.com API
//$("button").on("click", function() {

 makeSomeDivs: function(click) {

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        addTopics + "&offset=" + w + "&api_key=" + apiKey + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
          })
          .then(function(response) {
            console.log(response.data);

            for (var i = 0; i < response.data.length; i++) {

              var results = response.data[i];
              var stillImage = results.images.fixed_height_still.url;
              var gifImage = results.images.fixed_height.url;

              var rating = results.rating;

              var gifTitle = results.title;
              var gifType = results.type;
              var gifUrl = results.url;

              giphyDiv = $("<div class='image-container gifIndex" + i + "'>");

                var ratingText = $("<p>").text("Rating: " + rating);

                var bandImage = $("<img>");
                bandImage.addClass("bandGif");
                bandImage.addClass("img-responisve");
                bandImage.attr("src", stillImage);
                bandImage.attr("data-gif", gifImage);
                bandImage.attr("data-image", stillImage);
                bandImage.attr("data-index", i);

    
                var bandUnorderedList = $("<ul class='dataList'>");
                var bandListTitle = $("<li>").text("Title: " + gifTitle);
                var bandListType = $("<li>").text("Type: " + gifType);
                var bandListUrl = $("<li>").text("Url: " + gifUrl);

                bandUnorderedList.append(bandListTitle, bandListType, bandListUrl);

                
                giphyDiv.append(ratingText);
                giphyDiv.append(bandImage);
                giphyDiv.append(bandUnorderedList);

                $("#gifs").prepend(giphyDiv);
              
            }

            w+=10;

          });

          
  },
      
        submitABand: function () {
          var submission = $("input[type='text']").val().trim();
          allTheBandGifs.topics.push(submission);
          var newButton = $("<button class='jsMade'>").text(submission).attr("data-topic", submission);
          $("#bandButtons").append(newButton);
          console.log(killersGifs.killerSearches);
        }
//});
}

allTheBandGifs.makeAButton();
allTheBandGifs.userForm();

//Click on the image to toggle back and forth between still and animated versions

$(document).on("click", ".bandGif", function(event) {

  var imageUrl = $(this).attr("data-image");
  var gifUrl = $(this).attr("data-gif");
  // Switch out current url for another using the attribute method
    if ($(this).attr("src") == imageUrl) {
      $(this).attr("src", gifUrl);
    }
    else if ($(this).attr("src") == gifUrl) {
      $(this).attr("src", imageUrl);
    };
  
  });

  //click on Band Buttons to add band to an empty array, run div calling function, and empty array

  $(document).on("click", "button.jsMade", function(event) {
    var currentBand = $(this).attr("data-topic");
    console.log(currentBand);
    addTopics.push(currentBand);
    event.preventDefault();
    //$("#gifs").empty();  
    allTheBandGifs.makeSomeDivs();
    addTopics = [];
  });

  //Click the submit button and add the new content to the array and make a new button

  $("#submitButton").on("click", function() {
    var submission = $("input[type='text']").val().trim();
    allTheBandGifs.topics.push(submission);

    var newButton = $("<button class='jsMade'>").text(submission).attr("data-topic", submission);
    $("#bandButtons").append(newButton);
  });

 

