// Author: Juan Cruz Vidiri <jcvidiri@gmail.com>

var gulp = require('gulp'),
    clean      = require('gulp-clean'),
    minifyCss  = require('gulp-cssnano'),
    minifyJs   = require('gulp-uglify'),
    minifyImgs = require('gulp-imagemin'),

    rename     = require('gulp-rename'),
    minifyHTML = require('gulp-htmlmin'),
    inject     = require('gulp-inject');

var files = {
    allJs: 'js/*.js',
    minJs: 'js/*.min.js',
    nonMinJs: ['js/*.js', '!js/*.min.js'],

    allStyles: 'css/**/*.*',
    minStyles: 'css/*.min.css',
    nonMinStyles: ['css/*.css', '!css/*.min.css'],

    index: 'index.html',
    home:  'home.html',
    cur:  'cur.html',
    soc:  'soc.html',
    inf:  'inf.html',
    con:  'con.html'
};

var buildFiles = {
    allJs: 'build/js/*.*',
    allStyles: 'build/css/*.*',
    allHtml: 'build/*.html',
};

gulp.task('css',['clean-css'], function() {
    gulp.src(files.minStyles)
      .pipe(gulp.dest('build/css'));

    return gulp.src(files.nonMinStyles)
        .pipe(minifyCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/css'));
});

gulp.task('inject-own', ['inject-own-js'], function() {
});

gulp.task('inject-own-js', ['inject-own-css'], function() {
    return gulp.src(buildFiles.allHtml)
        .pipe(inject(gulp.src(buildFiles.allJs, { read: false }), {relative: true}))
        .pipe(gulp.dest('build'));
});

gulp.task('inject-own-css', function() {
    return gulp.src(buildFiles.allHtml)
        .pipe(inject(gulp.src(buildFiles.allStyles, { read: false}),  {relative: true}))
        .pipe(gulp.dest('build'));
});

gulp.task('js', ['clean-js'], function() {

  gulp.src(files.minJs)
    .pipe(gulp.dest('build/js'));

  return gulp.src(files.nonMinJs)
      .pipe(minifyJs())
      .pipe(rename({suffix: '.min'}))
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

gulp.task('prepare-libs', ['css', 'js', 'images']);

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

  gulp.src(files.con)
      .pipe(rename('contact.html'))
      .pipe(minifyHTML({ collapseWhitespace: true }))
      .pipe(gulp.dest('build'));

  gulp.src(['fonts/**/*'])
      .pipe(gulp.dest('build/fonts'));

  return gulp.src(['robots.txt', '404.html', 'apple-touch-icon-precomposed.png', 'favicon.ico' ])
      .pipe(gulp.dest('build'));
});
