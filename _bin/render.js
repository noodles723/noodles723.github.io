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

yargs
	.usage('$0 <cmd> [args]')
	.command('page [folder]', 'render default html page', {}, renderPage)
	.command("stylus [file]", "complie stylus to css", {}, renderStylus)
	.command("album [folder]", "render album html page", {}, renderAlbum)
	.command("post [file]", "render post page", {}, renderPost)
	.help()
	.argv