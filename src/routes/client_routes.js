const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client_controller');

router.post('/register', clientController.registerClient);
router.get('/list', clientController.listClients);
router.put('/update/:id', clientController.updateClient);
router.delete('/delete/:id', clientController.deleteClient);

module.exports = router;


