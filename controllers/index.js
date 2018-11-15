/* eslint-disable array-callback-return */
/* eslint-disable class-methods-use-this */
const db = require('../db/db');

class ParcelDelivery {
  listAllParcelOrders(req, res) {
    res.status(200).json({
      success: 'true',
      message: 'You have successfully retrieved all parcel orders',
      parcelData: db,
    });
  }

  listSingleParcelOrder(req, res) {
    // let parcel;
    const parcelId = parseInt(req.params.parcelId, 10);

    const parcel = db.find(parcelData => parcelData.parcelId === parcelId);

    if (parcel) {
      return res.status(200).json({
        success: 'true',
        message: 'A parcel order has been successfully retrieved',
        parcel,
      });
    }
    return res.status(404).json({
      success: 'false',
      message: 'This parcel order does not exist',
    });
  }

  listUsersParcel(req, res) {
    // let parcel;

    const userId = parseInt(req.params.userId, 10);
    const parcel = db.filter(parcelData => parcelData.userId === userId);

    if (parcel) {
      return res.status(200).json({
        success: 'true',
        message: 'This user\'s parcel orders has been successfully retrieved',
        parcel,
      });
    }
    return res.status(404).json({
      success: 'false',
      message: 'This user does not exist',
    });
  }

  createParcelOrder(req, res) {
    if (!req.body.weight) {
      return res.status(400).json({
        success: 'false',
        message: 'The weight of item is required',
      });
    } if (!req.body.receiver_name) {
      return res.status(400).json({
        success: 'false',
        message: 'A receiver\'s name is required',
      });
    } if (!req.body.pickup) {
      return res.status(400).json({
        success: 'false',
        message: 'Your pickup location is required',
      });
    } if (!req.body.destination) {
      return res.status(400).json({
        success: 'false',
        message: 'Parcel destination is required',
      });
    } if (!req.body.userId) {
      return res.status(400).json({
        success: 'false',
        message: 'The User-Id is required',
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
    return res.status(200).json({
      success: 'true',
      message: 'A parcel order has been successfully created',
      parcelData,
    });
  }

  cancelParcelOrder(req, res) {
    let theParcel;
    const parcelId = parseInt(req.params.parcelId, 10);

    db.forEach((parcel, index) => {
      if (parcel.parcelId === parcelId) {
        theParcel = parcel;
        db.splice(index, 1);
      }
    });

    if (theParcel) {
      return res.status(200).json({
        success: 'true',
        message: 'This Parcel order has been successfully cancelled',
      });
    }
    return res.status(404).json({
      success: 'false',
      message: 'This parcel order was not found',
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

    if (!req.body.destination) {
      return res.status(404).json({
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

    return res.status(200).json({
      success: 'true',
      message: 'Parcel destination has been successfully updated',
      updateParcelOrder,
    });
  }
}

const parcelDeliveryOrder = new ParcelDelivery();
module.exports = parcelDeliveryOrder;
