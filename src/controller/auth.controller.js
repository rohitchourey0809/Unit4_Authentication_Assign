


const User = require("../models/user.model")
// <------------token--------------->
const jwt = require("jsonwebtoken")
// <------------dotenv------------>
require("dotenv").config()
// <--------------token------------->

const newtoken = (user) =>{
  console.log(process.env.JWT_SECRET_KEY)
    return jwt.sign({user},process.env.JWT_SECRET_KEY)
    // return user_id + "xyz"
}


const register = async (req,res)=>{
try{
    let user = await User.findOne({email:req.body.email})
    if(user){
       return res.status(400).send({message:"Email id already Registered"}) 
    }
    //if new user create allow to register
     user = await User.create(req.body)

    // <-----token------>
    const token = newtoken(user)
    console.log(token)
    console.log(user)
    return res.status(200).send({user,token})
    // return res.status(400).send("Registered")

}catch(err){
 return res.status(200).send({message:err.message})
}
}





const login = async (req,res)=>{
try
{
    const user = await User.findOne({email: req.body.email})
    if(!user) {
      return res.status(400).send("Wrong Email or password")
    }
    // return res.status(200).send("Login")
    const match = user.checkPassword(req.body.password)

    if(!match){
     return res.status(400).send("Wrong Email or password")
    }
    

      const token = newtoken(user)
       console.log(token)
       console.log(user)
        return res.status(200).send({user,token})

   }catch(err){{
    return res.status(400).send({message:err.message})
   }
}
}


module.exports = {register,login}