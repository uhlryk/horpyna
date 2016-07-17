var gulp = require('gulp');
var sequence = require('gulp-sequence');
var webpack = require('webpack');
var shell = require('gulp-shell');
var webpackProdConfig = require('./webpack.config.prod');
var delPath = require('del');

function onBuild(done) {
  return function(err, stats) {
    if(err) {
      console.log('Error', err);
    }
    else {
      console.log(stats.toString());
    }

    if(done) {
      done();
    }
  }
}

gulp.task('_delete-dist', function(done) {
  delPath(['./dist/']).then(function() {
    done();
  });
});

gulp.task('_compile-prod', function(done) {
  webpack(webpackProdConfig).run(onBuild(done));
});

gulp.task('_test', shell.task(['./node_modules/.bin/mocha --compilers js:babel-register --check-leaks --timeout 3000 tests']));

gulp.task('test',function(done) {
  sequence(
    '_delete-dist',
    '_compile-prod',
    '_test',
    done
  )
});

gulp.task('build', function(done) {
  sequence(
    '_delete-dist',
    '_compile-prod',
    done
  )
});
