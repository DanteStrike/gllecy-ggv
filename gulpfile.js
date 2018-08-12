'use strict';

const MAIN_CONFIG = require('./gulp-config.js');

const gulp = MAIN_CONFIG.gulp;
const path = MAIN_CONFIG.path;
const NODE_ENV = MAIN_CONFIG.NODE_ENV;

const runSequence = require('run-sequence'); // Послед. запуск
const rimraf = require('rimraf'); // rm -rf

console.log(NODE_ENV);

//------------------- Конфигурация сервера для LiveLoad + таск на запуск -------------------\\
const browserSync = MAIN_CONFIG.browserSync;
const config = {
  server: {
    baseDir: './public/',
    directory: true
  },
  tunnel: true,
  host: 'localhost',
  port: 8080,
  logPrefix: "Frontend_DevilDante"
};

gulp.task('webserver', function () {
  return browserSync(config);
});

//------------------- load tasks from gulp-tasks -------------------\\
const hub = require('gulp-hub');
hub(['./gulp-tasks/*.js']);

//------------------- Clean \public -------------------\\
gulp.task('clean', function (cb) {
  return rimraf(path.clean, cb);
});

//------------------- WATCH -------------------\\
gulp.task('watch', function(){
//  gulp.watch(path.src.html, ['html:public']);
  gulp.watch(path.src.pug, ['pug:public']);
  gulp.watch(path.src.scssAll, ['css:public']);
  gulp.watch(path.src.scssMain, ['css:public']);
  gulp.watch(path.src.jsAll, ['js:public']);
  gulp.watch(path.src.jsMain, ['js:public']);
  gulp.watch(path.src.img, ['image:public']);
  gulp.watch(path.src.font, ['font:public']);
});

//------------------- Main Tasks -------------------\\

gulp.task('public', [
//  'html:public',
  'pug:public',
  'normoliz:public',
  'css:public',
  'js:public',
  'image:public'
]);

gulp.task('public:hard', function(callback) {
  runSequence('clean', 'public', callback);
});

gulp.task('start', function(callback) {
  runSequence('webserver', 'watch', callback);
});
