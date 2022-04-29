


require("dotenv").config()
const jwt = require('jsonwebtoken')



const verifyToken = (token) =>{
    return new Promise((resolve,reject) =>{
       
       jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded) =>{
          if(err) return reject(err);


          return resolve(decoded);
          })

    })
  
}



const authenticate  = async (req,res,next) =>{

    if(!req.headers.authorization)
    return res.status(400).send({message:"1st Authorization token is  not found"});

    if(!req.headers.authorization.startsWith("Bearer"))
    return res.status(400).send({message:"2nd Authorization token is  not found"});

    const token = req.headers.authorization.trim().split(" ")[1]

    // verifyToken(token)
    let decoded;
    try{
         decoded = await verifyToken(token)
           console.log(decoded)
    }
    catch(err)
    {
    //    console.log(err) 
        return res.status(400).send({message : "34nd Authorization token not found or incorrect"})
    }
    

    console.log("decoded goes below4")
    console.log(decoded)
req.userID = decoded.user._id


      return next()

}


module.exports = authenticate;