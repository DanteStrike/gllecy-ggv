//  html обработка

'use strict';

const MAIN_CONFIG = require('../gulp-config.js');

const gulp = MAIN_CONFIG.gulp;
const path = MAIN_CONFIG.path;
const reload = MAIN_CONFIG.browserSync.reload;

const pug = require('gulp-pug');
const gulpData = require('gulp-data');

const dpath = require('path');
const fs = require('fs');

const htmlbeautify = require('gulp-html-beautify');
const config = {
  'indent_size': 2,
  'indent_char': ' ',
  'indent_with_tabs': false,
  'eol': '\n',
  'end_with_newline': true,
  'preserve_newlines': true,
  'max_preserve_newlines': 10,
  'indent_inner_html': true
};

gulp.task('pug:public', function () {
  return gulp.src(path.src.pug)
  .pipe(gulpData( function(file) {
    return JSON.parse(fs.readFileSync(path.src.jsonData + 'global.json'));
    }))
  .pipe(gulpData( function(file) {
    return JSON.parse(fs.readFileSync(path.src.jsonData + dpath.basename(file.path) + '.json'));
    }))
  .pipe(pug())
  .pipe(htmlbeautify(config))
  .pipe(gulp.dest(path.public.html))
  .pipe(reload({stream: true}));
});
