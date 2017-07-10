#!/usr/bin/env node
const shell = require('shelljs');
const folder = process.argv[2]
const fs = require('fs')
var mdFile = path.join(folder, "index.md");
if(!fs.existsSync(folder)) {
	console.log(`${folder} not exists`);
	return;
}

var year = (new Date()).getFullYear();
console.log(year)
return
var code = shell.exec("git add . && git commit -m "+message+" && git push origin master").code;
if(code !== 0) {
	shell.echo('Error: Git commit failed');
	shell.exit(1);
}

// push -m "git commit的message"
// 没有 -m 的话，随便取句唐诗上传
if(!argv.m) {
	let num = Math.floor(Math.random()*max)*1000;
	let url = "https://raw.githubusercontent.com/jackeyGao/chinese-poetry/master/json/poet.song."+num+".json";
	curl.getJSON(url, {}, function(err, response, data){
		let n = Math.floor(Math.random()*1000);
		let poem = data[n];
		let p = Math.floor(Math.random()*poem.paragraphs.length);
		let message = poem.paragraphs[p]+"____by_"+poem.author;
		var code = shell.exec("git add . && git commit -m "+message+" && git push origin master").code;
		if(code !== 0) {
			shell.echo('Error: Git commit failed');
			shell.exit(1);
		}
	});
} else {
	var code = shell.exec("git add . && git commit -m "+argv.m+" && git push origin master").code;
	if(code !== 0) {
		shell.echo('Error: Git commit failed');
		shell.exit(1);
	}
}

