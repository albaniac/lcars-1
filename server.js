var PORT          = 4747,
    express       = require('express'),
    path          = require('path'),
    autoprefixer  = require('autoprefixer-stylus')
    jade          = require('jade'),
    morgan        = require('morgan'),
    stylus        = require('stylus')

var app = express()

app.set('port', process.env.PORT || PORT)
app.set('views', __dirname + '/src/views')
app.set('view engine', 'jade')
app.engine('jade', require('jade').__express);
app.use(morgan('dev'))

app.use(
  stylus.middleware({
    src: __dirname + '/src',
    dest: __dirname + '/public',
    compile: styles
  }))

app.use(express.static(__dirname + '/public'))

app.listen(app.get('port'), function () {
    console.log('Starfleet Library Computer Access and Retrieval System activated at port ' + app.get('port'))
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
  console.log('Compiling stylus')
  return stylus(str)
    .use(autoprefixer('last 2 versions'))
    .set('compress', true)
    .set('paths', [__dirname + '/src/stylesheets/'])
    .set('include css', true)
}
