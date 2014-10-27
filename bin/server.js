var PORT          = 4747,
    express       = require('express'),
    fs            = require('fs'),
    env           = require('node-env-file'),
    autoprefixer  = require('autoprefixer-stylus'),
    colors        = require('colors'),
    jade          = require('jade'),
    morgan        = require('morgan'),
    stylus        = require('stylus'),
    winston       = require('winston')

var envFile = process.cwd() + '/.env'
if (fs.existsSync(envFile)) {
  env(envFile)
}

var app = express()

app.set('port', process.env.PORT || PORT)
//app.set('views', process.cwd() + '/src/views')
//app.set('view engine', 'jade')

app.use(morgan('dev'))

app.use(
  stylus.middleware({
    src: process.cwd() + '/src',
    dest: process.cwd() + '/public',
    compile: styles
  }))

app.use(express.static(process.cwd() + '/public'))

app.get('/', function (req, res) {
  res.render(process.cwd() + '/src/views/transmission.jade')
})
app.get('/screen', function (req, res) {
  console.log(req.params)
  res.render(process.cwd() + '/src/views/screen.jade')
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
    .use(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .set('compress', true)
    .set('paths', [process.cwd() + '/src/stylesheets/'])
    .set('include css', true)
}
