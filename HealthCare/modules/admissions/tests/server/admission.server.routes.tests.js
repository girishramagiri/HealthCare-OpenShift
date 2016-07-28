'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Admission = mongoose.model('Admission'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, admission;

/**
 * Admission routes tests
 */
describe('Admission CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Admission
    user.save(function () {
      admission = {
        name: 'Admission name'
      };

      done();
    });
  });

  it('should be able to save a Admission if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Admission
        agent.post('/api/admissions')
          .send(admission)
          .expect(200)
          .end(function (admissionSaveErr, admissionSaveRes) {
            // Handle Admission save error
            if (admissionSaveErr) {
              return done(admissionSaveErr);
            }

            // Get a list of Admissions
            agent.get('/api/admissions')
              .end(function (admissionsGetErr, admissionsGetRes) {
                // Handle Admission save error
                if (admissionsGetErr) {
                  return done(admissionsGetErr);
                }

                // Get Admissions list
                var admissions = admissionsGetRes.body;

                // Set assertions
                (admissions[0].user._id).should.equal(userId);
                (admissions[0].name).should.match('Admission name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Admission if not logged in', function (done) {
    agent.post('/api/admissions')
      .send(admission)
      .expect(403)
      .end(function (admissionSaveErr, admissionSaveRes) {
        // Call the assertion callback
        done(admissionSaveErr);
      });
  });

  it('should not be able to save an Admission if no name is provided', function (done) {
    // Invalidate name field
    admission.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Admission
        agent.post('/api/admissions')
          .send(admission)
          .expect(400)
          .end(function (admissionSaveErr, admissionSaveRes) {
            // Set message assertion
            (admissionSaveRes.body.message).should.match('Please fill Admission name');

            // Handle Admission save error
            done(admissionSaveErr);
          });
      });
  });

  it('should be able to update an Admission if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Admission
        agent.post('/api/admissions')
          .send(admission)
          .expect(200)
          .end(function (admissionSaveErr, admissionSaveRes) {
            // Handle Admission save error
            if (admissionSaveErr) {
              return done(admissionSaveErr);
            }

            // Update Admission name
            admission.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Admission
            agent.put('/api/admissions/' + admissionSaveRes.body._id)
              .send(admission)
              .expect(200)
              .end(function (admissionUpdateErr, admissionUpdateRes) {
                // Handle Admission update error
                if (admissionUpdateErr) {
                  return done(admissionUpdateErr);
                }

                // Set assertions
                (admissionUpdateRes.body._id).should.equal(admissionSaveRes.body._id);
                (admissionUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Admissions if not signed in', function (done) {
    // Create new Admission model instance
    var admissionObj = new Admission(admission);

    // Save the admission
    admissionObj.save(function () {
      // Request Admissions
      request(app).get('/api/admissions')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Admission if not signed in', function (done) {
    // Create new Admission model instance
    var admissionObj = new Admission(admission);

    // Save the Admission
    admissionObj.save(function () {
      request(app).get('/api/admissions/' + admissionObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', admission.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Admission with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/admissions/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Admission is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Admission which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Admission
    request(app).get('/api/admissions/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Admission with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Admission if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Admission
        agent.post('/api/admissions')
          .send(admission)
          .expect(200)
          .end(function (admissionSaveErr, admissionSaveRes) {
            // Handle Admission save error
            if (admissionSaveErr) {
              return done(admissionSaveErr);
            }

            // Delete an existing Admission
            agent.delete('/api/admissions/' + admissionSaveRes.body._id)
              .send(admission)
              .expect(200)
              .end(function (admissionDeleteErr, admissionDeleteRes) {
                // Handle admission error error
                if (admissionDeleteErr) {
                  return done(admissionDeleteErr);
                }

                // Set assertions
                (admissionDeleteRes.body._id).should.equal(admissionSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Admission if not signed in', function (done) {
    // Set Admission user
    admission.user = user;

    // Create new Admission model instance
    var admissionObj = new Admission(admission);

    // Save the Admission
    admissionObj.save(function () {
      // Try deleting Admission
      request(app).delete('/api/admissions/' + admissionObj._id)
        .expect(403)
        .end(function (admissionDeleteErr, admissionDeleteRes) {
          // Set message assertion
          (admissionDeleteRes.body.message).should.match('User is not authorized');

          // Handle Admission error error
          done(admissionDeleteErr);
        });

    });
  });

  it('should be able to get a single Admission that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Admission
          agent.post('/api/admissions')
            .send(admission)
            .expect(200)
            .end(function (admissionSaveErr, admissionSaveRes) {
              // Handle Admission save error
              if (admissionSaveErr) {
                return done(admissionSaveErr);
              }

              // Set assertions on new Admission
              (admissionSaveRes.body.name).should.equal(admission.name);
              should.exist(admissionSaveRes.body.user);
              should.equal(admissionSaveRes.body.user._id, orphanId);

              // force the Admission to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Admission
                    agent.get('/api/admissions/' + admissionSaveRes.body._id)
                      .expect(200)
                      .end(function (admissionInfoErr, admissionInfoRes) {
                        // Handle Admission error
                        if (admissionInfoErr) {
                          return done(admissionInfoErr);
                        }

                        // Set assertions
                        (admissionInfoRes.body._id).should.equal(admissionSaveRes.body._id);
                        (admissionInfoRes.body.name).should.equal(admission.name);
                        should.equal(admissionInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Admission.remove().exec(done);
    });
  });
});
