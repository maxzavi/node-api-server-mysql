const { mysqlPool } = require("../config/mysqlconn");

const getAll = async ()=>{
    const [result] = await mysqlPool.query('SELECT * FROM test.products')
    return result;
}

const getBySku = async (sku)=>{
    const [result] = await mysqlPool.query('SELECT * FROM test.products p where p.sku=?', sku)
    return result[0];
}

const create = async(product)=> {
    await mysqlPool.query('insert into  test.products (sku, name, price) values (?,?,?)',
        [ product.sku, product.name, product.price])
    return product;
} 

const deleteBySku = async(sku)=>{
    const [result]= await mysqlPool.query('delete from test.products where sku=?', sku)
    return result.affectedRows;
}
module.exports = {getAll,getBySku,create, deleteBySku}