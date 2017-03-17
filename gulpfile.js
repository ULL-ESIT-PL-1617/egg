var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('debug', shell.task('node --inspect --debug-brk egg.js')
);
