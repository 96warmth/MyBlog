var mongoose = require('./db.js');
var schema=mongoose.Schema({
	comment:String,
	article:{type:mongoose.Schema.Types.ObjectId,ref:'articles'},
	user:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
	ctime:{type:Date,default:Date.now}
},{collection:'comment'})

var model=mongoose.model('comment',schema);

module.exports=model;