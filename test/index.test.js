/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const db = require('../db/db.js');

chai.should();
chai.use(chaiHttp);

describe('/db', () => {
  it('should list ALL parcel orders on ../db/db GET', (done) => {
    chai.request('http://localhost:5000')
      .get('/api/v1/parcels')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
