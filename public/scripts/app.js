/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function(){
  $(".button").on("click", function(){
    $(".new-tweet").slideToggle();
  });

  function renderTweets(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    tweets.forEach(function(item){
      var $tweet = createTweetElement(item);
      $('.tweets').prepend($tweet);
    });
  }

  var loadTweets = function(){
    $.ajax({url:"/tweets", method:'GET'}).done(function(data){
      renderTweets(data)
    });
  }

  var createTweetElement = function(tweetData){
    var article = $("<article></article>").addClass("border");

    //Div1 creation
    var ComposeTweet = $("<div>").addClass("firstDiv");
    var picture = $("<img>").addClass("firstPicture").attr("src", tweetData.user.avatars.small);
    var title = $("<h1></h1>").addClass("firstTitle").text(tweetData.user.name);
    var userAt = $("<h3></h3>").addClass("right").text(tweetData.user.handle);
    var PTU = ComposeTweet.append(picture, title, userAt);
    //add the image, h1 and h3 elements in the div 1
    //append the elements here.
    //Div2 Creation
    var textArea = $("<div></div>").addClass("firstTextArea").text(tweetData.content.text)

    var icon = $('<img src="/images/iconlike.png">').addClass("icon")
    var icon2 = $('<img src="/images/retweet.png">').addClass("icon")
    var icon3 = $('<img src="/images/icon.png">').addClass("icon")

    var footer = $("<footer></footer>").addClass("bottomText").text(tweetData.created_at)

    var iconFooter = footer.append(icon , icon2, icon3);
    var complteArticle = article.append(PTU, textArea , iconFooter);
      return complteArticle;
  };


    // Test / driver code (temporary)
   // to see what it looks like
     // to add it to the page so we can make sure it's got all the right elements, classes, etc.


  $("form").on("submit", function(event){
    event.preventDefault();
    var data = ($(this).serialize());
    var length = $(".counter").text();
      if(Number(length) < 0){
        alert("error content is too long")
      }else if(Number(length) === 140){
        alert("error content is not present")
      }else{
        $.ajax({url: "/tweets", method: 'POST', data}).done(function(){
          //get request
          $.ajax({url: "/tweets" , method: "GET"}).done(function(data){
            var $tweet = createTweetElement(data[data.length - 1])
            $('.tweets').prepend($tweet);
            $(".counter").append();
            $('textarea[name="text"]').val('')
            $(".counter").text("140")

          });
        });
      }
  });
  loadTweets();
});

