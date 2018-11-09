import express from 'express';
import db from './db/db.js';

//import body-parser into app.js
import bodyParser from 'body-Parser';

// Set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// get all parcel orders
app.get('/api/v1/parcels', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'Successfully retrieved all parcel orders',
    parcelData: db
  })
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});