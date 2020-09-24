var mongoose = require('./db.js');
var schema=mongoose.Schema({
	username:{type:String,unique:true},
	password:String,
	sex:String,
	age:Number,
	avatar:{type:String,default:'default.png'},
	ctime:{type:Date,default:Date.now}
},{collection:'users'})

var model=mongoose.model('users',schema);

module.exports=model;