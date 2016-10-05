var gulp = require("gulp");
var ts = require('gulp-typescript');
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");

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
  return browserify({
    basedir: '.',
    debug: true,
    entries: ['src/mainWorker.ts'],
    cache: {},
    packageCache: {}
  })
    .plugin(tsify)
    .once('error', function(err) {
      console.log(err);
    })
    .bundle()
    .pipe(source('mainWorker.js'))
    .pipe(gulp.dest("app"));
});

gulp.task("default", ["copy-html", "copy-js-lib", "electron-workers"], function () {
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
