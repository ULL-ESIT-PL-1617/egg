var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task("default", ["test"]);

gulp.task('deb', shell.task('node --inspect-brk ./egg.js one.egg'));

gulp.task('run', shell.task('node ./egg.js one.egg'));

gulp.task("test", shell.task("./node_modules/mocha/bin/mocha --require should"));

gulp.task("publish", shell.task([
  "npm version patch",
  "npm publish --access public"
]));
