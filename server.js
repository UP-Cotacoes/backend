const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());

mongoose.connect(
    "mongodb://localhost:27017/up",
    { useNewUrlParser: true,
      useUnifiedTopology: true }
  );

app.use('/api', require('./src/routes'));

app.listen(3000);