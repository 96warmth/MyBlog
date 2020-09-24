var express=require('express');
var router = express.Router();
var crypto =require('crypto');
var articleModel = require('../models/articleModel')
var commentModel = require('../models/commentModel')


router.post('/save',function(req,res){
	var a = new articleModel({
		tittle:req.body.tittle,
		context:req.body.context,
		user:req.body.aid
	})
	a.save(function(err){
		if(err){
			res.send('not ok')
		}else{
			res.send('okk')
		}
	})
})
//详情页面【展示】区：路由get方法跳转到对应文章id下的页面，根据req方法获取文章id,知道id号后可以渲染
//评论【展示】区：把前端存的评论数据字段,更新保存放在后端的commentModel，要渲染在前端的评论区域
router.get('/info/:aid',function(req,res){
	var aid = req.params.aid;
	articleModel.findById(aid).populate('user','username age sex avatar').exec(function(err,info){
	commentModel.find({article:aid}).populate('user','username age sex avatar').exec(function(err2,comm){
		res.render('info',{info:info,comm:comm})//info第一个是ejs,第二个是key，第三个是回调函数返回的值
//			console.log(info)
//			console.log(comm)
		})

	})
})
//留言【存储】区：在前台发表 评论的内容，并把data保存在数据库commentModel里面，跳转到savecomment页面，要用post方法，把评论的内容与文章和用户字段关联上
router.post('/savecomment',function(req,res){
	var c = new commentModel({
		comment:req.body.comment,
		article:req.body.aid,
		user:req.body.uid
	})
	c.save(function(err){
		if(err){
			res.send('评论失败')
		}else{
			res.send('评论成功')
		}
	})
})

module.exports=router;