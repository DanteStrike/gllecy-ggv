//  html обработка

'use strict';

const MAIN_CONFIG = require('../gulp-config.js');

const gulp = MAIN_CONFIG.gulp;
const path = MAIN_CONFIG.path;
const reload = MAIN_CONFIG.browserSync.reload;

gulp.task('html:public', function () {
  return gulp.src(path.src.html) // Выберем файлы по нужному пути
    .pipe(gulp.dest(path.public.html)) // Выплюнем их в папку public
    .pipe(reload({stream: true})); // И перезагрузим наш сервер для обновлений
});
