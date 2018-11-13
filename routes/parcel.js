import express from 'express';
import ParcelDelivery from '../controllers/parcel';

const router = express.Router();

// get all parcel orders
router.get('/api/v1/parcels', ParcelDelivery.listAllParcelOrders);

// create a parcel order
router.post('/api/v1/parcels', ParcelDelivery.createParcelOrder);

// fetch a single parcel order
router.get('/api/v1/parcels/:parcelId', ParcelDelivery.listSingleParcelOrder);

// fetch all parcels orders by a specific user
router.get('/api/v1/users/:userId/parcels', ParcelDelivery.listUsersParcel);

// delete or cancel a parcel delivery order
router.put('/api/v1/parcels/:parcelId/cancel', ParcelDelivery.cancelParcelOrder);

// update an order
router.patch('/api/v1/parcels/:parcelId', ParcelDelivery.updateParcelOrder);

export default router;
