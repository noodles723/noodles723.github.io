const path = require('path');
const BASE = process.cwd();
const POSTTPL = path.join(BASE, "_layout", "_pug", "post", "index.pug");
const gulp = require("gulp");
const pug = require("gulp-pug");
const del = require('del');
const fs = require("fs");
const glob = require("glob-all");

const imagemin = require('imagemin');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminPngquant = require('imagemin-pngquant');

const frontMatter = require('yaml-front-matter');
var hljs = require('highlight.js');
var marked = require('marked').setOptions({
	highlight: function (code) {return hljs.highlightAuto(code).value;},
	smartypants: true
});

var compressImages = function(folder, outDir) {
	imagemin([path.join(folder, "*.{png,jpg,jpeg}")], outDir, {
		plugins: [
			imageminJpegRecompress(),
			imageminPngquant({quality: '30-50'})
		]
	})
};

var renderPostPage = function(folder, outDir, prev, next) {
	var mdFile = path.join(folder, "index.md");
	if(!fs.existsSync(mdFile)) {
		console.log("mdFile not exists");
		return;
	}
	compressImages(folder, outDir);

	var post = frontMatter.loadFront(mdFile);
	post.__content = marked(post.__content);
	post.title = post.title || path.basename(outDir);
	var time = folder.match(/(\d{4})[\\\/](\d{2}\.\d{2})__/);
	post.createtime = post.createtime ? post.createtime.replace(/-/g, ".") : time[1]+"."+time[2];
	if(!post.description) {
		var moreIndex = post.__content.indexOf("<!-- more -->");
		post.description = moreIndex>0 ? post.__content.substr(0, moreIndex) : "";
	}
	post.cover = !post.cover ? "https://source.unsplash.com/600x120" : post.cover;

	gulp.src(POSTTPL).pipe(pug({locals:{
		post: post,
		prev: prev,
		next: next
	}})).pipe(gulp.dest(outDir));
};

// render page [file] -o [dir]
// 会自动更新list和homepage
module.exports = function(argv) {
	if(!argv.folder && !argv.A) {
		console.log("file cannot be empty!");
		return;
	}

	argv.folder = String(argv.folder);
	if(argv.folder) { // 渲染一篇
		if(argv.folder.match(/^(\d){4}$/)) { // 渲染对应年份下的所有post
			var year = argv.folder.match(/^(\d){4}$/)[0];
			del(path.join(BASE, "posts", argv.folder)).then(()=>{
				var folders = glob.sync(path.join(BASE, "_posts", argv.folder, "*")).sort();
				for(var index=0; index < folders.length; index++) {
					var prev = index!=0 ? year+folders[index-1].split("__")[1] : null;
					var next = index!=folders.length-1 ? year+folders[index+1].split("__")[1] : null;
					var outDir = folders[index].replace("_posts", "posts").split(/\d{2}\.\d{2}__/).join("");
					renderPostPage(folders[index], outDir, prev, next);
				}
			});

			return;
		}

		var folders = glob.sync(path.join(BASE, "_posts", "*", "*")).sort();
		var folder = folders.filter((f) => f.indexOf(argv.folder)>0)[0];
		var index = folders.indexOf(folder);
		var prev = index!=0 ? path.basename(folders[index-1]).split(/\d{2}\.\d{2}__/).join("") : null;
		var next = index!=folders.length-1 ? path.basename(folders[index+1]).split(/\d{2}\.\d{2}__/).join("") : null;

		var outDir = folder.replace("_posts", "posts").split(/\d{2}\.\d{2}__/).join("");
		del(outDir).then(()=>{
			renderPostPage(folder, outDir, prev, next);
		})
	} else if(argv.A) { // 渲染全部
		del(path.join(BASE, "posts")).then(()=>{
			var folders = glob.sync(path.join(BASE, "_posts", "*", "*")).sort();
			for(var index=0; index < folders.length; index++) {
				var prev = index!=0 ? path.basename(folders[index-1]).split(/\d{2}\.\d{2}__/).join("") : null;
				var next = index!=folders.length-1 ? path.basename(folders[index+1]).split(/\d{2}\.\d{2}__/).join("") : null;
				var outDir = folders[index].replace("_posts", "posts").split(/\d{2}\.\d{2}__/).join("");
				renderPostPage(folders[index], outDir, prev, next);
			}
		});
	}
};