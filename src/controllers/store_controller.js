const {Store} = require('../database/index');
const Joi = require('joi');

const validateRegister = Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
        'string.base': 'The name has to be a text.',
        'string.empty': 'The name is mandatory.',
        'string.min': 'The name must have at least {#limit}.',
        'string:max':'The name must have at least {#limit}.',
        'any.required': 'The name is mandatory.'
      }),
    address: Joi.string().min(2).max(50).required().messages({
        'string.base': 'The address has to be a text.',
        'string.empty': 'The address is mandatory.',
        'string.min': 'The address must have at least {#limit}.',
        'string:max':'The address must have at least {#limit}.',
        'any.required': 'The address is mandatory.'
      }),
      //this min and max values are valid for Colombia, because all valid phone numbers start with 3
    phone: Joi.number().min(300000000).max(399999999).required().messages({
        'number.base': 'The phone must be a number.',
        'number.integer': 'The phone must be an integer.',
        'number.min': 'The phone should be a valid number.',
        'number.max': 'the phone should be a valid number.',
        'any.required': 'The phone is mandatory.'
      })
  });
  
  const registerStore = async (req, res) => {
    try {
      const { error } = validateRegister.validate(req.body, { abortEarly: false });
  
      if (error) {
        const errorMessages = error.details.map(detail => detail.message).join('|');
        return res.status(400).json(
        {
            message: 'errors in the validation',
            result: {
              name:'',
              address:'',
              phone:'',
              validationErrors: errorMessages
            }
        });
      }
  
      const { name, address, phone} = req.body;
      //al ser autoincrementable esto no es necesario
      const storeExist = await Store.findByPk(id);
      
      if (storeExist) {
        return res.status(400).json(
        { 
          message: 'the store already exists',
          result: null 
        });
      }
  
      const newStore = await Store.create({ name, address, phone });
      res.status(201).json(
        { 
          message:'Store created',
          result: {
            id:newStore.id,
            name:newStore.name,
            address:newStore.address,
            phone:newStore.phone,
            validationErrors: ''
          }
      });
    } catch (error) {
      res.status(400).json({ message: error.message,result: null});
    }
  };
  
  const listStores = async (req, res) => {
    try {
      const stores = await Store.findAll();
      res.status(200).json({ message: 'Stores listed', result: stores });
    } catch (error) {
      res.status(500).json({ message: error.message, result: null });
    }
  };
  
  const updateStore = async (req, res) => {
    try {
      const { id_store } = req.params;
      const { name, address, phone } = req.body;
      const store = await Store.findByPk(id_store);
      
      if (!store) {
        return res.status(404).json({ message: 'The store does not exist', result: null });
      }
      
      const newStore = await Store.update({ name, address, phone });
      res.status(200).json({ message: 'Store updated', result: newStore });
    } catch (error) {
      res.status(500).json({ message: error.message, result: null });
    }
  };
  
  const deleteStore = async (req, res) => {
    try {
      const { id_store } = req.params;
      const store = await Store.findByPk(id_store);
      
      if (!store) {
        return res.status(404).json({ message: 'The store does not exist', result: null });
      }
      
      const deleteStore = await Store.destroy(id);
      res.status(200).json({ mensage: 'Store deleted', result: deleteStore });
    } catch (error) {
      res.status(500).json({ message: error.message, result: null });
    }
  };
  
  module.exports = {
      registerStore,
      listStores,
      updateStore,
      deleteStore
  };
