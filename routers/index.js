var reg = require('./reg');
var articleModel=require('../models/articleModel')
module.exports = function(app){
	app.get('/',function(req,res){
		res.locals.user=req.session.user;
		//每页的条数10
		//第几页 默认1
		//skip limit
		var page=req.query.page?parseInt(req.query.page):1;
		articleModel.find({}).populate('user','username avatar age sex').skip((page-1)*10).limit(10).exec(function(err,as){
//			console.log(as)
			articleModel.find({},function(err2,as2){
				res.render('home',{as:as,count:as2.length})//评论总条数
			})
		})
	})
	
	app.get('/search',function(req,res){
		res.locals.user=req.session.user;
		var page=req.query.page?parseInt(req.query.page):1;
		articleModel.find({tittle:new RegExp(req.query.keyword,'ig')}).populate('user','username avatar age sex').skip((page-1)*10).limit(10).exec(function(err,as){
//			console.log(as)
			articleModel.find({tittle:new RegExp(req.query.keyword,'ig')},function(err2,as2){
//				console.log(as)
				res.render('home2',{as:as,count:as2.length})//评论总条数
			})
		})
	})
		
	app.get('/myblog/:uid',function(req,res){
		var uid=req.params.uid;
		articleModel.find({user:uid}).populate('user','username avatar age sex').exec(function(err,as){
				res.render('myblog',{as:as})
		})
	})
	
//	app.get('/myinfo',function(req,res){
//		res.render('myinfo')
//	})
	
	app.use('/reg',reg);
	app.use('/login',require('./login'));
	app.use('/article',require('./article'))
}
