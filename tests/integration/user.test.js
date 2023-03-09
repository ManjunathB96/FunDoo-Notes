import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
 import HttpStatus from 'http-status-codes'

import app from '../../src/index';

let token;
describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  describe('POST/newRegistration ', () => {
    it('Given valid user details it should return Created', (done) => {
      const userDetails = {
        "firstName": "Manjunath",
        "lastName": "Belagavi",
        "email": "bbelagavi6@gmail.com",
        "password": "Belagavi@111",
        "confirm_password":"Belagavi@111"
      };
      request(app)
        .post('/api/v1/user')
        .send(userDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });
  });

  describe('POST/login',  () => {

    it('given valid User Login details it should return 200', (done) => {
      const userDetails = {
        "email": "bbelagavi6@gmail.com",
        "password": "Belagavi@111"
      }
      request(app)
        .post('/api/v1/user/login')
        .send(userDetails)
        .end((err, res) => {
          token = res.body.data
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });

  });

  var id;
  describe('POST/newNote', () => {
    const noteDetails={
      "title":"My first note",
      "description":"Hello Manjunath",
    }
    it('Given note details should return created', (done) => {
      request(app)
        .post('/api/v1/notes')
        .set('Authorization', `Bearer ${token}`)
        .send(noteDetails)
        .end((err, res) => {
          id = res.body.data._id;
         expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
      });
    });

});
















