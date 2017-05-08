const path = require('path');
const BASE = process.cwd();
const LISTTPL = path.join(BASE, "_layout", "_pug", "list", "index.pug");
const gulp = require("gulp");
const pug = require("gulp-pug");
const del = require('del');
const fs = require("fs");
const glob = require("glob-all");

const frontMatter = require('yaml-front-matter');
const hljs = require('highlight.js');
const marked = require('marked').setOptions({
    highlight: function (code) {return hljs.highlightAuto(code).value;},
    smartypants: true
});

const cacheFile = path.join(BASE, "_cacheList.json");

let renderListPage = (list, renderAll) => {
	let postPerPage = 7;
	let totalPage = Math.ceil(list.length / postPerPage);
	let listPageFolders = glob.sync(path.join(BASE, "list", "*")).map(f => path.basename(f)).filter(f => f.match(/^\d+$/)).sort();

	let render = (list, i, postPerPage, totalPage, outDir) => {
		return gulp.src(LISTTPL).pipe(pug({locals:{
			postList: list.slice((i-1)*postPerPage, i*postPerPage).reverse(),
			prev: i === 1 ? null : "/list/"+(i-1),
			next: i === totalPage ? null : "/list/"+(i+1)
		}})).pipe(gulp.dest(outDir));
	};

	if(renderAll || !listPageFolders || Math.abs(totalPage-listPageFolders.length)>1) { // 渲染全部
		del(path.join(BASE, "list")).then(() => {
			for(let i=1;i<=totalPage;i++) {
				let outDir = path.join(BASE, "list", i.toString());
				render(list, i, postPerPage, totalPage, outDir)
			}
			render(list, totalPage, postPerPage, totalPage, path.join(BASE, "list"))
		})
	} else { // 渲染最新的
		del([
			path.join(BASE, "list", totalPage.toString()),
			path.join(BASE, "list", "index.html")
		]).then(() => {
			let outDir = path.join(BASE, "list", totalPage.toString());
			render(list, totalPage, postPerPage, totalPage, outDir)
				.pipe(gulp.dest(path.join(BASE, "list")));
		})
	}
};

let generateList = (folders) => {
    let list = [];
    folders.forEach(f => {
        let mdFile = path.join(f, "index.md");
        if(!fs.existsSync(mdFile)) return;

	    let post = frontMatter.loadFront(mdFile);
	    post.title = post.title || path.basename(f).replace(/\d{2}\.\d{2}__/, "");
	    let time = f.match(/(\d{4})[\\\/](\d{2}\.\d{2})__/);
	    post.url = "/posts/"+time[1]+"/"+post.title;
	    post.createtime = post.createtime ? post.createtime.replace(/-/g, ".") : time[1]+"."+time[2];
	    if(!post.description) {
		    var moreIndex = post.__content.indexOf("<!-- more -->");
		    post.description = moreIndex>0 ? marked(post.__content.substr(0, moreIndex)) : "";
	    }
	    post.cover = !post.cover ? "https://source.unsplash.com/600x180?sig="+folders.indexOf(f) : post.cover;

	    delete post.__content;
	    list.push(post);
    });

    fs.writeFileSync(cacheFile, JSON.stringify(list));
    return list;
};
// render list
// 更新list和homepage
module.exports = function(argv) {
    let folders = glob.sync([
        path.join(BASE, "_posts", "*", "*"),
	    "!"+path.join(BASE, "_posts", "**", ".*")
    ]).sort();
    let list = [];
    if(fs.existsSync(cacheFile) && !argv.A) {
        list = JSON.parse(fs.readFileSync(cacheFile));
        if(list.length !== folders.length) {
        	list = generateList(folders);
        }
    } else {
        list = generateList(folders);
    }

    renderListPage(list, argv.A);
};