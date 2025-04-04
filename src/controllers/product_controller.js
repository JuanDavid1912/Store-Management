const {Product} = require('../database/index');
const {Store} = require('../database/index'); // we need to check if the id that will be related with the product exist 

const Joi = require('joi');

//name price description stock id_store
const validateRegister = Joi.object({
    
    name: Joi.string().min(2).max(60).required().messages({
        'string.base': 'The name has to be a text.',
        'string.empty': 'The name is mandatory.',
        'string.min': 'The name must have at least {#limit}.',
        'string:max':'The name must have at least {#limit}.',
        'any.required': 'The name is mandatory.'
    }),
    price: Joi.number().integer().min(1).positive().required().messages({
        'number.integer': 'The price must be an integer number',
        'number.min': 'The price must be higher than {#limit}',
        'number.positive': 'The price must be positive',
        'any.required': 'The price is mandatory'
    }),
    description: Joi.string().max(255).required().messages({
        'string.base': 'The description has to be a text.',
        'string.empty': 'The description is mandatory.',
        'string:max':'The description must have at least {#limit}.',
        'any.required': 'The description is mandatory.'
    }),
    stock: Joi.number().integer().min(1).positive().required().messages({
        'number.base': 'The stock must be a number.',
        'number.positive': 'The stock must be a positive',
        'number.min': 'The stock must be higher than 0',
        'number.integer': 'The stock must be an integer.',
        'any.required': 'The stock is mandatory.'
    }),
    id_store: Joi.number().integer().required().messages({
        'number.integer': 'The store id must be an integer number',
        'number.positive': 'The store id must be positive',
        'any.required': 'The store id is mandatory'
    })
  });
  
  //name price description stock id_store
  const registerProduct = async (req, res) => {
    try {
      const { error } = validateRegister.validate(req.body, { abortEarly: false });
  
      if (error) {
        const errorMessages = error.details.map(detail => detail.message).join('|');
        return res.status(400).json(
        {
            message: 'errors in the validation',
            result: {
              id:'',
              price:'',
              description:'',
              stock:'',
              id_store:'',
              validationErrors: errorMessages
            }
        });
      }
    
      const { name, price, description, stock, id_store} = req.body;

      const store = await Store.findByPk(id_store);
      if(!store){
        return res.status(400).json(
            {
                message: 'The store id does not exist',
                result: null
            }
        )
      }

      const newProduct = await Product.create({ name, price, description, stock, id_store });
      res.status(201).json(
        { 
          message:'Product created',
          result: {
            id:newProduct.id,
            name:newProduct.name,
            price:newProduct.email,
            description:newProduct.phone,
            stock:newProduct.stock,
            id_store:newProduct.id_store,
            validationErrors: ''
          }
      });
    } catch (error) {
      res.status(400).json({ message: error.message, result: null});
    }
  };
  
  const listProducts = async (req, res) => {
    try {
      const { id_store } = req.params;
      const products = await Product.findAll({
        where: { id_store }
      });
      if(products.length === 0){
        return res.status(200).json({ message: 'No products found for this store', result: null });
      }
      res.status(200).json({ message: 'Products listed', result: products });
    } catch (error) {
      res.status(500).json({ message: error.message, result: null });
    }
  };
  
  const updateProduct = async (req, res) => {
    try {
      const { id_product } = req.params;
      const { name, price, description, stock, id_store } = req.body;
      const product = await Product.findByPk(id_product);
      
      if (!product) {
        return res.status(404).json({ message: 'The product does not exist', result: null });
      }

      const store = await Store.findByPk(id_store);
      if(!store){
        return res.status(404).json({ message: "The given store id does not exist", result:null})
      }

      const newProduct = await Product.update({ name, price, description, stock, id_store });
      res.status(200).json({ message: 'Product information updated', result: newProduct });
    } catch (error) {
      res.status(500).json({ message: error.message, result: null });
    }
  };
  
  const deleteProduct = async (req, res) => {
    try {
      const { id_product } = req.params;
      const product = await Product.findByPk(id_product);
      
      if (!product) {
        return res.status(404).json({ message: 'The product does not exist', result: null });
      }
      
      const deleteProduct = await Product.destroy(id);
      res.status(200).json({ message: 'Product information deleted', result: deleteProduct });
    } catch (error) {
      res.status(500).json({ message: error.message, result: null });
    }
  };
  
  module.exports = {
      registerProduct,
      listProducts,
      updateProduct,
      deleteProduct
  };