const path = require('path');
const BASE = process.cwd();
const gulp = require("gulp");
const glob = require("glob-all");

// render page [file] -o [dir]
// 会自动更新list和homepage
module.exports = function(argv) {
	gulp.src(path.join(BASE, "list", "index.html")).pipe(gulp.dest(BASE));
};