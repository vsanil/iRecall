var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var notify = require('gulp-notify');

var paths = {
  build   : './build/',
  sass: [
    //'./scss/*.scss',
    './www/css/*.scss'
    ],
  
  scripts: [
    './www/js/**/*.js',
    './www/js/app.js'
  ],
  
  html: [
  // './www/app/views/partials/*.html',
  // './www/app/views/partials/**/*.html',
  './www/index.html',
  './www/templates/*.html'
  ],
 
  server: {
    js: ['./lib/**/*.js'],
    specs: ['./server.js']
  }
};

// A display error function, to format and make custom errors more uniform
// Could be combined with gulp-util or npm colors for nicer output
var displayError = function(error) {

    // Initial building up of the error
    var errorString = '[' + error.plugin + ']';
    errorString += ' ' + error.message.replace("\n",''); // Removes new line at the end

    // If the error contains the filename or line number add it to the string
    if(error.fileName)
        errorString += ' in ' + error.fileName;

    if(error.lineNumber)
        errorString += ' on line ' + error.lineNumber;

    // This will output an error like the following:
    // [gulp-sass] error message in file_name on line 1
    console.error(errorString);
}

gulp.task('sass', function(done) {
  gulp.src(paths.sass)
    .pipe(sass({ style: 'expanded' }))
    .pipe(gulp.dest(paths.build))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(gulp.dest(paths.build))
    .on("error", notify.onError(function (error) {
        return "Message to the notifier: " + error.message;
      }));
});

gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(gulp.dest(paths.build))
        .on("error", notify.onError(function (error) {
        return "Message to the notifier: " + error.message;
      }));
});

gulp.task('html', function() {
    return gulp.src(paths.html)
        .pipe(gulp.dest(paths.build))
        .on("error", notify.onError(function (error) {
        return "Message to the notifier: " + error.message;
      }));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.scripts, ['lint', 'scripts']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('lint', function () {
  gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .on("error", notify.onError(function (error) {
        return "Message to the notifier: " + error.message;
      }));
});

gulp.task('server', function () {
  nodemon({ nodeArgs: ['--debug'], script: paths.server.specs,
            ext: 'js html', 
            env: { 'NODE_ENV': 'development' } , 
            ignore: ['./build/**'],
             })
});

gulp.task('default', ['lint', 'sass', 'html', 'scripts', 'watch']);