const  { Router } = require('express')
const { getAll, getBySku, create, deleteBySku } = require('../repository/productRepository')

const router = Router()

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

router.delete("/:sku", async(req,res)=>{
    const sku = req.params.sku
    const result = await deleteBySku(sku)
    if (result==1) return res.send('OK')
    res.status(404).send(`Product with sku ${sku} not found`)    
})

module.exports = router
