'use strict';

var gulp = require('gulp');
var del = require('del');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');

var conf = {
    paths: {
        'root': ''
    }
};
