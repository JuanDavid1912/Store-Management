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
    phone: Joi.number().integer().min(10).max(16).required().messages({
        'number.base': 'The phone must be a number.',
        'number.integer': 'The phone must be an integer.',
        'number.min': 'The phone should have at least {#limit}.',
        'number.max': 'the age cannot be greater than {#limit}.',
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
      
      const storeExist = await Store.findByPk(id);
      
      if (storeExist) {
        return res.status(400).json({ mensaje: 'the store already exists',resultado:null });
      }
  
      const newStore = await Store.create({ name,address,phone });
      res.status(201).json(
        { 
          mensaje:'Store created',
          resultado: {
            id:newStore.id,
            name:newStore.name,
            address:newStore.address,
            phone:newStore.phone,
            erroresValidacion: ''
          }
      });
    } catch (error) {
      res.status(400).json({ message: error.message,resultado:null});
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
  
  const actualizarUsuario = async (req, res) => {
    try {
      const { cedula } = req.params;
      const { email, nombre, edad } = req.body;
      const usuario = await Usuario.findByPk(cedula);
      
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado', resultado: null });
      }
      
      const nuevoUsuario = await Usuario.update({ email, nombre, edad });
      res.status(200).json({ mensaje: 'Usuario actualizado', resultado: nuevoUsuario });
    } catch (error) {
      res.status(500).json({ mensaje: error.message, resultado: null });
    }
  };
  
  const borrarUsuario = async (req, res) => {
    try {
      const { cedula } = req.params;
      const usuario = await Usuario.findByPk(cedula);
      
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado', resultado: null });
      }
      
      const borrarUsuario = await Usuario.destroy();
      res.status(200).json({ mensaje: 'Usuario eliminado', resultado: borrarUsuario });
    } catch (error) {
      res.status(500).json({ mensaje: error.message, resultado: null });
    }
  };
  
  module.exports = {
      registerStore,
      listStores,
      actualizarUsuario,
      borrarUsuario
  };
