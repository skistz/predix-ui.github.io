
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
 *                  processes _*.html files (minify, etc.) into
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
const stream = require('merge-stream')();
const del = require('del');
const gitSync = require('gulp-git');


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
}

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
}

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
 * COPY FILES INTO DIST
 * This taks loop through an array of all the files that need to be in the dist folder, merges them into a stream, and returns that.
 * @usage Run `gulp copyFilesIntoDist` to copy files into the dist folder.
 * files/folders:
 * index.html
 * the pages folder (html files only)
 * the elements folder (html and json)
 * the css folder
 * the img folder
 * the type folder
 * the bower_components
 ******************************************************************************/

gulp.task('copyFilesIntoDist', ['sass'], function() {
    //the full array of what we want to end up in the dist folder/
   let copyFrom = ['index.html', 'favicon.ico', 'pages/**/*.html', 'elements/**/*.{html,json}', 'service-worker.js', 'type/**/*.{eot, svg, ttf, woff}', 'bower_components/**/*.*', 'img/**/*.*', 'css/**/*.*'];

   //loop through our array to add each stream into the mergeStream process.
   copyFrom.forEach((fileOrFolder) => {
     let current;
     //do we have globbing? if not, just use the file/folder name.
     if (fileOrFolder.indexOf('*') > -1) {
      let firstIndex = fileOrFolder.indexOf('/');
      let copyName = fileOrFolder.substr(0, firstIndex);
      current = gulp.src([copyName + '/**/*.*']).pipe(gulp.dest('./dist/' + copyName));
     } else {
       current = gulp.src([fileOrFolder]).pipe(gulp.dest('./dist/'));
     }
     //add the current file/folder to the stream
     stream.add(current);
   });

   //and make sure it's not empty before we return it.
   return stream.isEmpty() ? null : stream;
});

/*******************************************************************************
 * COPY FILES INTO DIST
 * This taks loop through an array of all the files that need to be in the dist folder, merges them into a stream, and returns that.
 * @usage Run `gulp copyFilesIntoDist` to copy files into the dist folder.
 * files/folders:
 * index.html
 * the pages folder (html files only)
 * the elements folder (html and json)
 * the css folder
 * the img folder
 * the type folder
 * the bower_components
 ******************************************************************************/

gulp.task('copyFilesIntoRoot',function() {
    //the full array of what we want to end up in the root folder/
   let copyFrom = ['./dist/index.html', './dist/favicon.ico', './dist/pages/**/*.html', './dist/elements/**/*.{html,json}', './dist/service-worker.js', './dist/type/**/*.{eot, svg, ttf, woff}', './dist/bower_components/**/*.*', './dist/img/**/*.*', './dist/css/**/*.*'];

   //loop through our array to add each stream into the mergeStream process.
   copyFrom.forEach((fileOrFolder) => {
     let current;
     //do we have globbing? if not, just use the file/folder name.
     if (fileOrFolder.indexOf('*') > -1) {
      let firstIndex = fileOrFolder.indexOf('/');
      let copyName = fileOrFolder.substr(0, firstIndex);
      current = gulp.src(['./dist/' + copyName + '/**/*.*']).pipe(gulp.dest('./' + copyName));
     } else {
       current = gulp.src(['./dist/' + fileOrFolder]).pipe(gulp.dest('.'));
     }
     //add the current file/folder to the stream
     stream.add(current);
   });

   //and make sure it's not empty before we return it.
   return stream.isEmpty() ? null : stream;
});

/*******************************************************************************
 * DEVELOPMENT SERVE PIPELINE
 *
 * Run `gulp serve` during development to continuously process files and reload
 * the browser when files are updated.
 ******************************************************************************/

gulp.task('serve', function() {
  browserSync.init(browserSyncOptions);
  gulp.watch(['css/*-styles.html', '*.html']).on('change', browserSync.reload);
  gulp.watch(['sass/*.scss'], ['sass']);
});

/*******************************************************************************
 * DELETE ALL FILES FOR PRODUCTION
 *
 * This removes all the files except the dist folder, cleaning up the way for
 * the orphan gh-pages branch
 ******************************************************************************/
gulp.task('deleteFiles', function() {
    return del(['./**/*.*', './.gitignore', '!.git/**/*.*', '!./index.html', '!./favicon.ico', '!./pages/**/*.html', '!./elements/**/*.{html,json}', '!./service-worker.js', '!./sw.tmpl', '!./type/**/*.{eot, svg, ttf, woff}', '!./bower_components/**/*.*', '!./img/**/*.*', '!./css/**/*.*', '!./node_modules/**/*.*']);
});

/*******************************************************************************
 * GIT PRODUCTION BUILD PIPELINE
 *
 * this task creates an orphan git branch, and does a git add/commit/push
 ******************************************************************************/

 gulp.task('gitStuff', function() {
   var path;
   if (isTravis()) {
     console.log("we're in travis!");
     path = process.env.TRAVIS_BUILD_DIR;
   } else {
     console.log("we're local.");
     path=".";
   }
   gitSync.checkout('master',{args : '--orphan', cwd : path}, (err) => {
     if (err) {
       console.log(err);
     }
     console.log('finished checkout successfully');
     //set the source to our working directory and exclude node_modules
     return gulp.src('.', {cwd:path})
         .pipe(gitSync.add()) //git add
         .on('error', (err) => console.log(err))
         .pipe(gitSync.commit('master rebuild', {maxBuffer: 'infinity'})) //git commit
         .on('error', (err) => console.log(err))
         .on('end', () => { //this is the only way i foudn to run this synchronously.
           gitSync.push('origin', 'master', {cwd: path, args: "--force"}, (errPush) => {
             if (errPush) {
               console.log('push error: ' + errPush);
             } else {
               console.log("pushed successfully!");
             }
           });
         });
     });
 });


/*******************************************************************************
 * LOCAL BUILD PIPELINE
 *
 * Run `gulp` or `gulp localBuild` to emulate files for dist folder locally.
 ******************************************************************************/

gulp.task('localBuild', function(callback) {
  gulpSequence('sass', 'copyFilesIntoDist', 'generate-service-worker')(callback);
});

/*******************************************************************************
 * PRODUCTION BUILD PIPELINE
 *
 * Run `gulp` or `gulp prodBuild` to prepare files for production before releasing
 * a new version of the project.
 ******************************************************************************/

gulp.task('prodBuild', function(callback) {
   gulpSequence('sass', 'deleteFiles', 'generate-service-worker', 'gitStuff')(callback);
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


/*******************************************************************************
 * ARE WE INSIDE TRAVIS?
 *
 * checks if we are inside the travis VM by testing the process.env.NODE_ENV
 * - travis is "testing"
 ******************************************************************************/
 var isTravis = function() {
   return process.env.TRAVIS === true;
 };

/*******************************************************************************
 * SERVICE WORKER
 *
 * Builds (or rebuilds) a service worker to cache files on the site's app shell.
 * Rebuilding the service worker invalidates the user's cache on the next
 * visit to the site ensuring they get new files.
 ******************************************************************************/

gulp.task('generate-service-worker', function(callback) {
  var swPrecache = require('sw-precache'),
      rootDir =  (!isTravis) ? './dist' : '.';

  swPrecache.write(path.join(rootDir, 'service-worker.js'), {
    staticFileGlobs: [rootDir + '/index.html',
                      rootDir + '/img/**',
                      rootDir + '/type/**',
                      rootDir + '/pages/**',
                      rootDir + '/elements/**/*.html',
                      rootDir + '/css/**',
                      rootDir + '/bower_components/px-theme/**.html',
                      rootDir + '/bower_components/px-spinner/**.html',
                      rootDir + '/bower_components/polymer/polymer*.html',
                      rootDir + '/bower_components/webcomponentsjs/webcomponents-lite.js',
                      rootDir + '/bower_components/webcomponentsjs/webcomponents-lite.min.js',
                      rootDir + '/bower_components/hydrolysis/hydrolysis.*',
                      rootDir + '/bower_components/px-polymer-font-awesome/*polymer-font-awesome.html'],
    stripPrefix: rootDir,
    maximumFileSizeToCacheInBytes: 6000000, //this needed so hydrolysis is cached...
    templateFilePath: 'sw.tmpl'
  }, callback);
});
