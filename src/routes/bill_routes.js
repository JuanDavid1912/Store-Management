const express = require('express');
const router = express.Router();
const billCrontroller = require('../controllers/bill_controller');

router.post('/register', billCrontroller.registerBill);
router.get('/list/:id_store/:id_client', billCrontroller.listBill);
router.delete('/delete/:id_bill', billCrontroller.deleteBill);

module.exports = router;

