#!/usr/bin/env node
const shell = require('shelljs');
const folder = process.argv[2]
const fs = require('fs')
const path = require("path")

var mdFile = path.join(folder, "index.md");
if(!fs.existsSync(mdFile)) {
	console.log(`${folder} not exists`);
	return;
}

var year = (new Date()).getFullYear();
var base = path.basename(folder);
var code = shell.exec(`mv ${folder} _posts/${year}/ && render post _posts/${year}/${base}`).code;
if(code === 0) {
	shell.exec(`render homepage`)
	console.log("publish complete!")
}