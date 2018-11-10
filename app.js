import express from 'express';
import db from './db/db.js';
import router from './routes/parcel.js';

//import body-parser into app.js
import bodyParser from 'body-Parser';

// Set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});