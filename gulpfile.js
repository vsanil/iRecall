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
  sass: [
    './scss/*.scss',
    './www/app/styles/main.scss'
    ],
  
  scripts: [
    './www/app/scripts/**/*.js',
    './www/app/scripts/app.js'
  ],
  
  html: [
  './www/app/views/partials/*.html',
  './www/app/views/partials/**/*.html',
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
    .on('error', function(err){
        displayError(err);
    })
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    // .pipe(rename('main.css'))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

// gulp.task('sass', function(done) {
//   gulp.src('./scss/ionic.app.scss')
//     .pipe(sass())
//     .pipe(gulp.dest('./www/css/'))
//     .pipe(minifyCss({
//       keepSpecialComments: 0
//     }))
//     .pipe(rename({ extname: '.min.css' }))
//     .pipe(gulp.dest('./www/css/'))
//     .on('end', done);
// });

gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
});

gulp.task('html', function() {
    return gulp.src(paths.html)
        .pipe(gulp.dest(''))
        .pipe(notify({ message: 'HTML task complete' }));
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
});

gulp.task('server', function () {
  nodemon({ script: 'server.js'})
});

gulp.task('default', ['server', 'sass', 'scripts', 'lint', 'watch']); 