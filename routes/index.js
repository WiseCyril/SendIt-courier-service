/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
// const util = require('util');
const ParcelDelivery = require('../controllers/index');

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

// Test for express-validator
// router.post('/api/v1/parcels', (request, response) => {
//   request.checkBody('req.body.userId', '"req.body.userId" is not in the right format').notEmpty().isInt();
//   request.checkBody('req.body.weight', '"req.body.weight" is not in the right format').notEmpty();
//   request.checkBody('req.body.pickup', '"req.body.pickup" is not in the right format').notEmpty();
//   request.checkBody('req.body.receiver_name', '"req.body.receiver_name" is not in the right format').notEmpty();
//   request.checkBody('req.body.destination', '"req.body.destination" is not in the right format').notEmpty();
//   request.getValidationResult().then((validationResult) => {
//     if (!validationResult.isEmpty()) {
//       response.json({
//         result: 'failed',
//         message: `Validation errors: : ${util.inspect(validationResult.array())}`,
//       });
//       return;
//     }
//     response.json({
//       result: 'Okay',
//       message: `Validate input successfully. Input params =  ${util.inspect(request.body.userId)}`,
//     });
//   });
// }, ParcelDelivery.createParcelOrder);

module.exports = router;
