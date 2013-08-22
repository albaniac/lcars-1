var PORT     = 4747,
	express  = require('express'),
	path     = require('path'),
	sass     = require('node-sass')

var	app = express()

app.configure(function () {
	app.set('port', process.env.PORT || PORT)
	app.use(express.static(path.join(__dirname, 'public')))
/*	app.use(
		sass.middleware({
			src: __dirname + '/src',
			dest: __dirname + '/public',
			debug: true,
			outputStyle: 'compressed'
		})
	)*/
})

app.listen(app.get('port'), function () {
	console.log('Listening on port ' + app.get('port'))
})