const { where } = require('sequelize');
const {ClientStore} = require('../database/index');
const {Client} = require('../database/index');
const {Store} = require('../database/index'); // we need to check if the ids related exist 

const Joi = require('joi');

const validateRegister = Joi.object({
    
    id_store: Joi.number().integer().min(1).positive().required().messages({
        'number.integer': 'The id must be an integer number',
        'number.min': 'The id must be higher than {#limit}',
        'number.positive': 'The id must be positive',
        'any.required': 'The id is mandatory'
    }),
    id_client: Joi.number().integer().min(1).positive().required().messages({
        'number.integer': 'The id must be an integer number',
        'number.min': 'The id must be higher than {#limit}',
        'number.positive': 'The id must be positive',
        'any.required': 'The id is mandatory'
    })
  });
  
  const registerClientInAStore = async (req, res) => {
    try {
      const {id_store} = req.params;
      const { error } = validateRegister.validate(req.body, { abortEarly: false });
      if (error) {
        const errorMessages = error.details.map(detail => detail.message).join('|');
        return res.status(400).json(
        {
            message: 'errors in the validation',
            result: {
              id_store:'',
              id_client:'',
              validationErrors: errorMessages
            }
        });
      }

      const store = Store.findByPk(id_store);
      if(!store){
        return res.status(200).json({ message: 'The store id does not exist', result: null });
      }
    
      const { id_client} = req.body;

      const client = await Client.findByPk(id_client);
      if(!client){
        return res.status(400).json(
            {
                message: 'The client id does not exist',
                result: null
            }
        )
      }

      const clientInAStore = await ClientStore.findOne({ where: { id_store, id_client }})
      if(clientInAStore){
        return res.status(400).json({message:'The client is already register in the store', result: null}
        )};

      const newClientInAStore = await ClientStore.create({id_store, id_client});
      res.status(201).json(
        { 
          message:'Client registered in ${store.name}.',
          result: {
            id:newClientInAStore.id,
            id_store:newClientInAStore.id_store,
            id_client:newClientInAStore.id_client,
            validationErrors: ''
          }
      });
    } catch (error) {
      res.status(400).json({ message: error.message, result: null});
    }
  };
  
  const listClientsinstores = async (req, res) => {
    try {
      const { id_store } = req.params;
      const clientsInAStore = await ClientStore.findAll({
        where: { id_store }
      });
      if(clientsInAStore.length === 0){
        return res.status(200).json({ message: 'No clients found for this store', result: null });
      }
      res.status(200).json({ message: 'Clients listed', result: products });
    } catch (error) {
      res.status(500).json({ message: error.message, result: null });
    }
  };
  
  const deleteClientInAStore = async (req, res) => {
    try {
      const { id_store, id_client } = req.params;
      const clientInAStore = await ClientStore.findOne({where:{ id_store, id_client }});

      if (!clientInAStore) {
        return res.status(404).json({ message: 'The client is not register in this store', result: null });
      }
      
      const deleteClient = await ClientStore.destroy({where:{ id_store, id_client }});
      res.status(200).json({ message: 'The client is no longer registered in this store', result: deleteClient });
    } catch (error) {
      res.status(500).json({ message: error.message, result: null });
    }
  };
  
  module.exports = {
      registerClientInAStore,
      listClientsinstores,
      deleteClientInAStore
  };