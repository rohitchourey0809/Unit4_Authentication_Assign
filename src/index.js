const  express = require('express');
const connect = require('./config/db');
const usercontroller = require('./controller/user.controller')
const productcontroller = require('./controller/product.controller')
const {register,login} = require('./controller/auth.controller')


const app = express();
app.use(express.json())

app.use("/userlink",usercontroller)
app.post("/register",register)
app.post("/login",login)
app.use("/products",productcontroller)



app.listen(5000,async function(){
    try{
        console.log("Server Start")
        await connect()

    }
    catch(err){
        console.log(err.message)
    }
})