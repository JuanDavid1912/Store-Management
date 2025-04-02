const {Bill} = require('../database/index');
const {Store} = require('../database/index');
const {Client} = require('../database/index');
const Joi = require('joi');


const validateRegister = Joi.object({
    id_store: Joi.number().integer().min(1).positive().required().messages({
        'number.base': 'The stock must be a number.',
        'number.positive': 'The stock must be a positive',
        'number.min': 'The stock must be higher than 0',
        'number.integer': 'The stock must be an integer.',
        'any.required': 'The stock is mandatory.'
    }),
    id_client: Joi.number.integer().min(1).positive().required().messages({
        'number.base': 'The stock must be a number.',
        'number.positive': 'The stock must be a positive',
        'number.min': 'The stock must be higher than 0',
        'number.integer': 'The stock must be an integer.',
        'any.required': 'The stock is mandatory.'
    })
  });


  const registerBill = async (req, res) => {
    try{
      const { error } = validateRegister.validate(req.body, { abortEarly: false });
  
      if (error) {
        const errorMessages = error.details.map(detail => detail.message).join('|');
        return res.status(400).json(
        {
            message: 'errors in the validation',
            result: {
              validationErrors: errorMessages
            }
        });

      }
      
      const {id_store, id_client} = req.body;
      const store = await Store.findByPk(id_store);
      if(!store){
        return res.status(400).json(
          {
              message: 'The store does not exist',
              result: null
          });
      }
      const client = await Client.findByPk(id_client);
      if(!client){
        return res.statu(400).json(
          {
            message: 'The client does not exist',
            result: null
          });
      }


      const newBill = await Bill.create({ id_store, id_client});
      res.status(201).json(
        { 
          message:'Bill created',
          result: {
            newBill,
            validationErrors: ''
          }
      });
    }
    catch(error){
        res.status(400).json({ message: error.message,result: null});
    }
  }
  
  const listBill = async (req, res) => {
    try {
      const { id_store, id_client} = req.params;
      const bills = await Bill.findAll({ where: { id_store, id_client }});
      if(!bills){
        res.status(400).json({ message: 'The client has no bills in that store', result: null });
      }
      res.status(200).json({ message: 'The bills from the client have been listed', result: bills });
    } catch (error) {
      res.status(500).json({ message: error.message, result: null });
    }
  };
  
  
  const deleteBill = async (req, res) => {
    try {
      const { id } = req.params;
      const bill = await Bill.findByPk(id);
      
      if (!bill) {
        return res.status(404).json({ message: 'The bill does not exist', result: null });
      }
      
      const deleteBill = await Bill.destroy(id);
      res.status(200).json({ message: 'The bill has been deleted', result: deleteBill });
    } catch (error) {
      res.status(500).json({ message: error.message, result: null });
    }
  };
  
  module.exports = {
    registerBill,
    listBill,
    deleteBill
  };