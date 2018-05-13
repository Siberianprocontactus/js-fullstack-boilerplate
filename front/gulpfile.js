const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const addsrc = require('gulp-add-src');
const gulpif = require('gulp-if');
const stylus = require('gulp-stylus');
const bootstrap = require('bootstrap-styl');
const cssnano = require('gulp-cssnano');
const browserify = require('browserify');
const babelify = require("babelify");
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync');
require('shelljs/global');

const config = require('../src/config.js');

// JS
gulp.task('js', function() {
  return browserify('./src/js/app.js', { debug: true })
    .transform(babelify, {
      presets: ['es2015', 'react', 'stage-0'],
      sourceMaps: true,
    })
    .bundle()
    .on('error', function(err) {
      console.error(err);
      this.emit('end');
    })
    .pipe(source('bundle.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(gulpif(env['NODE_ENV'] === 'production', uglify()))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/js'))
});


// CSS
gulp.task('css', function () {
  return gulp.src('./src/css/index.styl')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(stylus({use: bootstrap()}))
    .pipe(addsrc('./src/css/**/*.css'))
    .pipe(gulpif(env['NODE_ENV'] === 'production', cssnano()))
    // .pipe(addsrc(['...min.css']))
    .pipe(concat('bundle.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css'))
});


// HTML
gulp.task('html', function() {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest('./public'))
});

// Images
gulp.task('images', function() {
  return gulp.src('./src/images/**/*')
    .pipe(gulp.dest('./public/images'))
});

// Fonts
gulp.task('fonts', function() {
  return gulp.src('./src/fonts/*.{eot,svg,ttf,woff,woff2}')
    .pipe(addsrc('./node_modules/bootstrap-styl/fonts/*.{eot,svg,ttf,woff,woff2}'))
    .pipe(gulp.dest('./public/fonts'))
});

// Robots.txt and favicon.ico
gulp.task('extras', function() {
  return gulp.src([
    './src/robots.txt',
    './src/images/favicon.ico',
    './src/images/apple-touch-icon*.png',
  ])
    .pipe(gulp.dest('./public'))
});


gulp.task('reload:js', ['js'], browserSync.reload);
gulp.task('reload:css', ['css'], browserSync.reload);
gulp.task('reload:html', ['html'], browserSync.reload);
gulp.task('reload:images', ['images'], browserSync.reload);
gulp.task('reload:fonts', ['fonts'], browserSync.reload);
gulp.task('reload:extras', ['extras'], browserSync.reload);
gulp.task('watch', ['build'], function () {
  browserSync({
    notify: true,
    logPrefix: 'BS',
    proxy: `localhost:${config.app.port}`
  });

  gulp.watch('./src/js/**/*.*', ['reload:js'])
  gulp.watch('./src/css/**/*.*', ['reload:css'])
  gulp.watch('./src/*.html', ['reload:html'])
  gulp.watch('./src/images/**/*', ['reload:images'])
  gulp.watch('./src/fonts/*.{eot,svg,ttf,woff,woff2}', ['reload:fonts'])
  gulp.watch(['./src/robots.txt', './src/images/favicon.ico'], ['reload:extras'])
});

gulp.task('build', [
  'js',
  'css',
  'html',
  'fonts',
  'images',
  'extras',
]);

gulp.task('default', [
  'watch',
]);
