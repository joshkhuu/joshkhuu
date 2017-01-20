$ = jQuery = require('jquery')

do fill = (item = 'UX Design & Front End Developer', myname = 'Josh Khuu') ->
	$('.tagline').append "#{item}"
	$('.myname').append "#{myname}"
fill