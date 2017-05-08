#!/usr/bin/env node
const yargs = require("yargs");

// 渲染html
var renderPage = require("./_page");
// 渲染相册及相册列表页
var renderAlbum = require("./_album");
// 渲染css
var renderStylus = require("./_stylus");
// 渲染post
var renderPost = require("./_post");
// 渲染post list
var renderList = require("./_list");
// 渲染网站主页
var renderHomepage = require("./_homepage");

yargs.usage('$0 <cmd> [args]')
	.help()
	.command('page [folder]', 'render default html page', {}, renderPage)
	.command("stylus [file]", "complie stylus to css", {}, renderStylus)
	.command("album [folder]", "render album html page", {}, renderAlbum)
	.command("post [folder]", "render post page", {}, renderPost)
	.command("list", "render post list page", {}, renderList)
	.command("homepage", "render index homepage", {}, renderHomepage)
	.argv;

