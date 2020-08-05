const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const productsRoutes = require('./routes/products-routes');
const usersRoutes = require('./routes/users-routes');
const ordersroutes = require('./routes/orders-routes');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api/products", productsRoutes);
app.use("api/users", usersRoutes);
app.use("api/orders", ordersroutes);

app.use((error, req, res, next) => {
    console.log(error);
    res.json({ message: error.message || 'An unknown error occurred!' });
})

mongoose
  .connect(
    `mongodb+srv://KillianFrappartDev:3698dd2de@cluster0-qo3vu.gcp.mongodb.net/shop?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT || 5000, () => console.log("Server up and running !"));
  })
  .catch(err => {
    console.log(err);
  });
