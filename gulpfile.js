// gulpfile
// Author: jcv
// first build, then inject-own

var gulp = require('gulp'),
    clean      = require('gulp-clean'),
    minifyCss  = require('gulp-cssnano'),
    minifyJs   = require('gulp-uglify'),
    minifyImgs = require('gulp-imagemin'),

    rename     = require('gulp-rename'),
    minifyHTML = require('gulp-htmlmin'),
    inject     = require('gulp-inject');

var files = {
    jsMain: 'js/*.js',
    styles: 'css/**/*.*',
    index: 'index.html',
    home:  'home.html',
    cur:  'cur.html',
    soc:  'soc.html',
    inf:  'inf.html',
    con:  'con.html'
};

var buildFiles = {
    jsMain: 'build/js/*.*',
    styles: 'build/css/*.*',
    allHtml: 'build/*.html',
};

gulp.task('copy-css',['clean-css'], function() {
   return gulp.src('css/*.css')
    .pipe(gulp.dest('build/css'));
});

gulp.task('copy-min-css', function() {
   return gulp.src('css/*.min.css')
    .pipe(gulp.dest('build/css'));
});

gulp.task('inject-own-js', ['inject-own-css'], function() {
    return gulp.src(buildFiles.allHtml)
        .pipe(inject(gulp.src(buildFiles.jsMain, { read: false }), {relative: true}))
        .pipe(gulp.dest('build'));
});

gulp.task('inject-own-css', function() {
    return gulp.src(buildFiles.allHtml)
        .pipe(inject(gulp.src(buildFiles.styles, { read: false}),  {relative: true}))
        .pipe(gulp.dest('build'));
});

gulp.task('inject-own', ['inject-own-js'], function() {

});

gulp.task('copy-js', ['clean-js'], function() {
   return gulp.src('js/*.js')
    // .pipe(minifyJs())
    // .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('build/js'));
});


gulp.task('images', ['clean-images'], function() {
	return gulp.src('img/*')
		.pipe(minifyImgs())
		.pipe(gulp.dest('build/img'))
});


gulp.task('clean-images', function() {
  return gulp.src(['build/img'], { read: false })
    .pipe(clean());
});

gulp.task('clean-js', function() {
  return gulp.src(['build/js'], { read: false })
    .pipe(clean());
});

gulp.task('clean-css', function() {
  return gulp.src(['build/css'], { read: false })
    .pipe(clean());
});

gulp.task('prepare-libs', ['copy-css', 'copy-js', 'images']);

gulp.task('build', ['prepare-libs'], function() {
  gulp.src(files.home)
    .pipe(rename('index.html'))
    .pipe(minifyHTML({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));

  gulp.src(files.cur)
      .pipe(rename('curriculum.html'))
      .pipe(minifyHTML({ collapseWhitespace: true }))
      .pipe(gulp.dest('build'));

  gulp.src(files.soc)
      .pipe(rename('social.html'))
      .pipe(minifyHTML({ collapseWhitespace: true }))
      .pipe(gulp.dest('build'));

  gulp.src(files.inf)
      .pipe(rename('information.html'))
      .pipe(minifyHTML({ collapseWhitespace: true }))
      .pipe(gulp.dest('build'));

  return gulp.src(files.con)
      .pipe(rename('contact.html'))
      .pipe(minifyHTML({ collapseWhitespace: true }))
      .pipe(gulp.dest('build'));
});
