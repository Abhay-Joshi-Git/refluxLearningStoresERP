var gulp = require('gulp');
var connect = require('gulp-connect');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('js', function() {
    browserify('./src/js/main.jsx')
        .transform(babelify)
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('copy', function() {
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
    gulp.src('src/css/**')
        .pipe(gulp.dest('dist/css'));
    gulp.src('node_modules/bootstrap/dist/css/bootstrap.css')
        .pipe(gulp.dest('dist/css'));
});

gulp.task('serve', function() {
    connect.server({
        root: 'dist'
    });
});

gulp.task('default', ['js', 'copy', 'serve'], function() {
    gulp.watch('src/**/*', ['js', 'copy']);
});