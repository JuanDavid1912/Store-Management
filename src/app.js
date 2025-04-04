require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const billRoutes = require('./routes/bill_routes');
const clientRoutes = require('./routes/client_routes');
const productRoutes = require('./routes/product_routes');
const purchaseClientRoutes = require('./routes/purchase_client_routes');
const storeClientRoutes = require('./routes/store_client_routes');
const storeRoutes = require('./routes/store_routes');

app.use(express.json());
app.use(cors());

app.use('/api/bill', billRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/product', productRoutes);
app.use('/api/pruchase_client', purchaseClientRoutes);
app.use('/api/store_client', storeClientRoutes);
app.use('/api/store', storeRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running in the port ${PORT}`);
});
