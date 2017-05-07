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

// 压缩所有照片及cover
var renderPhotos = function(folder, outDir) {
	// 将所有图片压缩
	imagemin([path.join(folder, "*.{jpg, jpeg}")], outDir, {
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

// 渲染相册页
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

// 渲染相册列表页
var renderAlbumListPage = function() {
	var base = path.join(BASE, "_photography");
	var years = glob.sync([
		path.join(base, "*"),
		"!"+path.join(base, ".*")
	]).sort().reverse();
	var albumObj = {};

	years.forEach(year => {
		var list = glob.sync([
			path.join(base, year, "*"),
			"!"+path.join(base, year, ".*")
		]).sort();
		if(list && list.length)
			albumObj[year] = list;
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

	var folders = glob.sync([
		path.join(BASE, "_photography", "*", "*"),
		"!"+path.join(BASE, "_photography", "**", ".*")
	]).sort();
	if(argv.folder) { // 渲染一个相册
		var folder = folders.filter(f => f.indexOf(argv.folder)>0)[0];
		var outDir = folder.replace("_photography", "photography");
		if(!fs.existsSync(folder)) {
			console.log("folder not exists");
			return
		}
		del(outDir).then(() => {
			renderPhotos(folder, outDir);
			renderPhotoPage(folder, outDir);
			renderAlbumListPage();
		});

	} else if(argv.A) { // 渲染所有相册

		del(path.join(BASE, "photography")).then(() => {
			folders.forEach(folder => {
				var outDir = folder.replace("_photography", "photography");
				renderPhotos(folder, outDir);
				renderPhotoPage(folder, outDir);
				renderAlbumListPage();
			})
		});
	}

};