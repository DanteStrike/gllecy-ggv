//  SVG SPRITE GENERATOR

const MAIN_CONFIG = require('../gulp-config.js');

const gulp = MAIN_CONFIG.gulp;

const svgSprite = require('gulp-svg-sprite');

const path = {
  src: {
    svgIcons: '../src/sprite/svgSprite_icons/*.svg'
  }
};

// Конфигурация svg sprite генератора
const svgSpriteConfig = {
  mode: {
    css: {
      dest: "./",
      layout: "diagonal",
      bust: false,
      sprite: "sprite.svg",
      render: {
        css: true // Activate CSS output (with default options)
      }
    }
  }
};

gulp.task('svgSpriteCreate', function () {
  return gulp.src(path.src.svgIcons)
  .pipe(svgSprite(svgSpriteConfig))
  .pipe(gulp.dest('../src/sprite'));
});

gulp.task('svgSprite', ['svgSpriteCreate'], function () {
  return gulp.src('../src/sprite/sprite.svg')
  .pipe(gulp.dest('../src/img'));
});
