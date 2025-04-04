const express = require('express');
const router = express.Router();
const productController = require('../controllers/product_controller');

router.post('/register', productController.registerProduct);
router.get('/list/:id_store', productController.listProducts);
router.put('/update/:id_product', productController.updateProduct);
router.delete('/delete/:id_product', productController.deleteProduct);

module.exports = router;