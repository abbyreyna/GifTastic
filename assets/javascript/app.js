$(document).ready(function() {});

var topics = ["Sailor Moon", "Blue Exorcist", "DanMachi", "Flcl"];

function createButtons() {
  $("#display-buttons").empty();
  for (var i = 0; i < topics.length; i++) {
    var a = $("<button class = 'btn btn-info'>");
    a.addClass("giphy");
    a.attr("data-name", topics[i]);
    a.text(topics[i]);
    $("#display-buttons").append(a);
  }
  displayGiphy();
}

function displayGiphy() {
  $("button").on("click", function() {
    var giphy = $(this).attr("data-name");
    if (giphy === "") {
      alert("Add an anime, chief!");
    } else {
      var queryURL =
        "https://api.giphy.com/v1/gifs/search?q=" +
        giphy +
        "&api_key=T7l1lvkZ05S7c1jd2Lf5Tf0VJeSTzJK4&limit=9&rating=pg";
      console.log("giphy" + giphy);

      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
        console.log(response);

        var topicResults = response.data;
        $("#display-gifs").empty(displayTopic);
        for (var i = 0; i < topicResults.length; i++) {
          console.log("this is the topic array results: " + topicResults);
          var displayTopic = $("<div class='btn btn-info'>");
          var rating = topicResults[i].rating;
          var p = $("<div>").text("Rating: " + rating + "  " + giphy);
          var giphyImage = $("<img>");
          giphyImage.attr("src", topicResults[i].images.fixed_height_still.url);
          giphyImage.attr("data-state", "still");
          giphyImage.attr(
            "data-still",
            topicResults[i].images.fixed_height_still.url
          );
          giphyImage.attr(
            "data-animate",
            topicResults[i].images.fixed_height.url
          );
          giphyImage.addClass("gif");

          $(".gif").on("click", function() {
            var state = $(this).attr("data-state");
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          });

          displayTopic.append(p);
          displayTopic.append(giphyImage);
          $("#display-gifs").append(displayTopic);
        }
      });
    }
  });
}
$("#add-anime").on("click", function(event) {
  event.preventDefault();

  var giphy = $("#anime-input")
    .val()
    .trim();

  if (giphy === "") {
    alert("Add an anime, chief!");
    $("#anime-input").focus();
  } else {
    topics.push(giphy);
    console.log(topics);

    createButtons();
    $("#anime-input").val("");
  }
});
createButtons();
