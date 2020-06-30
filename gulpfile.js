const gulp = require('gulp');

const concat = require('gulp-concat');

const autoprefixer = require('gulp-autoprefixer');

const cleanCSS = require('gulp-clean-css');

const del = require('del');

const browserSync = require('browser-sync').create();

const sourcemaps = require('gulp-sourcemaps');

const sass = require('gulp-sass');

const imagemin = require('gulp-imagemin');

const rename = require('gulp-rename');

const jade = require('gulp-jade');

const styleFiles = [
    './src/css/style.sass',
]

const scriptFiles = [
    './src/js/ReloadAtributeRefAtIframeVideo.js',
    './src/js/ChangeAdaptiveMenuClassList.js'
]


gulp.task('styles', () => {

    return gulp.src(styleFiles)
        .pipe(sourcemaps.init())

        .pipe(sass())

        .pipe(concat('style.css'))

        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))

        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(rename({
            suffix: '.min'
        }))

        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', () => {


    return gulp.src(scriptFiles)

        .pipe(concat('main.js'))

        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream());

});

gulp.task('del', () => {
    return del(['build/*'])
});


gulp.task('img-compress', () => {
    return gulp.src('./src/img/**')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('./build/img/'))
});

gulp.task('jade', function () {
    return gulp.src('./src/template/index.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./build'))
});

gulp.task('watch', () => {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });

    gulp.watch('./build/src/img/**', gulp.series('img-compress'))

    gulp.watch('./build/src/css/**/*.sass', gulp.series('styles'))

    gulp.watch('./build/src/js/**/*.js', gulp.series('scripts'))

    gulp.watch("./build/*.html").on('change', browserSync.reload);

});


gulp.task('default', gulp.series('del', gulp.parallel('styles', 'scripts', 'img-compress', 'jade'), 'watch'));
