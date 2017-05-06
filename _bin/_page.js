const path = require('path');
const BASE = process.cwd();
const TPLBASE = path.join(BASE, "_layout", "_pug");
const gulp = require("gulp");
const pug = require("gulp-pug");
const del = require('del');

// render page [folder] -o [dir]
// -C 是先清空再生成
module.exports = function(argv) {
	if(!argv.folder) {
		console.log("folder cannot be empty!");
		return;
	}
	var file = path.join(TPLBASE, argv.folder, "index.pug");
	var outDir = argv.o ? path.join(BASE, argv.o) : path.join(BASE, argv.folder);

	if(argv.C) {
		del(outDir).then(() => {
			gulp.src(file).pipe(pug()).pipe(gulp.dest(outDir));
		});
	} else {
		gulp.src(file).pipe(pug()).pipe(gulp.dest(outDir));
	}

};