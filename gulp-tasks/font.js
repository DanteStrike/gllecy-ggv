// FONTS
const MAIN_CONFIG = require('../gulp-config.js');
const gulp = MAIN_CONFIG.gulp;
const path = MAIN_CONFIG.path;

gulp.task('font:public', function () {
  return gulp.src(path.src.font)
  .pipe(gulp.dest(path.public.font));
});
