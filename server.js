const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');

dotenv.config();

const users = require('./routes/users');
const requests = require('./routes/requests');

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => console.log('Connected to MongoDB')
);

const app = express();

app.use(express.json());
app.use(cors());

// Security middlewares
app.use(mongoSanitize());

app.use('/api/users', users);
app.use('/api/requests', requests);

const PORT = 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
