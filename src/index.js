const express = require('express')
const router = require('./controller/productController')
const app = express()

app.use(express.json())
app.use("/product", router)
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Listen in port: ${port}`)
})