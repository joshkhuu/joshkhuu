$(function() {
  var Mustache = require('mustache');
 
  $.getJSON('js/data.json', function(data) {
    var template = $('#experiencetpl').html();
    var html = Mustache.to_html(template, data);
    $('#experience').html(html);
  }); //getJSON
  
}); //function