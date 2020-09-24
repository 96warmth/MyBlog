var express=require('express');
var router = express.Router();
var crypto =require('crypto');
var usersModel = require('../models/usersModel')
router.get('/',function(req,res){
	res.render('login')
})

router.post('/check',function(req,res){
	var username=req.body.username;
	var pw =req.body.pw;
	var secret=crypto.createHmac('sha256','wanzi').update(pw).digest('hex');
	usersModel.find({username:username,password:secret},function(err,us){
		if(err){
			res.send('登录失败')
		}else{
			if(us.length>0){
//				console.log(us[0])
				var uu= {
					_id:us[0]._id,
					username:us[0].username,
					sex:us[0].sex,
					age:us[0].age,
					avatar:us[0].avatar,
					ctime:us[0].ctime
				}//隐藏密码
				
				req.session.user=uu;
				res.locals.user=req.session.user;//把user写出去，ejs才可以读取
				res.redirect('/')
			}else{
				res.send('账户或密码错误')
			}
		}
	})
})
module.exports=router;