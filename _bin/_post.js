const path = require('path');
const BASE = process.cwd();
const POSTTPL = path.join(BASE, "_layout", "_pug", "post", "index.pug");
const gulp = require("gulp");
const pug = require("gulp-pug");
const del = require('del');
const fs = require("fs");
const glob = require("glob-all");
const shell = require('shelljs');

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
	post.url = "/posts/"+time[1]+"/"+post.title;
	post.createtime = post.createtime ? post.createtime.replace(/-/g, ".") : time[1]+"."+time[2];
	if(!post.description) {
		var moreIndex = post.__content.indexOf("<!-- more -->");
		post.description = moreIndex>0 ? post.__content.substr(0, moreIndex) : "";
	}
	post.cover = !post.cover ? "https://source.unsplash.com/600x180?sig="+Math.floor(Math.random()*1000) : post.cover;

	gulp.src(POSTTPL).pipe(pug({locals:{
		post: post,
		prev: prev,
		next: next
	}})).pipe(gulp.dest(outDir));

	return post;
};

// render page [file] -o [dir]
// 会自动更新list和homepage
module.exports = function(argv) {
	if(!argv.folder && !argv.A) {
		console.log("file cannot be empty! if you want to render all, add -A.");
		return;
	}

	var allFolders = glob.sync([
		path.join(BASE, "_posts", "*", "*"),
		"!"+path.join(BASE, "_posts", "**", ".*")
	]).sort();

	let render = (i, allFolders) => {
		var prev = i>0 ? allFolders[i-1].split("_posts/")[1].replace(/\d{2}\.\d{2}__/, "") : null;
		var next = i<allFolders.length-1 ? allFolders[i+1].split("_posts/")[1].replace(/\d{2}\.\d{2}__/, "") : null;
		var outDir = allFolders[i].replace("_posts", "posts").replace(/\d{2}\.\d{2}__/, "");
		return renderPostPage(allFolders[i], outDir, prev, next);
	};

	if(typeof(argv.folder) === "number") { // 渲染年
		var folders = allFolders.filter(f => f.match("_posts/"+argv.folder.toString()) );
		var firstIndex = allFolders.indexOf(folders[0]);

		del(path.join(BASE, "posts", argv.folder.toString())).then(()=>{
			for(var i=firstIndex; i<firstIndex+folders.length; i++) {
				render(i, allFolders);
			}

			// 渲染列表
			shell.exec("render list -A");
		});
	} else if(typeof(argv.folder) === "string") { // 渲染指定post
		var folder = allFolders.filter(f => f.indexOf(argv.folder)>0)[0];
		var i = allFolders.indexOf(folder);

		let p = Object.assign({}, render(i, allFolders));
		delete p.__content

		// 渲染列表
		let cacheFile = path.join(BASE, "_cacheList.json");
		if(fs.existsSync(cacheFile)) {
			let listJSON = JSON.parse(fs.readFileSync(cacheFile));
			listJSON.push(p);
			fs.writeFileSync(cacheFile, JSON.stringify(listJSON));
			shell.exec("render list");
		} else {
			shell.exec("render list -A");
		}

	} else if(typeof(argv.folder) === "undefined" && argv.A) { // 渲染全部
		del(path.join(BASE, "posts")).then(()=>{
			for(var i=0; i<allFolders.length; i++) {
				render(i, allFolders);
			}
			// 渲染列表
			shell.exec("render list -A");
		});
	}
};
