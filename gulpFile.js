var gulp = require('gulp');
var sassdoc = require('sassdoc');
var converter = require('sass-convert');
var del = require('del');

gulp.task('sassdoc', function () {
  return gulp.src('./css/*.css')
    .pipe(converter({
      from: 'css',
      to: 'scss',
    }))
    .pipe(sassdoc());
});

gulp.task('clean', function(cb){
    console.log('You have a clean sass folder.');
	del(['./sass/*']);
});
