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

var paths = {
  sass: [
    './scss/*.scss',
    './www/app/styles/*.scss'
    ],
  
  scripts: [
    './www/app/scripts/**/*.js',
    './www/app/scripts/app.js'
  ],
  
  html: [
  './www/app/views/partials/*.html',
  './www/app/views/partials/**/*.html',
  '/www/index.html',
  '/www/templates/*.html'
  ],
 
  server: {
    js: ['./lib/**/*.js'],
    specs: ['./server.js']
  }
};

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
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