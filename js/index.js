$('.art').hover(function(){
  height = $(this).outerHeight();
  $('.hovereff').stop().animate({"margin-top": $(this).offset().top-67, "height": height}, "fast");

}, function() {
});

$('.art').mousedown(function(){
  $('.hovereff').animate({"width": "10px"}, 60);
});

$('.art').mouseup(function(){
  $('.hovereff').animate({"width": "4px"}, 60);
});