const koa = require('koa')
const app = new koa()

app.use(ctx => {
	// let html = render(fileName);
	// console.log(html);
  	ctx.body = "html";
});

app.listen(8080)
