var gulp        = require('gulp'),
    bower       = require('gulp-bower'),
    wiredep     = require('wiredep').stream,
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass'),
    postcss     = require('gulp-postcss'),
    autoprefixer= require('autoprefixer'),
    cssnano     = require('cssnano');

gulp.task('css', function(){
  var processors = [
    autoprefixer({browsers: ['last 2 version']}),
    cssnano(),
  ];
  return gulp.src('./view/css/main.css')
    .pipe(postcss(processors))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./dist/view/css/'));
});

gulp.task('browser-sync', ['sass'], function() {
    browserSync.init({
        server: "./view",
        notify: false,
        port: 8080,
        ui: {
            port: 8081
        }
    });
});

gulp.task('bower', function() {
  return bower();
});

gulp.task('bower-inject', function () {
  gulp.src('./view/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('view'));
});

gulp.task('sass', function() {
    return gulp.src("./view/scss/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("./view/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', ['bower', 'browser-sync'], function(){
    gulp.watch("./view/scss/*.scss", ['sass']);
    gulp.watch("bower.json", ['bower-inject']);
    gulp.watch("./view/js/*.js").on('change', browserSync.reload);
    gulp.watch("./view/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['watch']);
