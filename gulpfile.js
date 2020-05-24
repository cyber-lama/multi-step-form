// подключаем модуль gulp
const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require("browser-sync").create();

//Порядок подключения css файлов
const sassFiles = [
        './app/src/sass/main.sass'
    ]
    //Порядок подключения js файлов
const jsFiles = [
    './app/src/js/lib.js',
    './app/src/js/main.js'
]

function styles() {
    return gulp.src(sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(csso({
            restructure: true,
            sourceMap: true,
            debug: true
        }))
        .pipe(gulp.dest('./app/build/css'))
        .pipe(browserSync.stream());
}


function scripts() {
    return gulp.src(jsFiles)
        .pipe(concat('script.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify({
            toplevel: true
        }))
        .pipe(gulp.dest('./app/build/js'))
        .pipe(browserSync.stream());
}

function clean() {
    return del(['app/build/*'])
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "app"
        }
    });
    // следим за sass
    gulp.watch('app/src/sass/**/*.sass', styles)
        // следим за js
    gulp.watch('app/src/js/**/*.js', scripts)
        // следим за html
    gulp.watch("app/*.html").on('change', browserSync.reload);
}



gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('del', clean);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts)));
//Таск запускает таск build и watch последовательно
gulp.task('dev', gulp.series('build', 'watch'));