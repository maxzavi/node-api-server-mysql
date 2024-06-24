const express = require('express')
const router = require('./controller/productController')
const app = express()
//Middlewares
app.use(express.json())

//Routes
app.use("/product", router)

//Server
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Listen in port: ${port}`)
})