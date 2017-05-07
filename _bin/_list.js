const path = require('path');
const BASE = process.cwd();
const LISTTPL = path.join(BASE, "_layout", "_pug", "list", "index.pug");
const gulp = require("gulp");
const pug = require("gulp-pug");
const del = require('del');
const fs = require("fs");
const glob = require("glob-all");

const frontMatter = require('yaml-front-matter');
var hljs = require('highlight.js');
var marked = require('marked').setOptions({
    highlight: function (code) {return hljs.highlightAuto(code).value;},
    smartypants: true
});

var renderListPage = function(folder, outDir, prev, next) {

};

// render list
// 更新list和homepage
module.exports = function(argv) {
    if(!argv.folder && !argv.A) {
        console.log("file cannot be empty! if you want to render all, add -A.");
        return;
    }

    var folders = glob.sync(path.join(BASE, "_posts", "*", "*")).sort();

};