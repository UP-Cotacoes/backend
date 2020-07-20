const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const cron = require('node-cron');
const app = express();

const { validateCnpjsJob } = require('./src/jobs/validateCnpjJob');

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb://localhost:27017/up",
    { useNewUrlParser: true,
      useUnifiedTopology: true }
  );

cron.schedule("* * * * *", validateCnpjsJob);

app.use('/api', require('./src/routes'));

app.listen(3000);