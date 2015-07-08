var config = require('./server/config/config');
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var bs = require('browser-sync');
var reload = bs.reload;

gulp.task('start', function () {
  nodemon({
    script: 'server/server.js'
  , ext: 'js html ejs jsx'
  , env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('default', ['start']);

