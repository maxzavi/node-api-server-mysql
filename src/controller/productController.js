const  { Router } = require('express')
const { getAll, getBySku, create, deleteBySku } = require('../repository/productRepository')

const router = Router()

router.get ("/", async (req,res)=>{
    try {
        const result = await getAll();
        res.send(result)            
    } catch (error) {
        console.log("Err:", error)
        res.status(500).send('Internal error!!!')
    }
})

router.get ("/:sku", async (req,res)=>{
    const sku = req.params.sku
    try {
        const result =  await getBySku(sku)
        if (result)     return res.send(result)
        res.status(404).send(`Product with sku ${sku} not found`)            
    } catch (error) {
        console.log("Err:", error)
        res.status(500).send('Internal error!!!')        
    }
})

router.post("/", async (req,res)=>{
    try {
        const result =  await create(req.body)
        return res.send(result)            
    } catch (error) {
        console.log("Err:", error)
        res.status(500).send('Internal error!!!')                
    }
})

router.delete("/:sku", async(req,res)=>{
    const sku = req.params.sku
    try {
        const result = await deleteBySku(sku)
        if (result==1) return res.send('OK')
        res.status(404).send(`Product with sku ${sku} not found`)                
    } catch (error) {
        console.log("Err:", error)
        res.status(500).send('Internal error!!!')                        
    }
})

module.exports = router
