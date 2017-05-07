#!/usr/bin/env node
const argv = require("yargs").argv;
const shell = require('shelljs');
const curl = require("curl");
const max = 255;

if(!argv.m) {
	let num = Math.floor(Math.random()*max)*1000;
	let url = "https://raw.githubusercontent.com/jackeyGao/chinese-poetry/master/json/poet.song."+num+".json";
	let json = curl.getJSON(url, {}, function(err, response, data){
		let n = Math.floor(Math.random()*1000);
		let poem = data[n];
		let p = Math.floor(Math.random()*poem.paragraphs.length);
		let message = poem.paragraphs[p]+" —— "+poem.author

	});
	console.log(json)
}

let code = shell.exec("git add . && git commit -m "+argv.m+" && git push origin master").code;
if(code !== 0) {
	shell.echo('Error: Git commit failed');
	shell.exit(1);
}