var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task("default", ["test"]);

gulp.task('deb', shell.task('node --inspect-brk ./bin/egg.js examples/one.egg'));

gulp.task('run', shell.task('node ./bin/egg.js examples/one.egg'));

gulp.task("test", shell.task("NODE_PATH=lib ./node_modules/mocha/bin/mocha --require should"));

// Pushes the public version pl1617master
gulp.task("publicpush", shell.task("git push pl1617 pl1617master:master"));

gulp.task("test-package", shell.task(
[
  "rm -fR /tmp/check-egg && "+
  "git clone git@gist.github.com:8dfcaa01a0377dead374bc35c462c29d.git /tmp/check-egg && "+ 
  "cd /tmp/check-egg/ && "+
  "npm i --no-save && "+
  "npm start | grep '395\.5'"
]));

gulp.task("publish", shell.task([
  "git ci -am `npm -v '@crguezl/eloquentjsegg'`", // bug. It goes one behind
  "npm version patch",
  "npm publish --access public",
  "git push origin master"
]));

gulp.task("clean", shell.task(
  "rm -f *.evm **/*.evm"
));
