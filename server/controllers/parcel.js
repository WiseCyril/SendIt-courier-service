/* eslint-disable array-callback-return */
/* eslint-disable class-methods-use-this */
const db = require('../db/db.js');

class ParcelDelivery {
  static listAllParcelOrders(req, res) {
    res.status(200).json({
      success: 'true',
      message: 'Successfully retrieved all parcel orders',
      parcelData: db,
    });
  }

  static listSingleParcelOrder(req, res) {
    const parcelId = parseInt(req.params.parcelId, 10);
    const parcel = db.find(parcelData => parcelData.parcelId === parcelId);

    if (parcel) {
      return res.status(200).json({
        success: 'true',
        message: 'parcel order successfully retrieved',
        parcel,
      });
    }
    return res.status(404).json({
      success: 'false',
      message: 'parcel order does not exist',
    });
  }

  static listUsersParcel(req, res) {
    const userId = parseInt(req.params.userId, 10);
    const parcel = db.filter(parcelData => parcelData.userId === userId);

    if (parcel) {
      return res.status(200).json({
        success: 'true',
        message: 'users parcels successfully retrieved',
        parcel,
      });
    }
    return res.status(404).json({
      success: 'false',
      message: 'users does not exist',
    });
  }

  static createParcelOrder(req, res) {
    const parcelData = {
      parcelId: db.length + 1,
      userId: req.body.userId,
      weight: req.body.weight,
      receiver_name: req.body.receiver_name,
      presentLocation: req.body.presentLocation,
      destination: req.body.destination,
    };

    db.push(parcelData);
    return res.status(201).json({
      success: 'true',
      message: 'parcel order added successfully',
      parcelData,
    });
  }

  static cancelParcelOrder(req, res) {
    let theParcel;
    const parcelId = parseInt(req.params.parcelId, 10);

    db.forEach((parcel, index) => {
      if (parcel.parcelId === parcelId) {
        theParcel = parcel;
        db.splice(index, 1);
      }
    });
    if (theParcel) {
      return res.status(204).json({
        success: 'true',
        message: 'Parcel order has been cancelled successfully',
      });
    } return res.status(404).json({
      success: 'false',
      message: 'parcel order not found',
    });
  }

  static updateParcelOrderDestination(req, res) {
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
        message: 'Only destination can be changed by user',
      });
    }

    const updateParcelOrderD = {
      parcelId: parcelOrder.parcelId,
      userId: parcelOrder.userId,
      weight: parcelOrder.weight,
      receiver_name: parcelOrder.receiver_name,
      presentLocation: parcelOrder.presentLocation,
      destination: req.body.destination,
    };

    db.splice(parcelIndex, 1, updateParcelOrderD);

    return res.status(200).json({
      success: 'true',
      message: 'Parcel order destination successfully changed',
      updateParcelOrderD,
    });
  }

  static updateParcelOrderStatus(req, res) {
    const parcelId = parseInt(req.params.parcelId, 10);
    let parcelOrder;
    let parcelIndex;

    db.map((parcelData, index) => {
      if (parcelData.parcelId === parcelId) {
        parcelOrder = parcelData;
        parcelIndex = index;
      }
    });

    if (!req.body.status) {
      return res.status(404).json({
        success: 'false',
        message: 'Admin can change password here',
      });
    }

    const updateParcelOrderStat = {
      status: parcelOrder.status,
      parcelId: parcelOrder.parcelId,
      userId: parcelOrder.userId,
      weight: parcelOrder.weight,
      receiver_name: parcelOrder.receiver_name,
      presentLocation: parcelOrder.presentLocation,
      destination: req.body.destination,
    };

    db.splice(parcelIndex, 1, updateParcelOrderStat);

    return res.status(200).json({
      success: 'true',
      message: 'Status can either be created, pending, delivered or cancelled',
      updateParcelOrderStat,
    });
  }

  static updateParcelOrderLocation(req, res) {
    const parcelId = parseInt(req.params.parcelId, 10);
    let parcelOrder;
    let parcelIndex;

    db.map((parcelData, index) => {
      if (parcelData.parcelId === parcelId) {
        parcelOrder = parcelData;
        parcelIndex = index;
      }
    });

    if (!req.body.presentLocation) {
      return res.status(404).json({
        success: 'false',
        message: 'Only Present Location can be changed by admin here',
      });
    }

    const updateParcelOrder = {
      parcelId: parcelOrder.parcelId,
      userId: parcelOrder.userId,
      weight: parcelOrder.weight,
      receiver_name: parcelOrder.receiver_name,
      presentLocation: req.body.presentLocation,
      destination: parcelOrder.destination,
    };

    db.splice(parcelIndex, 1, updateParcelOrder);

    return res.status(200).json({
      success: 'true',
      message: 'Parcel present location has been successfully changed',
      updateParcelOrder,
    });
  }
}

module.exports = ParcelDelivery;
