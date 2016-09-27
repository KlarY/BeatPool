var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var mocha = require("gulp-mocha");
var ts = require('gulp-typescript');

var paths = {
    pages: ['src/*.html']
};

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

gulp.task("default", ["copy-html"], function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest("dist"));
});

gulp.task("test", function(){
    var args = process.argv;
    console.log(args);

    return gulp.src('test/*Test.ts')
      .pipe(ts({
          typescript: require('typescript'),
          noImplicitAny: true,
          target: "es5",
          module: "commonjs",
          moduleResolution: "node"
      }))
      .pipe(mocha())
        .once('error', function() {
          process.exit(1);
        })
    .once('end', function() {
        process.exit();
    });
});

