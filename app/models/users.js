//packages
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt=require('bcrypt-nodejs');

//user schema
var UserSchema = new Schema({
  name: String,
  username: {
    type:String,
    required: true,
    index:{
      unique:true
    }
  },
  password:{
    type:String,
    required:true,
    select: false //no trae la propiedad
  }
});

UserSchema.pre('save',function(next){
  var user = this;

//If password not changed
  if(!user.isModified('password')) return next();

//Generate the hash
  bcrypt.hash(user.password, null, null,function(err,hash){
    if(err) return next(err);
    //change password to the hashed version
    user.password = hash;
    next();
  })
});

UserSchema.methods.comparePassword = function(password){
  var user = this;
  return bcrypt.compareSync(password,user.password);
}

module.exports = mongoose.model('User',UserSchema);
