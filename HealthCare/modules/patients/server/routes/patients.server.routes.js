'use strict';

/**
 * Module dependencies
 */
var patientsPolicy = require('../policies/patients.server.policy'),
  patients = require('../controllers/patients.server.controller');

module.exports = function(app) {
  // Patients Routes
  //app.route('/api/patients').all(patientsPolicy.isAllowed)
  app.route('/api/patients')
    .get(patients.list)
    .post(patients.create);

  //app.route('/api/patients/:patientId').all(patientsPolicy.isAllowed)
  app.route('/api/patients/:patientId')
    .get(patients.read)
    .put(patients.update)
    .delete(patients.delete);

  // Finish by binding the Patient middleware
  app.param('patientId', patients.patientByID);
};
