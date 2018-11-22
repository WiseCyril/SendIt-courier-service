import Auth from '../middleware/Auth';
import ParcelDelivery from '../controllers/parcel';
import validateRequestPayload from '../middleware/validateRequestPayload';

const Joi = require('joi');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

const CreateParcelSchema = Joi.object({
  weight: Joi.number().positive().required(),
  presentLocation: Joi.string().required(),
  receiver_name: Joi.string().required(),
  destination: Joi.string().required(),
});

// get all parcel orders
router.get(
  '/',
  Auth.verifyToken,
  ParcelDelivery.listAllOrder,
);

// create a parcel order
router.post(
  '/',
  Auth.verifyToken,
  validateRequestPayload(CreateParcelSchema),
  ParcelDelivery.createOrder,
);

// fetch a single parcel order
router.get(
  '/:parcelId',
  Auth.verifyToken,
  ParcelDelivery.listOrder,
);

// fetch all parcels orders by a specific user
router.get(
  '/api/v1/users/:userId/parcels',
  Auth.verifyToken,
  ParcelDelivery.listMyOrders,
);

// cancel a parcel delivery order
router.put(
  '/:parcelId/cancel',
  Auth.verifyToken,
  ParcelDelivery.cancelOrder,
);

// user can update destination
router.put(
  '/:parcelId/destination',
  Auth.verifyToken,
  ParcelDelivery.updateDestination,
);

// admin can update status of an order
router.put(
  '/:parcelId/status',
  Auth.verifyToken,
  // validateRequestPayload(CreateParcelSchema),
  ParcelDelivery.updateStatus,
);

// admin can update the present Location of an order
router.put(
  '/:parcelId/presentLocation',
  Auth.verifyToken,
  validateRequestPayload(CreateParcelSchema),
  ParcelDelivery.updateLocation,
);

export default router;
