const {Client} = require('../database/index');
const Joi = require('joi');

const validateRegister = Joi.object({
    id: Joi.number().min(100000).max(999999999999999).positive().required().messages({
        'number.base': 'The id must be a number.',
        'number.integer': 'The id must be an integer.',
        'number.min': 'The id should be a valid number.',
        'number.max': 'the id should be a valid number.',
        'any.required': 'The id is mandatory.'
    }),
    name: Joi.string().min(2).max(50).required().messages({
        'string.base': 'The name has to be a text.',
        'string.empty': 'The name is mandatory.',
        'string.min': 'The name must have at least {#limit}.',
        'string:max':'The name must have at least {#limit}.',
        'any.required': 'The name is mandatory.'
    }),
    email: Joi.string().email().min(2).max(50).required().messages({
        'string.base': 'The email has to be a text.',
        'string.empty': 'The email is mandatory.',
        'string.email': 'The email should be a valid one.',
        'string.min': 'The email must have at least {#limit}.',
        'string:max':'The email must have at least {#limit}.',
        'any.required': 'The address is mandatory.'
    }),
    //this min and max values are valid for Colombia, because all valid phone numbers start with 3
    phone: Joi.number().integer().min(300000000).max(399999999).required().messages({
        'number.base': 'The phone must be a number.',
        'number.integer': 'The phone must be an integer.',
        'number.min': 'The phone should have at least {#limit}.',
        'number.max': 'the phone cannot be greater than {#limit}.',
        'any.required': 'The phone is mandatory.'
    })
  });
  
  const registerClient = async (req, res) => {
    try {
      const { error } = validateRegister.validate(req.body, { abortEarly: false });
  
      if (error) {
        const errorMessages = error.details.map(detail => detail.message).join('|');
        return res.status(400).json(
        {
            message: 'errors in the validation',
            result: {
              id:'',
              name:'',
              email:'',
              phone:'',
              validationErrors: errorMessages
            }
        });
      }
  
      const { id, name, email, phone} = req.body;
      
      const clientExist = await Client.findByPk(id);
      
      if (clientExist) {
        return res.status(400).json(
        { 
          message: 'the client already exists',
          result: null 
        });
      }
  
      const newClient = await Client.create({ id, name, email, phone });
      res.status(201).json(
        { 
          message:'Client created',
          result: {
            id:newClient.id,
            name:newClient.name,
            email:newClient.email,
            phone:newClient.phone,
            validationErrors: ''
          }
      });
    } catch (error) {
      res.status(400).json({ message: error.message,result: null});
    }
  };
  
  const listClients = async (req, res) => {
    try {
      const clients = await Client.findAll();
      res.status(200).json({ message: 'Clients listed', result: clients });
    } catch (error) {
      res.status(500).json({ message: error.message, result: null });
    }
  };
  
  const updateClient = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, phone } = req.body;
      const client = await Client.findByPk(id);
      
      if (!client) {
        return res.status(404).json({ message: 'The client does not exist', result: null });
      }
      
      const newClient = await Client.update({ name, email, phone });
      res.status(200).json({ message: 'Client information updated', result: newClient });
    } catch (error) {
      res.status(500).json({ message: error.message, result: null });
    }
  };
  
  const deleteClient = async (req, res) => {
    try {
      const { id } = req.params;
      const client = await Client.findByPk(id);
      
      if (!client) {
        return res.status(404).json({ message: 'The client does not exist', result: null });
      }
      
      const deleteClient = await Client.destroy(id);
      res.status(200).json({ message: 'Client information deleted', result: deleteClient });
    } catch (error) {
      res.status(500).json({ message: error.message, result: null });
    }
  };
  
  module.exports = {
      registerClient,
      listClients,
      updateClient,
      deleteClient
  };
