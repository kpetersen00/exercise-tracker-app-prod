const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

require('dotenv').config();

const PORT = process.env.PORT || 3001;

const app = express();

const routes = require('../routes/api');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log(process.env.MONGO_URI);
mongoose.connection.on('connected', () => {
  console.log('mongoose is connected');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('tiny'));
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
