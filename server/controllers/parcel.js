import db from '../db';

// const moment = require('moment');
// import "@babel/polyfill";

class ParcelDelivery {
  /**
   * List All Parcel orders
   * @param {object} req
   * @param {object} res
   * @returns {object} list of all parcel-orders array
   */
  static async listAllOrder(req, res) {
    const listAllQuery = 'SELECT * FROM parcels where user_id = $1';
    try {
      const { rows, rowCount } = await db.query(listAllQuery, [req.user.id]);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  /**
   * Get a single parcel orde
   * @param {object} req
   * @param {object} res
   * @returns {object} parcel object
   */
  static async getOrder(req, res) {
    const text = 'SELECT * FROM parcel WHERE id = $1 and parcel_id =$2';
    try {
      const { rows } = await db.query(text, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'parcel order not found' });
      }
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  /**
   * Get all parcel orders by a single user
   * @param {object} req
   * @param {object} res
   * @returns {object} parcel object
   */
  static async listMyOrders(req, res) {
    const text = 'SELECT * FROM users WHERE id = $1 and req.user.id =$2';
    try {
      const { rows } = await db.query(text, [req.params.parcel_id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'id not found' });
      }
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  /**
   * Create A Parcel Order
   * @param {object} req
   * @param {object} res
   * @returns {object} parcel order object
   */
  static async createOrder(req, res) {
    const createOrder = `INSERT INTO
    parcel(id, user_id, status, weight, receiver_name, presentLocation, destination, created_order_date)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    returning *`;
    
    const values = [
      req.body.parcel_id,
      req.user.id,
      req.body.status,
      req.body.weight,
      req.body.receiver_name,
      req.body.presentLocation,
      req.body.destination,
      req.body.created_order_date,
    ];

    try {
      const { rows } = await db.query(createOrder, values);
      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  /**
   * Cancel a parcel delivery order
   * @param {object} req
   * @param {object} res
   * @returns {void} return statuc code 204
   */
  static async cancelOrder(req, res) {
    const deleteQuery = 'DELETE FROM parcel WHERE id = $1 AND parcel_id=$2 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id, req.user.i]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'parcel order not found' });
      }
      return res.status(204).send({ message: 'parcel order has been cancelled' });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  /**
   * User can update parcel destination
   * @param {object} req
   * @param {object} res
   * @returns {object} updated destination
   */
  static async updateDestination(req, res) {
    const findOneOrder = 'SELECT * FROM parcel WHERE parcel_id=$1';
    const updateDestination = `UPDATE parcel
    SET status=$1, weight=$2, receiver_name=$3, presentLocation=$4,destination=$5 WHERE parcel_id=$6 returning *`;
    try {
      const { rows } = await db.query(findOneOrder, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'destination not found' });
      }
      const values = [
        req.body.parcel_id || rows[0].success,
        req.body.status || rows[0].status,
        req.body.parcel_id || rows[0].parcel_id,
        req.body.weight || rows[0].weight,
        req.body.receiver_name || rows[0].receiver_name,
        req.body.presentLocation || rows[0].presentLocationt,
        // req.body.destination || rows[0].destination,
        req.params.destination,
      ];
      const response = await db.query(updateDestination, values);
      return res.status(200).send(response.rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  }

  /**
   * Admin can update status
   * @param {object} req
   * @param {object} res
   * @returns {object} updated status
   */

  static async updateStatus(req, res) {
    const findOneOrder = 'SELECT * FROM parcel WHERE parcel_id=$1';
    const updatedStatus = `UPDATE parcel
    SET status=$1, weight=$2, receiver_name=$3, presentLocation=$4,destination=$5 WHERE parcel_id=$6 returning *`;
    try {
      const { rows } = await db.query(findOneOrder, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'status not found' });
      }
      const values = [
        req.body.parcel_id || rows[0].success,
        // req.body.status || rows[0].status,
        req.body.parcel_id || rows[0].parcel_id,
        req.body.weight || rows[0].weight,
        req.body.receiver_name || rows[0].receiver_name,
        req.body.presentLocation || rows[0].presentLocationt,
        req.body.destination || rows[0].destination,
        req.params.status,
      ];
      const response = await db.query(updatedStatus, values);
      return res.status(200).send(response.rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  }

  /**
   * User can update parcel location
   * @param {object} req
   * @param {object} res
   * @returns {object} updated location
   */
  static async updateLocation(req, res) {
    const findOneOrder = 'SELECT * FROM parcel WHERE parcel_id=$1';
    const updateLocation = `UPDATE parcel
    SET status=$1, weight=$2, receiver_name=$3, presentLocation=$4,destination=$5 WHERE parcel_id=$6 returning *`;
    try {
      const { rows } = await db.query(findOneOrder, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'reflection not found' });
      }
      const values = [
        req.body.parcel_id || rows[0].success,
        req.body.status || rows[0].status,
        req.body.parcel_id || rows[0].parcel_id,
        req.body.weight || rows[0].weight,
        req.body.receiver_name || rows[0].receiver_name,
        // req.body.presentLocation || rows[0].presentLocationt,
        req.body.destination || rows[0].destination,
        req.params.presentLocation,
      ];
      const response = await db.query(updateLocation, values);
      return res.status(200).send(response.rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  }
}

export default ParcelDelivery;
