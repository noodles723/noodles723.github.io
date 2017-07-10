#!/usr/bin/env node
const folder = process.argv[2] || ""
const fs = require('fs')
const path = require('path')
var mdFile = path.join(folder, "index.md");
if(!fs.existsSync(mdFile)) {
	console.log("mdFile not exists");
	return;
}

var bs = require("browser-sync").create();
bs.watch(mdFile).on("change", bs.reload);
bs.init({
	port: 7000,
	ui: {port: 7001},
    proxy: "localhost:7230"
});

const koa = require('koa')
const app = new koa()
const serve = require('koa-static')

const frontMatter = require('yaml-front-matter');
const pug = require('pug');
const compiledFunction = pug.compileFile('./_layout/_pug/post/index.pug');
var hljs = require('highlight.js');
var marked = require('marked').setOptions({
	highlight: function (code) {return hljs.highlightAuto(code).value;},
	smartypants: true
});

var render = (mdFile) => {
	var post = frontMatter.loadFront(mdFile);
	post.__content = marked(post.__content);
	let tmp = path.basename(folder).split('_')
	post.title = tmp[1];
	post.url = "/";
	post.createtime = tmp[0];
	
	return compiledFunction({
	  	post: post
	})
}

app.use(serve(folder))
app.use(ctx => {
	let url = ctx.request.url
	if( url === '/') {
		let html = render(mdFile)
	  	ctx.body = html
	} else {
		let raw = fs.readFileSync(path.join(__dirname, '../', url))
		ctx.body = raw
	}
	
});

app.listen(7230)
