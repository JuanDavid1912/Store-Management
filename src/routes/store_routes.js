const express = require('express');
const router = express.Router();
const storeController = require('../controllers/store_controller');

router.post('/register', storeController.registerStore);
router.get('/list/', storeController.listStores);
router.put('/update/:id_store', storeController.updateStore);
router.delete('/delete/:id_store', storeController.deleteStore);

module.exports = router;
