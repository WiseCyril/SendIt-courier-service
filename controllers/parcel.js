import db from '../db/db';

class ParcelDelivery {
  listAllParcelOrders(req, res) {
    res.status(200).send({
      success: 'true',
      message: 'Successfully retrieved all parcel orders',
		  parcelData: db,
    });
  }

  listSingleParcelOrder (req, res) {
    let parcel
    const parcelId = parseInt(req.params.parcelId, 10);

    parcel = db.find((parcelData) => parcelData.parcelId === parcelId);

    if (parcel) {
      return res.status(200).send({
        success: 'true',
        message: 'parcel order successfully retrieved',
        parcel,
      });
    } else {
      return res.status(404).send({
        success: 'false',
        message: 'parcel order does not exist'
      });
    }
  }

  listUsersParcel (req, res) {
    let parcel;

    const userId = parseInt(req.params.userId, 10);

    parcel = db.filter((parcelData) => parcelData.userId === userId);

    if (parcel) {
      return res.status(200).send({
        success: 'true',
        message: 'users parcels successfully retrieved',
        parcel,
      });
    } else {
      return res.status(404).send({
        success: 'false',
        message: 'users does not exist'
      });
    }
  };

  createParcelOrder(req, res) {
    console.log(req.body)
    if (!req.body.weight) {
      return res.status(400).send({
        success: 'false',
        message: 'weight is required',
      });
    } if (!req.body.receiver_name) {
      return res.status(400).send({
        success: 'false',
        message: 'receiver\'s name is required',
      });
    } if (!req.body.pickup) {
      return res.status(400).send({
        success: 'false',
        message: 'pickup location is required',
      });
    } if (!req.body.destination) {
      return res.status(400).send({
        success: 'false',
        message: 'destination is required',
      });
    } if (!req.body.userId) {
      return res.status(400).send({
        success: 'false',
        message: 'userId is required',
      });
    }
    const parcelData = {
      parcelId: db.length + 1,
      userId: req.body.userId,
      weight: req.body.weight,
      receiver_name: req.body.receiver_name,
      pickup: req.body.pickup,
      destination: req.body.destination,
    };

    db.push(parcelData);
    return res.status(201).send({
      success: 'true',
      message: 'parcel order added successfully',
   		parcelData
    });
  }

  cancelParcelOrder(req, res) {
    let theParcel;
    const parcelId = parseInt(req.params.parcelId, 10);

    db.forEach((parcel, index) => {
      if (parcel.parcelId === parcelId) {
        theParcel = parcel
        db.splice(index, 1);
      }
    });

    if (theParcel) {
      return res.status(200).send({
        success: 'true',
        message: 'Parcel order deleted successfully',
      });      
    } else {
      return res.status(404).send({
        success: 'false',
        message: 'parcel order not found',
      });
    }
  }

  updateParcelOrder (req, res) {
    const parcelId = parseInt(req.params.parcelId, 10);
    let parcelOrder;
    let parcelIndex;

    db.map((parcelData, index) => {
      if (parcelData.parcelId === parcelId) {
        parcelOrder = parcelData;
        parcelIndex = index;
      }
    });

    if (!req.body.destination) {
      return res.status(404).send({
        success: 'false',
        message: 'Only destination can be change',
      });
    }

    const updateParcelOrder = {
      parcelId: parcelOrder.parcelId,
      userId: parcelOrder.userId,
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
