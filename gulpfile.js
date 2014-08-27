'use strict';

var path = require('path');

var gulp = require('gulp');
var merge = require('merge-stream');
var del = require('del');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
// var rev = require('gulp-rev');
var bump = require('gulp-bump');
var git = require('gulp-git');

var pkg = require('./package.json');
// major, minor, patch, prerelease
// https://github.com/stevelacy/gulp-bump#version-example
var bumpType = 'patch';
var version;

gulp.task('clean', function(cb) {
    del(['./dist'], cb);
});

gulp.task('usemin', ['clean'], function() {
    return gulp.src('./src/*.html')
        .pipe(usemin({
            css: [minifyCss()],
            html: [minifyHtml({empty: true})],
            js: [uglify()]
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('compassBackgroundJs', ['clean'], function() {
    var manifest = require('./src/manifest.json');
    var scripts = manifest.background.scripts;

    scripts = scripts.map(function(u) {
        return './src/' + u;
    });

    return gulp.src(scripts)
        .pipe(concat('background.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('replace', ['compassBackgroundJs'], function() {
    return gulp.src('./src/manifest.json')
        .pipe(replace(/\"scripts\": \[([^\]]+)?/g, '\"scripts\":\[\"js/background.min.js\"'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('compress', ['clean'], function() {
    return merge(
        gulp.src('./src/img/**/*')
            .pipe(imagemin({optimizationLevel: 5}))
            .pipe(gulp.dest('./dist/img')),
        gulp.src('./src/css/fonts/*')
            .pipe(imagemin({optimizationLevel: 5}))
            .pipe(gulp.dest('./dist/css/fonts'))
    );
});

gulp.task('bump', ['replace'], function() {
    return merge(
        gulp.src('./package.json')
            .pipe(bump({type: bumpType}))
            .pipe(gulp.dest('./')),
        gulp.src('./src/manifest.json')
            .pipe(bump({type: bumpType}))
            .pipe(gulp.dest('./src/')),
        gulp.src('./dist/manifest.json')
            .pipe(bump({type: bumpType}))
            .pipe(gulp.dest('./dist/'))
    );
});

gulp.task('tag', ['bump'], function() {
    delete require.cache[path.resolve('./src/manifest.json')];
    version = 'v' + require('./src/manifest.json').version;
    git.tag(version, 'Tag ' + version, function(err) {
        if(err) throw err;
    });
});

gulp.task('add', ['tag'], function() {
    return gulp.src(['./package.json', './src/manifest.json'])
        .pipe(git.add());
});

gulp.task('commit'/*, ['add']*/, function() {
    return gulp.src('./*')
        .pipe(git.commit('Release test'));
});

gulp.task('push'/*, ['commit']*/, function() {
    git.push('origin', 'master', function (err) {
        if (err) throw err;
    });
});

gulp.task('dist', ['clean', 'usemin', 'compassBackgroundJs', 'replace', 'compress']);

gulp.task('release', ['dist'], function() {
    gulp.start(['bump', 'tag', 'add', 'commit', 'push']);
});

gulp.task('publish', ['dist', 'release']);
