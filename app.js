import 'babel-polyfill';

import express from 'express';
import bodyParser from 'body-parser';
import parcelRouter from './server/routes/parcel';
import userRouter from './server/routes/user';


const dotenv = require('dotenv');

dotenv.config();


// Set up the express app
const app = express();

app.get('/', (req, res) => {
  res.json('Welcome to sendit courier service');
});

// Parse incoming requests data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1', userRouter);
app.use('/api/v1/parcels', parcelRouter);

app.all('*', (req, res) => {
  res.json('Route not available at the moment');
});

// const PORT = process.env.PORT || 5400;

// app.listen(PORT, () => {
//   // eslint-disable-next-line no-console
//   console.log(`server running on port ${PORT}`);
// });

module.exports = app;
