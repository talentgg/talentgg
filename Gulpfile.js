var config = require('./server/config/config');
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var bs = require('browser-sync');
var browserify = require("browserify"); // require modules within the browser
var reactify = require("reactify"); // converts JSX to JS
var source = require("vinyl-source-stream"); // github.com/hughsk/vinyl-source-stream
var reload = bs.reload;


gulp.task('start', function () {
  nodemon({
    script: 'server/server.js',
    ext: 'js html ejs jsx',
    env: { 'NODE_ENV': 'development' }
  })
});

/* Bundles required modules */
gulp.task('browserify', function() {
  browserify('./client/js/main.js')
    .transform('reactify')
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('copy',function() {
  gulp.src('client/index.html')
    .pipe(gulp.dest('dist'));
  gulp.src('client/assets/**/*.*')
    .pipe(gulp.dest('dist/assets'));
});


gulp.task('default',['start','browserify', 'copy'], function() {
  return gulp.watch('client/**/*.*', ['browserify', 'copy']); // this only watches client changes
});

