'use strict';

var gulp = require('gulp');
var merge = require('merge-stream');
var clean = require('clean');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
// var rev = require('gulp-rev');
var bump = require('gulp-bump');

var pkg = require('./package.json');
var manifest = require('./src/manifest.json');
var paths = {
    'root': '.',
    'src': './src',
    'dist': './dist'
};
// major, minor, patch, prerelease
// https://github.com/stevelacy/gulp-bump#version-example
var bumpType = 'patch';

gulp.task('clean', function() {
    // del(['<%= paths.dist %>'], cb);
    return gulp.src('<%= paths.dist %>/')
        .pipe(clean());
});

gulp.task('usemin', ['clean'], function() {
    return gulp.src('<%= paths.src %>/*.html')
        .pipe(usemin({
            css: [minifyCss()],
            html: [minifyHtml({empty: true})],
            js: [uglify()]
        }))
        .pipe(gulp.dest('<%= paths.dist %>/'));
});

gulp.task('compassBackgroundJs', function() {
    var scripts = manifest.background.scripts;

    scripts = scripts.map(function(u) {
        return 'src/' + u;
    });

    return gulp.src(scripts)
        .pipe(concat('background.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('<%= paths.dist %>/js/'));
});

gulp.task('replaceManifest', ['compassBackgroundJs'], function() {
    return gulp.src('<%= paths.src %>/manifest.json')
        .pipe(replace(/\"scripts\": \[([^\]]+)?/g, '\"scripts\":\[\"js/background.min.js\"'))
        .pipe(gulp.dest('<%= paths.dist %>/manifest.json'));
});

gulp.task('compress', function() {
    return merge(
        gulp.src('<%= paths.src %>/img/**/*')
            .pipe(imagemin({optimizationLevel: 5}))
            .pipe(gulp.dest('<%= paths.dist %>/img')),
        gulp.src('<%= paths.src %>/css/fonts/*')
            .pipe(imagemin({optimizationLevel: 5}))
            .pipe(gulp.dest('<%= paths.dist %>/css/fonts'))
    );
    // return gulp.src('<%= paths.src %>/img/**/*')
    //     .pipe(imagemin({optimizationLevel: 5}))
    //     .pipe(gulp.dest('<%= paths.dist %>/img'));
});

// gulp.task('compressFonts', function() {
//     return gulp.src('<%= paths.src %>/css/fonts/*')
//         .pipe(imagemin({optimizationLevel: 5}))
//         .pipe(gulp.dest('<%= paths.dist %>/css/fonts'));
// });

gulp.task('bump', ['replaceManifest'], function() {
    return merge(
        gulp.src('<%= paths.root %>/package.json')
            .pipe(bump({type: bumpType}))
            .pipe(gulp.dest('<%= paths.root %>/')),
        gulp.src('<%= paths.dist %>/manifest.json')
            .pipe(bump({type: bumpType}))
            .pipe(gulp.dest('<%= paths.dist %>/'))
    );
    // return gulp.src('<%= paths.root %>/package.json')
    //     .pipe(bump({type: bumpType}))
    //     .pipe(gulp.dest('<%= paths.root %>/'));
});

// gulp.task('bumpManifest', function() {
//     return gulp.src('<%= paths.dist %>/manifest.json')
//         .pipe(bump({type: bumpType}))
//         .pipe(gulp.dest('<%= paths.dist %>/'));
// });

gulp.task('dist', [
    'clean', 
    'usemin', 
    'compassBackgroundJs', 
    'replaceManifest',
    'compress',
    'bump'
]);
