var express=require('express');
var router = express.Router();
var crypto =require('crypto');
var usersModel = require('../models/usersModel')
router.get('/',function(req,res){
	res.render('register')
})

router.post('/save',function(req,res){
	//console.log(req.body)
	try{
			
	if(req.body.username&&req.body.pw){
		var secret=crypto.createHmac('sha256','wanzi').update(req.body.pw).digest('hex');
		var user = new usersModel({
			username:req.body.username,
			password:secret,
			sex:req.body.sex?req.body.sex:'男',
			age:req.body.age?req.body.age:0
	})
	user.save(function(err){
			if(err){
				console.log(err);
				res.send('注册失败')
			}else{
				res.send('注册成功')
			}
		})
	}else{
		res.send('注册失败，缺少字段')
	}
	}catch(err){
		res.send('注册失败!!!')
	}

		
})
module.exports=router;