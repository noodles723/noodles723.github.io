// render stylus [file] -o [dir]
// file 默认是 "*.styl"
// dir 默认是 "css"
// -C 是先清空再生成
const path = require('path');
const BASE = process.cwd();
const STYLBASE = path.join(BASE, "_layout", "_stylus");
const del = require('del');
const gulp = require("gulp");
const stylus = require("gulp-stylus");

module.exports = function(argv) {
	var outDir = argv.o ? path.join(BASE, argv.o) : path.join(BASE, "css");
	var file = argv.file ? path.join(STYLBASE, argv.file) : path.join(STYLBASE, "*.styl");

	if(argv.C) {
		del(outDir).then(() => {
			gulp.src(file)
				.pipe(stylus({
					compress: true,
					'include css': true
				}))
				.pipe(gulp.dest(outDir));
		});
	} else {
		gulp.src(file).pipe(stylus({compress: true})).pipe(gulp.dest(outDir));
	}
};