const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const rename = require('gulp-rename');
const browserSync = require( 'browser-sync' ).create();





// CSS Optimization
gulp.task('css', function() {
    return gulp.src('assets/sass/**/*sass')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});
// CSS Libs
gulp.task('css-libs', function() {
    return gulp.src('assets/libs/magnific-popup/dist/magnific-popup.css')
    .pipe(cssnano())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('build/css/libs'))
    .pipe(browserSync.stream());
});

// JS Optimization
gulp.task('scripts', function() {
    return gulp.src([
    	'assets/libs/jquery/dist/jquery.min.js',
        'assets/js/**/*.js'
    	// 'assets/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
    	])
    .pipe(concat('scripts.min.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('build/js'))
});


// Image Optimization
gulp.task('images', function() {
    return gulp.src('assets/images/*')
    .pipe(webp())
    .pipe(imagemin())
    .pipe(gulp.dest('build/images'))
});


// Static Server + watching scss/html files

var siteName = 'viter'; // set your siteName here

// Sass Watch
gulp.task('watch', function() {
    // Run BrowserSync
    browserSync.init({
        proxy: 'http://' + siteName + '.local',
        host: siteName + '.local',
        open: 'external',
        port: 8000
    });

    // Watch files and reload website 
    gulp.watch('assets/sass/**/*.sass', gulp.series('css'));
    gulp.watch('assets/libs/**/*.css', gulp.series('css-libs'));
    gulp.watch('assets/js/**/*.js', gulp.series('scripts')).on( 'change', browserSync.reload );
    gulp.watch('assets/images/**/*', gulp.series('images')).on( 'change', browserSync.reload );
});