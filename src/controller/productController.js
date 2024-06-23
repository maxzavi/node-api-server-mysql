const  { Router } = require('express')
const { getAll, getBySku, create } = require('../repository/productRepository')

const router = Router()
const products = [
    {
        sku:1,
        name:"Product 1",
        price: 190.3
    },
    {
        sku:2,
        name:"Product 2",
        price: 5.5
    },
]
router.get ("/", async (req,res)=>{
    const result = await getAll();
    res.send(result)
})

router.get ("/:sku", async (req,res)=>{
    const sku = req.params.sku
    const result =  await getBySku(sku)
    if (result)     return res.send(result)
    res.status(404).send(`Product with sku ${sku} not found`)
})

router.post("/", async (req,res)=>{
    const result =  await create(req.body)
    return res.send(result)
})

module.exports = router
