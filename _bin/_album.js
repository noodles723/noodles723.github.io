const path = require('path');
const BASE = process.cwd();
const TPLBASE = path.join(BASE, "_layout", "_pug", "photography");
const CDN = "http://cf.jare.io/?u=http://tianq.space";

const del = require('del');
const gulp = require("gulp");
const pug = require("gulp-pug");
const imagemin = require('imagemin');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const Jimp = require("jimp");
const glob = require("glob-all");
const fs = require("fs");

var renderPhotos = function(folder, outDir) {
	// 将所有图片压缩
	return imagemin([path.join(folder, "*.{jpg, jpeg}")], outDir, {
		plugins: [
			imageminJpegRecompress()
		]
	}).then(files => {
		// 将cover resize
		var cover = files.filter(f => path.basename(f.path, ".jpg") === "cover")[0];
		Jimp.read(cover.data, function (err, image) {
			if(err) {
				console.log(err);
				return;
			}
			image.resize(200, Jimp.AUTO).quality(60).write(cover.path);
		});
	})
};

var renderPhotoPage = function(folder, outDir) {
	var photoList = glob.sync([
		path.join(folder, "*.{jpg, jpeg}"),
		"!"+path.join(folder, "cover.{jpg, jpeg}")
	]).map(f => f.split("_photography/")[1]);

	gulp.src(path.join(TPLBASE, "album", "index.pug"))
		.pipe(pug({locals: {
			// cdn: CDN,
			photoList: photoList
		}}))
		.pipe(gulp.dest(outDir));

};

var renderAlbumListPage = function() {
	var base = path.join(BASE, "_photography");
	var years = fs.readdirSync(base);
	albumObj = {};
	years.forEach(year => {
		albumObj[year] = fs.readdirSync(path.join(base, year));
	});
	gulp.src(path.join(TPLBASE, "index.pug"))
		.pipe(pug({locals: {
			// cdn: CDN,
			albumObj: albumObj
		}}))
		.pipe(gulp.dest(path.join(BASE, "photography")));
};

// render album [folder]
// -A 是渲染全部
// -A 和 folder 同时存在时只渲染folder
module.exports = function(argv) {
	if(!argv.folder && !argv.A) {
		console.log("folder cannot be empty!");
		return;
	}

	if(argv.folder) { // 渲染一个相册
		var folder = path.join(BASE, "_photography", argv.folder);
		var year = path.dirname(argv.folder);
		var outDir = path.join(BASE, "photography", argv.folder);
		// del(outDir).then(() => {
		// 	renderPhotos(folder, outDir);
		// 	renderPhotoPage(folder, outDir);
			renderAlbumListPage();
		// });

	} else { // 渲染所有相册
		var folders = glob.sync([path.join(BASE, "_photography", "*", "*")]);
		del(path.join(BASE, "photography")).then(() => {
			folders.forEach(folder => {
				var outDir = folder.replace("_photography", "photography");
				renderPhotos(folder, outDir);
				renderPhotoPage(folder, outDir);
			})
		});
	}

};