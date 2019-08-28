const express = require('express');
const mongoose = require('mongoose');
const path = require('path');


const config = require('config');

const app = express();

app.use(express.json());
const db = config.get('mongoURL');


mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

//Routes 
app.use('/api/users', require('./routes/users'));
app.use('/api/product', require('./routes/product'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/customer', require('./routes/customer'));
app.use('/api/soldProduct', require('./routes/soldProduct'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));