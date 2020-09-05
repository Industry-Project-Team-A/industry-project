const router = require('express').Router();
const { getProductSingle } = require('../database/productSingle');

router.get('/products/:sku', async (req, res) => {
    res.send(await getProductSingle());
});
    
    router.put('/products/:sku', async (apiRequest, apiResponse) => {
        const updatedProduct = apiRequest.body;
        console.log({
            updatedProduct
        })
        await updateProduct(apiRequest.params.sku, updatedProductSingle);
        apiResponse.send({
            message: 'ProductSingle updated.'
        });
        
module.exports = router;