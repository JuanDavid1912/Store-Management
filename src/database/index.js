require('dotenv').config();

const { Sequelize,DataTypes } = require('sequelize');

const defineBill = require('../models/bill_model');
const defineClient = require('../models/client_model');
const defineProduct = require('../models/product_model');
const definePurchaseClient = require('../models/purchase_client_model');
const defineStore = require('../models/store_model');
const defineStoreClients = require('../models/stores_clients_model');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
);

const Bill = defineBill(sequelize, DataTypes);
const Client = defineClient(sequelize, DataTypes);
const Product = defineProduct(sequelize, DataTypes);
const PurchaseClient = definePurchaseClient(sequelize, DataTypes);
const Store = defineStore(sequelize, DataTypes);
const StoreClients= defineStoreClients(sequelize, DataTypes);

sequelize.authenticate()
  .then(() => console.log('Conecting to the database.'))
  .catch(err => console.error('It was not possible to conect the database:', err));

sequelize.sync({ alter: true, force: false })
  .then(() => console.log('Sync done.'))
  .catch(err => console.error('Error error in the sync:', err));

module.exports = {
    Bill,
    Client,
    Product,
    PurchaseClient,
    Store,
    StoreClients,
    sequelize
};