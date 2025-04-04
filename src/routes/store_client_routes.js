const express = require('express');
const router = express.Router();
const storeClientController = require('../controllers/store_clients_controller');

router.post('/register', storeClientController.registerClientInAStore);
router.get('/list/:id_store', storeClientController.listClientsinstores);
router.delete('/delete/:id_store/:id_client', storeClientController.deleteClientInAStore);

module.exports = router;
