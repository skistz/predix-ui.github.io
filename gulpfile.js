
'use strict';

/*******************************************************************************
 * PREDIX UI CATALOG BUILD TOOLS
 *
 * The following gulp tasks are available for this project:
 *
 * - `gulp serve` - Run when developing the project. Continuously builds *.scss
 *                  files to the css/ directory. Runs BrowserSync to reload the
 *                  page whenever a file is changed.
 *
 * - `gulp build` - Run before releasing a new version of the project to
 *                  production. Builds *.scss files to the css/ directory,
 *                  processes _*.html files (vulcanize, minify, etc.) into
 *                  *.html files.
 ******************************************************************************/

const path = require('path');
const gulp = require('gulp');
const pkg = require('./package.json');
const $ = require('gulp-load-plugins')();
const gulpSequence = require('gulp-sequence');
const importOnce = require('node-sass-import-once');
const stylemod = require('gulp-style-modules');
const browserSync = require('browser-sync').create();
const gulpif = require('gulp-if');
const combiner = require('stream-combiner2');
const bump = require('gulp-bump');
const argv = require('yargs').argv;
const rename = require('gulp-rename');
const symlink = require("gulp-sym");
const chmod = require('gulp-chmod');
const lazypipe = require('lazypipe');
const htmlmin = require('gulp-htmlmin');
const vulcanize = require('gulp-vulcanize');

/*******************************************************************************
 * SETTINGS
 *
 * Configuration settings for various libraries used to process source files.
 * Read the documentation for each library for more information on what
 * specific configuration flags do.
 ******************************************************************************/

const sassOptions = {
  importer: importOnce,
  importOnce: {
    index: true,
    bower: true
  }
};

const vulcanizeOptions = {
  abspath: '',
  stripComments: true,
  inlineCSS: true,
  inlineScripts: true
};

const htmlminOptions = {
  collapseWhitespace: true,
  removeComments: true,
  removeEmptyAttributes: true,
  minifyJS: true,
  minifyCSS: true
};

const browserSyncOptions = {
  port: 8080,
  notify: false,
  reloadOnRestart: true,
  logPrefix: `${pkg.name}`,
  https: false,
  files: ['*.*'],
  server: ['./', 'bower_components']
};

/*******************************************************************************
 * BASIC UTILITIES
 *
 * Tasks and functions used across tasks to accomplish simple things.
 ******************************************************************************/

function handleError(err){
  console.log(err.toString());
  this.emit('end');
};

/*******************************************************************************
 * SASS BUILD PIPELINE
 *
 * Builds the *.scss files to the css/ directory. Runs appropriate preprocessing
 * and postprocessing to turn files in to style modules, etc.
 ******************************************************************************/

function buildCSS(){
  return combiner.obj([
    $.sass(sassOptions),
    $.autoprefixer({
      browsers: ['last 2 versions', 'Safari 8.0'],
      cascade: false
    }),
    gulpif(!argv.debug, $.cssmin())
  ])
  .on('error', handleError);
};

gulp.task('sass', function() {
  return gulp.src(['./sass/*.scss'])
  .pipe(buildCSS())
  .pipe(stylemod({
    moduleId: function(file) {
      return path.basename(file.path, path.extname(file.path)) + '-styles';
    }
  }))
  .pipe(gulp.dest('css'))
  .pipe(browserSync.stream({match: 'css/*.html'}));
});

gulp.task('sass:clean', function() {
  return gulp.src(['.tmp', 'css'], {
    read: false
  })
  .pipe($.clean());
});

/*******************************************************************************
 * HTML BUILD PIPELINE
 *
 * Builds the _*.html files to *.html files to prepare for production. Uses
 * various methods to improve client performane (vulcanize, minify, etc).
 ******************************************************************************/

var buildPipe = lazypipe()
  .pipe(vulcanize, vulcanizeOptions)
  .pipe(htmlmin, htmlminOptions)
  .pipe(function() {
    return rename(function(path) {
      path.basename = path.basename.substr(1);
    });
  })
  .pipe(gulp.dest,'.');


gulp.task('html', function() {
  return gulp.src('_*.html').pipe(buildPipe());
});

/*******************************************************************************
 * VERSION BUMP PIPELINE
 *
 * Run the appropriate `gulp bump:*` command to update project verion numbers in
 * bower.json and package.json manifest files before release.
 ******************************************************************************/

gulp.task('bump:patch', function(){
  gulp.src(['./bower.json', './package.json'])
  .pipe(bump({type:'patch'}))
  .pipe(gulp.dest('./'));
});

gulp.task('bump:minor', function(){
  gulp.src(['./bower.json', './package.json'])
    .pipe(bump({type:'minor'}))
    .pipe(gulp.dest('./'));
});

gulp.task('bump:major', function(){
  gulp.src(['./bower.json', './package.json'])
  .pipe(bump({type:'major'}))
  .pipe(gulp.dest('./'));
});

/*******************************************************************************
 * DEVELOPMENT BUILD PIPELINE
 *
 * Run `gulp serve` during development to continuously process files and reload
 * the browser when files are updated.
 ******************************************************************************/

gulp.task('serve', function() {
  browserSync.init(browserSyncOptions);
  gulp.watch(['css/*-styles.html', '*.html', 'bower_components/**/*.html']).on('change', browserSync.reload);
  gulp.watch(['sass/*.scss'], ['sass']);
});

/*******************************************************************************
 * PRODUCTION BUILD PIPELINE
 *
 * Run `gulp` or `gulp build` to prepare files for production before releasing
 * a new version of the project.
 ******************************************************************************/

gulp.task('build', function(callback) {
  gulpSequence('sass','html')(callback);
});

gulp.task('default', ['build']);

/*******************************************************************************
 * GIT HOOK INSTALLATION
 *
 * Tasks to help with installing githooks.
 ******************************************************************************/

gulp.task('hooks', function() {
  return gulp.src(['.git-hooks/post-merge'])
  .pipe(symlink(['.git/hooks/post-merge'], {
      relative: true,
      force: true
  }));
});

gulp.task('chmod', function() {
  return gulp.src('.git-hooks/*')
  .pipe(chmod(755))
  .pipe(gulp.dest('.git-hooks'));
});
