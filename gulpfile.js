var gulp       = require('gulp');
var concat     = require('gulp-concat');
var sass       = require('gulp-sass');
var cleanCss   = require('gulp-clean-css');
var jshint     = require('gulp-jshint');
var uglify     = require('gulp-uglify');
var ngmin      = require('gulp-ngmin');
var sourcemaps = require('gulp-sourcemaps');
var notify     = require('gulp-notify');
var wiredep    = require('wiredep').stream;

var paths = {
  styles: ['./public/assets/scss/**/*.scss'],
  scripts: ['./public/assets/js/**/*.js']
};

gulp.task('styles', function() {
  gulp.src(paths.styles)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('app.min.css'))
    .pipe(cleanCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/build'))
    .pipe(notify("CSS generated!"));
});

gulp.task('scripts', function() {
  gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('app.min.js'))
    .pipe(ngmin())
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('./public/build'))
    .pipe(notify("JS generated!"));
});

gulp.task('inject', function() {
  gulp.src('./public/views/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('./public/views'));
});

gulp.task('watch', function() {
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(['./public/libs'], ['inject']);
});
