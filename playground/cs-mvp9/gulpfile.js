var gulp = require("gulp");
var ts = require('gulp-typescript');
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var sass = require('gulp-sass');

var paths = {
  pages: ['src/*.html']
};

gulp.task("copy-html", function () {
  return gulp.src(paths.pages)
    .pipe(gulp.dest("app"));
});

gulp.task("copy-js-lib", function() {
  return gulp.src("src/lib/*")
    .pipe(gulp.dest("app/js/lib"));
});

gulp.task('electron-workers', function(){
  return gulp.src("src/mainWorker.js")
    .pipe(gulp.dest("app"));
});


gulp.task('sass', function(){
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'));
});

gulp.task("default", ["copy-html", "copy-js-lib", "electron-workers", "sass"], function () {
  return browserify({
    basedir: '.',
    debug: true,
    entries: ['src/app.ts'],
    cache: {},
    packageCache: {}
  })
    .plugin(tsify)
    .once('error', function(err) {
      console.log(err);
    })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest("app/js"));
});

gulp.task("watch", ["default"], function(){
  gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch('./src/**/*.ts', ['default']);
  gulp.watch('./src/*.html', ['copy-html']);
});