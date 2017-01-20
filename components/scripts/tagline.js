var $, fill, jQuery;

$ = jQuery = require('jquery');

(fill = function(item, myname) {
  $('.tagline').append("" + item);
  return $('.myname').append("" + myname);
})('UX Design & Front End Developer', 'Josh Khuu');

fill;
