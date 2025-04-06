
const Product = require('../database/index');
const PurchaseClient = require('../database/index');
const Bill = require('../database/index');
const Client = require('../database/index');
const Joi = require('joi');


//id_bill id_client id_product quantity total
const validateRegister = Joi.object({
    id_bill: Joi.number().positive().required().messages({
        'number.base': 'The id must be a number.',
        'number.integer': 'The id must be an integer.',
        'number.min': 'The id should be a valid number.',
        'number.max': 'the id should be a valid number.',
        'any.required': 'The id is mandatory.'
    }),
    id_client: Joi.number().positive().required().messages({
        'string.base': 'The name has to be a text.',
        'string.empty': 'The name is mandatory.',
        'string.min': 'The name must have at least {#limit}.',
        'string:max':'The name must have at least {#limit}.',
        'any.required': 'The name is mandatory.'
    }),
    id_product: Joi.number().positive().required().messages({
        'string.base': 'The email has to be a text.',
        'string.empty': 'The email is mandatory.',
        'string.email': 'The email should be a valid one.',
        'string.min': 'The email must have at least {#limit}.',
        'string:max':'The email must have at least {#limit}.',
        'any.required': 'The address is mandatory.'
    }),
    quantity: Joi.number().positive().required().messages({
        'number.base': 'The phone must be a number.',
        'number.integer': 'The phone must be an integer.',
        'number.min': 'The phone should have at least {#limit}.',
        'number.max': 'the age cannot be greater than {#limit}.',
        'any.required': 'The phone is mandatory.'
    }),
    total: Joi.number().positive().required().messages({
        'number.base': 'The phone must be a number.',
        'number.integer': 'The phone must be an integer.',
        'number.min': 'The phone should have at least {#limit}.',
        'number.max': 'the age cannot be greater than {#limit}.',
        'any.required': 'The phone is mandatory.'
    })
  });



 const registerPurchase = async (req, res) => {
    try {
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
    
      const {id_bill, id_client, id_product, quantity, total} = req.body;

      const bill = await Bill.findByPk(id_bill);
      if(!bill){
        return res.status(400).json(
            {
                message: 'The bill does not exist',
                result: null
            }
        );
      }

      const product = await Product.findByPk(id_product);
      if(!product){
        return res.status(400).json(
            {
                message: 'The product does not exist',
                result:null
            }
        );
      }
      const client = await Client.findByPk(id_client);
      if(!client){
        return res.status(400).json(
          {
              message: 'The client does not exist',
              result: null
          }
      );
      }

      const finalPrice = product.price * quantity;

      await Bill.increment('price', { by: finalPrice, where: { id: id_bill } });

      const newProductInBill = product.name;

      await Bill.update(
        { products: sequelize.literal(`CONCAT(COALESCE(products, ''), ', ', ${sequelize.escape(newProductInBill)})`) },
        { where: { id: id_bill } });

      const updatedBill = await Bill.findOne({ where: { id: id_bill }, attributes: ['total', 'products'] });
      
      const newPurchaseClient = await PurchaseClient.create({id_bill, id_client, id_product, quantity, total});
      res.status(201).json(
        { 
          message:'Product created and bill updated ',
          result: {
            purchase:{
                id:newPurchaseClient.id,
                id_bill:newPurchaseClient.id_bill,
                id_client:newPurchaseClient.id_client,
                id_product:newPurchaseClient.id_product,
                quantity:newPurchaseClient.quantity,
                total:newPurchaseClient.total
            },
            bill:{
                total: updatedBill.total,
                products: updatedBill.products
            },
            validationErrors: ''
          }
      });
    } catch (error) {
      res.status(400).json({ message: error.message, result: null});
    }
  };

  const listPurchasesOfAClient = async (req, res) =>{
      try{
        const {id_client}= req.params;

        const client = await Client.findByPk(id_client);
        if(!client){
          return res.status(400).json(
            {
                message: 'The bill does not exist',
                result: null
            }
        );
        }

        const purchases = await PurchaseClient.findAll({ where: { id_client: id_client }});
        if(purchases.length ===0 ){
          return res.status(400).json(
            {
                message: 'The client does not have any purchases',
                result: null
            }
        );
        }

        res.status(201).json(
          { 
            message:'The purchases of this client are: ',
            result: purchases
        });

      }
      catch(error){
        res.status(400).json({ message: error.message, result: null});
      }
  }

  const deletePurchaseOfAClient = async (req, res) => {
    try {

      const {id_purchase, id_client} = req.params

      const purchase = await PurchaseClient.findOne({ where: { id: id_purchase, id_client: id_client }});
        if(!purchase){
          return res.status(400).json(
            {
                message: 'The purchase does not exist or the client does not exist',
                result: null
            }
        );
        }

      const id_bill = purchase.id_bill;
      const priceLessInTheBill = purchase.total;

      await Bill.decrement('total', { by: priceLessInTheBill, where: { id: id_bill } });



      const updatedBill = await Bill.findOne({ where: { id: id_bill }, attributes: ['total']});
      
      const deletedPurchaseClient = await PurchaseClient.destroy(id_purchase);
      res.status(201).json(
        { 
          message:'The purchase was deleted.',
          result: {
            deletedPurchaseClient,
            bill:{
                total: updatedBill.total,
            },
            validationErrors: ''
          }
      });
    } catch (error) {
      res.status(400).json({ message: error.message, result: null});
    }
  };
  module.exports = {
    registerPurchase,
    listPurchasesOfAClient,
    deletePurchaseOfAClient,
  }