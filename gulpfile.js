var gulp = require("gulp");
var ts = require('gulp-typescript');

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
  return gulp.src(['src/mainWorker.ts'])
    .pipe(ts({
      noImplicitAny: true,
      out:'mainWorker.js',
      target: "es5",
      module: "amd"
    }))
    .pipe(gulp.dest('app'));
});

gulp.task("default", ["copy-html", "copy-js-lib", "electron-workers"], function () {
  return gulp.src(['src/*.ts', '!mainWroker.ts'])
    .pipe(ts({
      noImplicitAny: true,
      outFile: 'app.js',
      target: "es5",
      module:'amd'
    }))
    .pipe(gulp.dest('app/js'));
});
