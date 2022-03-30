const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const app = express();

const routes = require('../routes/api');

// Have Node serve the files for built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log(process.env.MONGO_URI);
mongoose.connection.on('connected', () => {
  console.log('mongoose is connected');
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('tiny'));
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
