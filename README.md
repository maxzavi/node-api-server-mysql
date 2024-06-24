# APi with Node, using Express and MySQL

## Dependencies

- express: Api server
- nodemon: Development tool
- dotenv: .env file by environment variables
- mysql2: MySQL database connect

## Express
```js
const express = require('express')
const app = express()
//Midlewares
app.use(express.json())
//Routes
app.use("/product", router)
//Listen server
const port=3000;
app.listen(port, ()=>{
    console.log(`Listen in port: ${port}`)
})
```

By parse body json, midleware: app.use(express.json())

Controller, with use Router:

```js
const  { Router } = require('express')

const router = Router()

router.get("/", async (req,res)=>{
	 res.send({})
})
router.get ("/:sku", async (req,res)=>{
    const sku = req.params.sku
    const result =  await getBySku(sku)
    if (result)     return res.send(result)
    res.status(404).send(`Product with sku ${sku} not found`)
})
```

## dotenv

By use, set with require("dotenv").config() and read with process.env.ENV_NAME
```js
require("dotenv").config()
cons host=  process.env.DB_HOST
```

Define port in env:
```properties
PORT=3002
```
 In index.js:

 ```js
 //Server
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Listen in port: ${port}`)
})
 ```

## mysql2

Create pool with:

```js

const { createPool } = require("mysql2/promise")
require("dotenv").config()

const mysqlConfigConn = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
};
const mysqlPool = createPool(mysqlConfigConn)
module.exports = { mysqlPool }
```

IN repository:

```js
    const [result] = await mysqlPool.query('SELECT * FROM test.products')
	return result

    const [result] = await mysqlPool.query('SELECT * FROM test.products p where p.sku=?', sku)
    return result[0];

    await mysqlPool.query('insert into  test.products (sku, name, price) values (?,?,?)',
        [ product.sku, product.name, product.price])
} 

```

Error handling in controller:

```js
    try {
        const result =  await create(req.body)
        return res.send(result)            
    } catch (error) {
        console.log("Err:", error)
        res.status(500).send('Internal error!!!')                
    }
```

## Database

Create dataabase **test** and table **test.products**:

```sql
CREATE TABLE test.products (
	sku INT NULL,
	name varchar(100) NULL,
	price DOUBLE NULL
)
```