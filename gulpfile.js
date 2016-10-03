var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var mocha = require("gulp-mocha");
var ts = require('gulp-typescript');
var sass = require('gulp-sass');


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
      .once('error', function(err) {
        console.log(err);
      })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest("dist"));
});

gulp.task('sass', function(){
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass:watch', function(){
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('page:watch', function(){
  gulp.watch('./src/**/*.ts', ['default'])
  gulp.watch('./src/*.html', ['copy-html'])
});

gulp.task('demo', ['default', 'sass', 'sass:watch', 'page:watch'], function(){

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

