var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task("default", ["test"]);

gulp.task('deb', shell.task('node --inspect-brk ./egg.js examples/one.egg'));

gulp.task('run', shell.task('node ./egg.js examples/one.egg'));

gulp.task("test", shell.task("./node_modules/mocha/bin/mocha --require should"));

gulp.task("test-package", shell.task(
[
  "rm -fR /tmp/check-egg && "+
  "git clone git@gist.github.com:8dfcaa01a0377dead374bc35c462c29d.git /tmp/check-egg && "+ 
  "cd /tmp/check-egg/ && "+
  "npm i --no-save && "+
  "npm start | grep '395\.5'"
]));

gulp.task("publish", shell.task([
  "npm version patch",
  "npm publish --access public"
]));
