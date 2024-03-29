const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const cors = require('cors');
const morgan = require('morgan');

const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
)

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use((err, req, res, next) => {
  console.error(err); 
  if(err.status === 400)
    return res.status(err.status).send('Dude, you messed up the JSON');

  return next(err);
});
app.use('/service',require('./routers/serviceRouter'))
app.use('/user',require('./routers/userRouter'))
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.listen(process.env.PORT,()=>console.log("Server is running at port "+process.env.PORT));
