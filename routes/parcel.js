import express from 'express';
import ParcelDelivery from '../controllers/parcel.js';

const router = express.Router();


// get all parcel orders
router.get('/api/v1/parcels', ParcelDelivery.listAllParcelOrders);

//create a parcel order
router.post('/api/v1/parcels', ParcelDelivery.createParcelOrder);
	
//fetch a single parcel order
router.get('/api/v1/parcels/:parcelId', ParcelDelivery.listSingleParcelOrder);
	
//delete or cancel a parcel delivery order
router.put('/api/v1/parcels/:parcelId/cancel', ParcelDelivery.cancelParcelOrder);

//update an order
router.patch('/api/v1/parcels/:parcelId', ParcelDelivery.updateParcelOrder);
	
export default router;