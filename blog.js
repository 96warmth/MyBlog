var express = require("express");
var path=require('path');
var bodyParser=require('body-parser')
var multer = require('multer')
var upload = multer({dest:'public/images/'})
var session=require('express-session');
var routers=require('./routers/')

var app =express();
var storage=multer.diskStorage({
	destination:function(req,file,cb){
		cb(null,'public/images')
	},
	filename:function(req,file,cb){
		var hz=file.originalname.split('.')
		hz[hz.length-1]
		cb(null,Date.now()+'.'+hz[hz.length-1])
	}
})
var upload = multer({storage:storage})
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({extended:true}))

app.use(session({
  resave: false, //添加 resave 选项
  saveUninitialized: true, //添加 saveUninitialized 选项
  secret: 'wanzi', // 建议使用 128 个字符的随机字符串
  cookie: { maxAge: 3600000 }
}));

app.use(function(req,res,next){
	res.locals.user=req.session.user;
	next();
})

routers(app);


app.listen(2021,function(){
	console.log('服务器启动了，在2021端口')
})