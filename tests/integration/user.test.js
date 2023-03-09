
import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import HttpStatus from 'http-status-codes';


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
        firstName: 'Manjunath',
        lastName: 'Belagavi',
        email: 'bbelagavi6@gmail.com',
        password: 'Belagavi@111',
        confirm_password: 'Belagavi@111'
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

  describe('POST/login', () => {
    it('given valid User Login details it should return 200', (done) => {
      const userDetails = {
        email: 'bbelagavi6@gmail.com',
        password: 'Belagavi@111'
      };
      request(app)
        .post('/api/v1/user/login')
        .send(userDetails)
        .end((err, res) => {
          token = res.body.userToken;
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });

  var id;
  describe('POST/notes', () => {
    const noteDetails = {
      title: 'My first note',
      description: 'Hello world!'
    };
    it('Given note details should return 201 and create a note', (done) => {
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

  describe('GET/notes', () => {
    it('get all notes it should return 200', (done) => {
      request(app)
        .get('/api/v1/notes')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
         done();
        });
    });
  });

  describe('GET/notes/:_id', () => {
    it('get single note using id should return 200', (done) => {
      request(app)
        .get(`/api/v1/notes/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });

  describe('PUT/notes/:_id', () => {
    const note = {
      title: 'My second note',
      description:"Hello Manjunath"
    };
    it('update the note', (done) => {
      request(app)
        .put(`/api/v1/notes/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(note)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
        done();
        });
    });
  });

  describe('PUT /note/:_id/addToArchive', () => {
    it('should return 200 and update the record', (done) => {
      request(app)
        .put(`/api/v1/notes/${id}/archive`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
          expect(res.body.data.archive).to.be.equal(true);
          done();
        });
    });
  });

  describe('PUT /note/:_id/removeFromArchive', () => {
    it('recover note from archive and it should return 200', (done) => {
      request(app)
        .get(`/api/v1/notes/${id}/archive/recover`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
          expect(res.body.data.archive).to.be.equal(false);
          done();
        });
    });
  });

  describe('PUT /notes/:_id/addToTrash', () => {
    it('Note is added to trash and it should return 200', (done) => {
      request(app)
        .put(`/api/v1/notes/${id}/trash`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
          expect(res.body.data.trash).to.be.equal(true);
          done();
        });
    });
  });

  describe('PUT /notes/:_id/removeFromTrash', () => {
    it('Note is removed from trash and  should return 200', (done) => {
      request(app)
        .get(`/api/v1/notes/${id}/trash/recover`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
          expect(res.body.data.trash).to.be.equal(false);
          done();
        });
    });
  });

 
  describe('PUT /notes/:_id/colorUpdate', () => {
    let colorObj = {
      color: 'black'
    };
    it('Update color it should return 200', (done) => {
      request(app)
        .put(`/api/v1/notes/${id}/color`)
        .set('Authorization', `Bearer ${token}`)
        .send(colorObj)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
          expect(res.body.data.color).to.be.equal(colorObj.color);
          done();
        });
    });
  });

  describe(`DELETE /note/:_id`, () => {
    it('Delete note from resource it should return 200', (done) => {
      request(app)
        .delete(`/api/v1/notes/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });
});
