const express = require('express');
const ParcelDelivery = require('../controllers/parcel');

const router = express.Router();

// get all parcel orders
router.get('/api/v1/parcels', ParcelDelivery.listAllParcelOrders);

// create a parcel order
router.post('/api/v1/parcels', ParcelDelivery.createParcelOrder);

// fetch a single parcel order
router.get('/api/v1/parcels/:parcelId', ParcelDelivery.listSingleParcelOrder);

// fetch all parcels orders by a specific user
router.get('/api/v1/users/:userId/parcels', ParcelDelivery.listUsersParcel);

// cancel a parcel delivery order
router.put('/api/v1/parcels/:parcelId/cancel', ParcelDelivery.cancelParcelOrder);

// update an order
router.put('/api/v1/parcels/:parcelId', ParcelDelivery.updateParcelOrder);

// router.use((req, res, next) => {
//   console.log('A request triggered 404');
//   next(err);
// });

// error handler
// router.use((err, req, res, next) => {
//   // eslint-disable-next-line no-console
//   console.log(err.message);
//   res.status(err.status || 500);
//   res.render('error');
//   next(err);
// });

module.exports = router;
