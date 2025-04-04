const express = require('express');
const router = express.Router();
const purchaseClientController = require('../controllers/purchase_client_controller');

router.post('/register', purchaseClientController.registerPurchase);
router.get('/list/:id_client', purchaseClientController.listPurchasesOfAClient);
router.delete('/delete/:id_purchase/:id_client', purchaseClientController.deletePurchaseOfAClient);

module.exports = router;

