const GULP = require('gulp');
const GULP_IF = require('gulp-if');

const BROWSER_SYNC = require('browser-sync');

//------------------- Основные пути -------------------\\
const PATH = {
  public: {
    html: __dirname + '/public/',

    css: __dirname + '/public/assets/css/',

    js: __dirname + '/public/assets/js/',

    img: __dirname + '/public/assets/img/',

    font: __dirname + '/public/assets/font/'
  },
  src: {
    html: __dirname + '/src/*.html',
    pug: __dirname + '/src/views/*.pug',
    jsonData: __dirname + '/src/views/data/',

    normoliz: __dirname + '/node_modules/normalize.css/normalize.css',
    commonBlocks: __dirname + '/src/common.blocks/',
    scssAll: __dirname + '/src/common.blocks/*.scss',
    scssMain: __dirname + '/src/css/style.scss',
    cssMain: __dirname + '/src/css/_style/',

    jsAll: __dirname + '/src/common.blocks/*.js',
    jsMain: __dirname + '/src/js/main.js',

    img: __dirname + '/src/img/*.*',
    font: __dirname + '/src/font/*.*'
  },
  clean: __dirname + '/public'
};

//------------------- Получение параметров из консоли. Разделение на режимы сборки -------------------\\
const args = require('yargs').argv;
let env = args.env || 'development'; // prod | dev (default)    gulp [task] --env = {prod| dev}

if (env === 'dev') {
  env = 'development';
}

if (env === 'prod') {
  env = 'production';
}

process.env.NODE_ENV = env;

//------------------- Экспорт -------------------\\
module.exports = {
  gulp: GULP,
  gulpIf: GULP_IF,
  browserSync: BROWSER_SYNC,
  path: PATH,
  NODE_ENV: env
}
