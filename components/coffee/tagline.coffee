$ = jQuery = require('jquery')

do fill = (item = 'Front End Developer', myname = 'Josh Khuu') ->
	$('.tagline').append "#{item}"
	$('.myname').append "#{myname}"
fill