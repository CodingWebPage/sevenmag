var gulp = require('gulp'),
    less = require('gulp-less'),
    watch = require('gulp-watch'),
    browserSync = require("browser-sync").create(),
    path = require('path'),
    cleanCSS = require('gulp-clean-css');

//gulp-less
gulp.task('less', function () {
  return gulp.src('_src/less/styles.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({stream:true}));
});

// gulp-watch
gulp.task('watch', ['serve', 'less'], function () {
    gulp.watch('_src/less/styles.less', ['less'])
});
          
gulp.task('stream', function () {
    // Endless stream mode 
    return watch('build/css/*.css', { ignoreInitial: false })
        .pipe(gulp.dest('build'));
});
 
gulp.task('callback', function () {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event 
    return watch('build/css/*.css', function () {
        gulp.src('build/css/*.css')
            .pipe(gulp.dest('build'));
    });
});

//gulp-browser-sync
gulp.task("serve", function() {
    browserSync.init({
        server: "build"
    });
});

//gulp-clean-css
gulp.task('minify-css', function() {
  return gulp.src('build/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});