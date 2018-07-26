'use strict';

const MAIN_CONFIG = require('../gulp-config.js');

const gulp = MAIN_CONFIG.gulp;
const gulpIf = MAIN_CONFIG.gulpIf;
const path = MAIN_CONFIG.path;
const reload = MAIN_CONFIG.browserSync.reload;
const NODE_ENV = MAIN_CONFIG.NODE_ENV;

const eslint = require('gulp-eslint');
const webpackConfig = require('../webpack.config.js');
const webpack = require('webpack-stream');

gulp.task('js:public', function() {
  return gulp.src(path.src.jsMain)
    .pipe(eslint('../.eslintrc.json'))
    .pipe(eslint.format())
    .pipe(gulpIf(NODE_ENV === 'production', eslint.failAfterError()))
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(path.public.js))
    .pipe(reload({stream: true}));
});
