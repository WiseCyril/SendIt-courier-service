/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
// const db = require('../db/db.js');

chai.should();
chai.use(chaiHttp);

describe('Get all parcel delivery orders', () => {
  it('should list ALL parcel orders GET', (done) => {
    chai.request(app)
      .get('/api/v1/parcels')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('Get a single parcel delivery order', () => {
  it('it allows users to get specific parcel orders GET', (done) => {
    const parcelVar = 1;

    chai.request(app)
      .get(`/api/v1/parcels/${parcelVar}`)
      .end((err, res) => {
        res.body.parcel.parcelId.should.equal(1);
        res.body.success.should.equal('true');
        done();
      });
  });
});

describe('Get parcel delivery by the userId', () => {
  it('it allows you to get parcel orders based on the userId GET', (done) => {
    const userData = 121;

    chai.request(app)
      .get(`/api/v1/users/:${userData}/parcels`)
      .end((err, res) => {
        // res.body.parcel[0].userId.should.equal(121);
        res.body.success.should.equal('true');
        done();
      });
  });
});

describe('create parcel delivery by the user POST', () => {
  it('it allows you to create parcel orders POST', (done) => {
    chai.request(app)
      .post('/api/v1/parcels/')
      .send({
        userId: 743,
        weight: '4kg',
        pickup: 'Niger street, Enugu',
        receiver_name: 'Abu Taylor',
        destination: 'Ibukun street, Osogbo',
      })
      .end((err, res) => {
        res.should.have.status(201);
        // eslint-disable-next-line no-unused-expressions
        // res.should.be.json;
        // res.body.parcel.userId.should.equal(743);
        res.body.success.should.equal('true');
        done();
      });
  });
});

describe('update parcel delivery by the user PUT', () => {
  it('it allows you to update parcel orders PUT', (done) => {
    chai.request(app)
      .get('/api/v1/parcels')
      .end((err, res) => {
        // const id = 2;
        chai.request(app)
          .put('/api/v1/parcels/2/')
          .send({
            // userId: 743,
            // weight: '4kg',
            // pickup: 'Niger street, Enugu',
            // receiver_name: 'Abu Taylor',
            destination: 'Ayotunde street, Osogbo',
          });
        res.should.have.status(200);
        // eslint-disable-next-line no-unused-expressions
        // res.should.be.json;
        res.body.should.be.a('object');
        // res.body.parcel.userId.should.equal(743);
        res.body.success.should.equal('true');
        // response.body.UPDATED.destination.should.equal('Spider');
        done();
      });
  });
});

describe('cancel parcel delivery by the user PUT', () => {
  it('it allows you to cancel parcel orders PUT', (done) => {
    chai.request(app)
      .get('/api/v1/parcels')
      .end((err, res) => {
        const parcelId = 1;
        chai.request(app)
          .put(`/api/v1/parcels/:${parcelId}/cancel`);
        res.should.have.status(200);
        res.body.should.be.a('object');
        // eslint-disable-next-line no-unused-expressions
        // res.should.be.json;
        res.body.success.should.equal('true');
        done();
      });
  });
});
