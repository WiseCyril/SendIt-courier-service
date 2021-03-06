const Joi = require('joi');
const express = require('express');
const ParcelDelivery = require('../controllers/parcel');
const validateRequestPayload = require('../middleware/validateRequestPayload');

const router = express.Router();
const CreateParcelSchema = Joi.object({
  userId: Joi.number().positive().integer().required(),
  weight: Joi.number().positive().required(),
  pickup: Joi.string().required(),
  receiver_name: Joi.string().required(),
  destination: Joi.string().required(),
});

// get all parcel orders
router.get('/api/v1/parcels', [
  ParcelDelivery.listAllParcelOrders,
]);

// create a parcel order
router.post('/api/v1/parcels', [
  validateRequestPayload(CreateParcelSchema),
  ParcelDelivery.createParcelOrder,
]);

// fetch a single parcel order
router.get('/api/v1/parcels/:parcelId', [
  ParcelDelivery.listSingleParcelOrder,
]);

// fetch all parcels orders by a specific user
router.get('/api/v1/users/:userId/parcels', [
  ParcelDelivery.listUsersParcel,
]);

// cancel a parcel delivery order
router.put('/api/v1/parcels/:parcelId/cancel', [
  ParcelDelivery.cancelParcelOrder,
]);

// update an order
router.put('/api/v1/parcels/:parcelId', [
  ParcelDelivery.updateParcelOrder,
]);

module.exports = router;
