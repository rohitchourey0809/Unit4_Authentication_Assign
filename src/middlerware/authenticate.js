require("dotenv").config()



const verifyToken = (token) =>{
    return new Promise((resove,reject) =>{
       if(err)
         var decoded = jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded) =>{
          if(err) return false;


          return resolve(decoded);
          })

    })
  
}



const authenticate  = async (req,res,next) =>{
    if(!req.headers.authorization)
    return res.status(400).send({message:"Authorization token is  not found"});

    if(!req.headers.authorization.startsWith("Bearer"))
    return res.status(400).send({message:"Authorization token is  not found"});

    const token = req.headers.authorization.split(" ")[1]

    // verifyToken(token)
    try{
        let decoded = await verifyToken(token)
    }
    catch(err)
    {
       console.log(err) 
       return res.status(400).send({message:"Authorization token is  not found"});
    }
    

    console.log("decoded goes belo4")
    console.log(decoded)
    next()

}


module.exports = authenticate;