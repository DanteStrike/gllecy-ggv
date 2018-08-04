//  image обработка (minify, optim)

const MAIN_CONFIG = require('../gulp-config.js');

const gulp = MAIN_CONFIG.gulp;
const gulpIf = MAIN_CONFIG.gulpIf;
const path = MAIN_CONFIG.path;
const reload = MAIN_CONFIG.browserSync.reload;
const NODE_ENV = MAIN_CONFIG.NODE_ENV;

const imageMin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

gulp.task('image:public', function () {
  return gulp.src(path.src.img) //Выберем наши картинки
      .pipe(gulpIf(NODE_ENV === 'production',
        imageMin({ //Сожмем их
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()],
          interlaced: true
        })))
      .pipe(gulp.dest(path.public.img)) //И бросим в public/assets
      .pipe(reload({stream: true}));
});

gulp.task('svg:minify', function () {
  return gulp.src(path.src.svg) //Выберем наши картинки
      .pipe(
        imageMin({ //Сожмем их
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()],
          interlaced: true
        }))
      .pipe(gulp.dest(path.src.svgLoc))
      .pipe(reload({stream: true}));
});
