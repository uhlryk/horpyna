var gulp = require('gulp');
var sequence = require('gulp-sequence');
var webpack = require('webpack');
var shell = require('gulp-shell');
var webpackDevConfig = require('./webpack.config.dev');
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

gulp.task('_compile-dev', function(done) {
  webpack(webpackDevConfig).run(onBuild(done));
});

gulp.task('_compile-prod', function(done) {
  webpack(webpackProdConfig).run(onBuild(done));
});

gulp.task('_watch', function(done) {
  gulp.watch('./src/**/*.js', ['_compile-dev']);
  done();
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

gulp.task('prod', function(done) {
  sequence(
    '_delete-dist',
    '_compile-prod',
    done
  )
});

gulp.task('dev', function(done) {
  sequence(
    '_delete-dist',
    '_compile-dev',
    '_watch',
    done
  )
});
