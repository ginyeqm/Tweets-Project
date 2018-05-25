$(document).ready(function(){
  $(".new-tweet textarea").on("keyup", function(){
    var length = $(this).val().length;
    $(".counter").text(140 - length);

    if(length > 140 ){
      $(".counter").css("color", "red");
      }else{
      $(".counter").css("color", "#244751");
      }
  });
});

