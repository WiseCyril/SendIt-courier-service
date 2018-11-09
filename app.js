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

//fetch a single parcel order
app.get('/api/v1/parcels/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);

	db.map((parcelData) => {
		if(parcelData.id === id) {
			return res.status(200).send({
				success: 'true',
				message: 'parcel order successfully retrieved',
				parcelData,
			});
		}
	});

	return res.status(404).send({
		success: 'false',
		message: 'parcel order does not exist',
	});
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});