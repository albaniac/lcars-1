var PORT          = 4747,
    express       = require('express'),
    path          = require('path'),
    autoprefixer  = require('autoprefixer-stylus')
    colors        = require('colors'),
    jade          = require('jade'),
    morgan        = require('morgan'),
    stylus        = require('stylus'),
    winston       = require('winston')

var app = express()

app.set('port', process.env.PORT || PORT)
//app.set('views', __dirname + '/src/views')
//app.set('view engine', 'jade')

app.use(morgan('dev'))

app.use(
  stylus.middleware({
    src: __dirname + '/src',
    dest: __dirname + '/public',
    compile: styles
  }))

app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  res.render(__dirname + '/src/views/transmission.jade')
})
app.get('/screen', function (req, res) {
  console.log(req.params)
  res.render(__dirname + '/src/views/screen.jade')
})

app.listen(app.get('port'), function () {
  var port = app.get('port')
  winston.log('info', 'Starfleet'.cyan.underline.bold + ' ' + 'Library Computer Access and Retrieval System'.magenta.underline + ' ' + '(LCARS)'.green.bold + ' activated at port '.red + colors.yellow(port).bold)
})

/*
  Function for additional tasks to perform
  while compiling stylus files. It will
  autoprefix the output and then include
  static vendor CSS files. The path must
  be set for Node.js (not Stylus) to know
  where to look for the imported stylesheets.
*/
function styles (str, path) {
  winston.info('Compiling stylus')
  return stylus(str)
    .use(autoprefixer('last 2 versions'))
    .set('compress', true)
    .set('paths', [__dirname + '/src/stylesheets/'])
    .set('include css', true)
}
