//  SCSS обработка (compile, minify, autoprefix, csscomb, source-map)

'use strict';
const MAIN_CONFIG = require('../gulp-config.js');

const gulp = MAIN_CONFIG.gulp;
const gulpIf = MAIN_CONFIG.gulpIf;
const path = MAIN_CONFIG.path;
const reload = MAIN_CONFIG.browserSync.reload;
const NODE_ENV = MAIN_CONFIG.NODE_ENV;

const LEC = require('gulp-line-ending-corrector');

const sass = require('gulp-sass');
const cssMin = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csscomb = require('gulp-csscomb');

const sourcemaps = require('gulp-sourcemaps');

//Доп. таски
gulp.task('csscomb', function () {
  return gulp.src(path.src.scssAll) // Найдем все файлы css
    .pipe(csscomb()) // "Причешим"
    .pipe(LEC({eolc: 'CRLF'}))
    .pipe(gulp.dest(path.src.commonBlocks));
});

gulp.task('css:buildStyle', ['csscomb'], function () {
  return gulp.src(path.src.scssMain) //Выберем наш css
    .pipe(sass())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(csscomb())
    .pipe(LEC({eolc: 'CRLF'}))
    .pipe(gulp.dest(path.src.cssMain)) // Предпросмотр
    .pipe(reload({stream: true}));
});

gulp.task('normoliz:public', function () {
  return gulp.src(path.src.normoliz)
    .pipe(gulpIf(NODE_ENV === 'production', cssMin()))
    .pipe(gulp.dest(path.public.css));
});

//Основной таск
gulp.task('css:public', ['csscomb'], function () {
  return gulp.src(path.src.scssMain) // Выберем наш основной scss
    .pipe(gulpIf(NODE_ENV === 'development', sourcemaps.init()))
      .pipe(sass()) // Компилируем
      .pipe(postcss([ autoprefixer({
        browsers:['last 2 versions', '> 5%', 'not dead', 'ie >= 11']
        }) ])) // Добавить префиксы
      .pipe(gulpIf(NODE_ENV === 'production', cssMin())) // Минификация
    .pipe(gulpIf(NODE_ENV === 'development', sourcemaps.write()))
    .pipe(gulp.dest(path.public.css))
    .pipe(reload({stream: true}));
});
