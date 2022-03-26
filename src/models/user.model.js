const mongoose =require('mongoose')
const bcrypt = require('bcrypt') 


const userschema = new mongoose.Schema({
    name : {type:String ,required:true,},
    email :{type:String ,required:true,unique:true},
    password :{type:String ,required:true,}
   
},
{
    timestamps :true,
    versionKey : false,
})

userschema.pre("save",function(next){
    // console.log(this.password)
    // let modifiedpassword = this.password + "secreatpassword"
    // this.password = modifiedpassword;
    //  console.log(this.password)
    const hash = bcrypt.hashSync(this.password, 8);
    this.password = hash
console.log(this.password)
    return next();
})

userschema.methods.checkPassword = function(password){
   return bcrypt.compareSync(password,this.password)
}

const User = mongoose.model("user",userschema)

module.exports = User