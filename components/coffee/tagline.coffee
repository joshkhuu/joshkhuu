$ = require('jquery')

do fill = (item = 'UX Designer & Front End Developer') ->
	$('.tagline').append "#{item}"
fill