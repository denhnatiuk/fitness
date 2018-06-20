"use strict";
// sliders
$(document).ready(function(){
  // touch events
  $(".carousel").swipe({
    swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
      if (direction == 'left') $(this).carousel('next');
      if (direction == 'right') $(this).carousel('prev');
    },
    allowPageScroll:"vertical"
  });
  // trainers carousel
  $('#trainersCarousel .item').each(function(){
    var next = $(this).next();
    if (!next.length) {
      next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));

    if (next.next().length>0) {
      next.next().children(':first-child').clone().appendTo($(this));
    }
    else {
      $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
    }
  });
  $("#trainersCarousel").carousel({
    interval:10000
  });
  // reviews carousel
  $('#reviewslider .item').each(function(){
    var next = $(this).next();
    if (!next.length) {
      next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));
  });
  $("#reviewslider").carousel({
    interval:10000
  });
});
// ==============================================================================
// sliding nav underline
let menu = document.getElementsByClassName( 'nav' );
if ( menu ) {
  let menu_slider_hover = document.getElementById( 'nav_slide_hover' );
  if ( menu_slider_hover ) {
    nav_slider( menu[0], function( el, width, tempMarginLeft ) {
      el.onmouseover = () => {
        menu_slider_hover.style.width =  width + '%';
        menu_slider_hover.style.marginLeft = tempMarginLeft + '%';
      }
    });
  }
  let menu_slider_click = document.getElementById( 'nav_slide_click' );
  if ( menu_slider_click ) {
    nav_slider( menu[1], function( el, width, tempMarginLeft ) {
      el.onclick = () => {
        menu_slider_click.style.width =  width + '%';
        menu_slider_click.style.marginLeft = tempMarginLeft + '%';
      }
    });
  }
}
function nav_slider( menu, callback ) {
  let menu_width = menu.offsetWidth;
  // We only want the <li> </li> tags
  menu = menu.getElementsByTagName( 'li' );
  if ( menu.length > 0 ) {
    var marginLeft = [];
    // Loop through nav children i.e li
    [].forEach.call( menu, ( el, index ) => {
      // Dynamic width/margin calculation for hr
      var width = getPercentage( el.offsetWidth, menu_width );
      var tempMarginLeft = 0;
      // We don't want to modify first elements positioning
      if ( index != 0 )  {
        tempMarginLeft = getArraySum( marginLeft );
      }
      // Set mouse event  hover/click
      callback( el, width, tempMarginLeft );
      /* We store it in array because the later accumulated value is used for positioning */
      marginLeft.push( width );
    } );
  }
}
function getPercentage( min, max ) {
  return min / max * 100;
}
// Not using reduce, because IE8 doesn't supprt it
function getArraySum( arr ) {
  let sum = 0;
  [].forEach.call( arr, ( el, index ) => {
    sum += el;
  });
  return sum;
}
// ===============================================================================
// trainers stats script
if (document.querySelectorAll('.stat-value')){
  var stats = document.querySelectorAll('.stat-value');
  for (var stat of stats){
    let val = stat.dataset.size;
    let span = document.createElement('div');
    span.classList += 'stat-length';
    span.style.width = val*2+'px';
    stat.appendChild(span);
    stat.innerHTML += val+"%";
  }
}
// ===============================================================================
function initMap() {
  var uluru = {lat: 55.74811, lng: 37.7644236};
  var mapCenter = {lat: 55.74811, lng: 37.7664236};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: mapCenter
  });
  var marker = './images/marker.png';
  var marker = new google.maps.Marker({
      position: uluru,
      icon: marker,
      map: map
  });
  var customStyled = [{
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [{"visibility": "off"}]
    },{
    "featureType": "poi.business",
    "stylers": [{"visibility": "off"}]
    },{
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [{"visibility": "off"}]
    },{
    "featureType": "transit",
    "stylers": [{"visibility": "off"}]
  }];
  map.set('styles',customStyled);
}
