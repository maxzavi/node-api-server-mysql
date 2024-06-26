const express = require('express')
const router = require('./controller/productController')
const { getUser } = require('./repository/AuthRepository')
const app = express()
//Middlewares
app.use(express.json())

//Auth
app.use(async (req,res,next)=>{
    const result = await getUser(req.header("Authorization"))
    if(result.status!=200) return res.status(result.status).send(result.message)
    const client_access= result.message.resource_access.backendtest.roles

    const reader = client_access.find(rol=>rol=="reader")
    const writer = client_access.find(rol=>rol=="writer")
    
    if (req.method=="GET" && (reader || writer)) return next()
    if (req.method!="GET" && writer) return  next()
    return res.status(403).send('Forbidden')
})
//Routes
app.use("/product", router)

//Server
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Listen in port: ${port}`)
})