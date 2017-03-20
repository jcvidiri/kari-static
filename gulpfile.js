var gulp = require('gulp'),
    clean      = require('gulp-clean'),
    minifyCss  = require('gulp-cssnano'),
    minifyJs   = require('gulp-uglify'),
    minifyImgs = require('gulp-imagemin'),

    imagemin   = require('imagemin'),
    imageminMozjpeg = require('imagemin-mozjpeg'),
    imageminPngquant = require('imagemin-pngquant'),

    rename     = require('gulp-rename'),
    lib        = require('bower-files')(),
    concat     = require('gulp-concat'),
    minifyHTML = require('gulp-htmlmin'),
    wiredep    = require('wiredep').stream,
    inject     = require('gulp-inject');

var timestamp = (new Date()).getTime();

var files = {
    jsMain: 'js/*.js',
    styles: 'css/**/*.{css,min.css}',
    images: 'images/*.*',
    index: 'index.html',
    home:  'home.html',
};

var buildFiles = {
    jsMain: 'build/js/*.*',
    styles: 'build/css/*.*',
    index: 'build/index.html',
};

var minifiedFiles = {
  custom: '*/all.*.min.*',
  lib: '*/lib.*.min.*'
};

// gulp.task('inject-libs', function() {
//   return gulp.src(files.home)
//     .pipe(inject(gulp.src([buildFiles.jsMain, buildFiles.styles], { read: false }), { relative: true }))
//     .pipe(wiredep())
//     .pipe(rename('index.html'))
//     .pipe(gulp.dest('build'));
// });

// gulp.task('css-custom', ['clean-css'], function() {
//   return gulp.src([files.styles])
//     .pipe(concat('all.' + timestamp + '.min.css'))
//     .pipe(minifyCss())
//     .pipe(gulp.dest('build/css'));
// });

gulp.task('copy-css',['clean-css'], function() {
   return gulp.src('css/*.css')
    .pipe(gulp.dest('build/css'));
});

gulp.task('copy-min-css', function() {
   return gulp.src('css/*.min.css')
    .pipe(gulp.dest('build/css'));
});

// gulp.task('js-custom',['copy-min'], function() {
//   return gulp.src([files.jsMain])
//     .pipe(concat('all.' + timestamp + '.min.js'))
//     .pipe(minifyJs())
//     .pipe(gulp.dest('build/js'));
// });


gulp.task('inject-own-js', function() {
    return gulp.src(buildFiles.index)
        .pipe(inject(gulp.src(buildFiles.jsMain, { read: false }), {relative: true}))
        .pipe(gulp.dest('build'));
});

gulp.task('inject-own-css', function() {
    return gulp.src(buildFiles.index)
        .pipe(inject(gulp.src(buildFiles.styles, { read: false}),  {relative: true}))
        .pipe(gulp.dest('build'));
});

gulp.task('inject-own', ['inject-own-css', 'inject-own-js'], function() {

});


gulp.task('copy-js', ['clean-js'], function() {
   return gulp.src('js/*.js')
    // .pipe(minifyJs())
    // .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('build/js'));
});

// gulp.task('js-libs', ['clean-js'], function() {
//   return gulp.src(lib.ext('js').files)
//     .pipe(concat('lib.' + timestamp  + '.min.js'))
//     .pipe(minifyJs())
//     .pipe(gulp.dest('build/js'));
// });

// gulp.task('css-libs', ['clean-css'], function() {
//   return gulp.src(lib.ext('css').files)
//     .pipe(concat('lib.' + timestamp  + '.min.css'))
//     .pipe(minifyCss())
//     .pipe(gulp.dest('build/css'));
// });

gulp.task('images-jpg', ['clean-images'], function() {
  imagemin(['images/*.jpg'], 'build/images', { plugins: [imageminMozjpeg()] })
});

gulp.task('images-png', ['images-jpg'], function() {
  imagemin(['images/*.png'], 'build/images', { plugins: [imageminPngquant({quality: '65-80'})] })
});

gulp.task('clean-images', function() {
  return gulp.src(['build/images'], { read: false })
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

gulp.task('prepare-libs', ['copy-css', 'copy-js', 'images-png']);

gulp.task('build', ['prepare-libs'], function() {
  return gulp.src(files.home)
    .pipe(rename('index.html'))
    .pipe(minifyHTML({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
});
