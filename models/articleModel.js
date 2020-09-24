var mongoose = require('./db.js');
var schema=mongoose.Schema({
	tittle:String,
	context:String,
	user:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
	ctime:{type:Date,default:Date.now}
},{collection:'articles'})

var model=mongoose.model('articles',schema);

module.exports=model;