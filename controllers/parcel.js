/* eslint-disable class-methods-use-this */
import db from '../db/db';

class ParcelDelivery {
	listAllParcelOrders(req, res) {
		res.status(200).send({
		  success: 'true',
		  message: 'Successfully retrieved all parcel orders',
		  parcelData: db
		});
	}

	listSingleParcelOrder(req, res){
		const parcelId = parseInt(req.params.parcelId, 10);

		db.map((parcelData) => {
			if(parcelData.parcelId === parcelId) {
				return res.status(200).send({
					success: 'true',
					message: 'parcel order successfully retrieved',
					parcelData
				});
			}
		});

		return res.status(404).send({
			success: 'false',
			message: 'parcel order does not exist',
		});
	}


	createParcelOrder(req, res) {
		if(!req.body.weight) {
			return res.status(400).send({
				success: 'false',
				message: 'weight is required'
			});
		} else if (!req.body.receiver_name) {
			return res.status(400).send({
				success: 'false',
				message: 'receiver\'s name is required'
			});
		} else if (!req.body.pickup) {
			return res.status(400).send({
				success: 'false',
				message: 'pickup location is required'
			});
		} else if (!req.body.destination) {
			return res.status(400).send({
				success: 'false',
				message: 'destination is required'
			});
		}
		const parcelData = {
			parcelId: db.length + 1,
			weight: req.body.weight,
			receiver_name: req.body.receiver_name,
			pickup: req.body.pickup,
			destination: req.body.destination
		};

		db.push(parcelData);
		return res.status(201).send({
			success: 'true',
	   		message: 'parcel order added successfully',
	   		parcelData
	   		});
	}

	cancelParcelOrder(req, res) {
		const parcelId = parseInt(req.params.parcelId, 10);

		db.map((parcelData, index) => {
			if(parcelData.parcelId === parcelId) {
				db.splice(index, 1);
				return res.status(200).send({
					success: 'true',
					message: 'Parcel order deleted successfully',
				});
			}
		});

		return res.status(404).send({
			success: 'false',
			message: 'parcel order not found',
		});
	}

	updateParcelOrder(req, res) {
		const parcelId = parseInt(req.params.parcelId, 10);
		let parcelOrder;
		let parcelIndex;

		db.map((parcelData, index) => {
			if (parcelData.parcelId === parcelId) {
				parcelOrder = parcelData;
				parcelIndex = index;
			}
		});

		// if (!parcelOrder) {
		// 	return res.status(404).send({
		// 		success: 'false',
		// 		message: 'Parcel order not found',
		// 	});
		// }

		if (!req.body.destination) {
			return res.status(404).send({
				success: 'false',
				message: 'Only destination can be change',
			});
		}

		const updateParcelOrder = {
			parcelId: parcelOrder.parcelId,
			weight: parcelOrder.weight,
			receiver_name: parcelOrder.receiver_name,
			pickup: parcelOrder.pickup,
			destination: req.body.destination,
		};

		db.splice(parcelIndex, 1, updateParcelOrder);

		return res.status(201).send({
			success: 'true',
			message: 'Parcel order destination successfully changed',
			updateParcelOrder,
		});
	}
}

const parcelDeliveryOrder = new ParcelDelivery();
export default parcelDeliveryOrder;