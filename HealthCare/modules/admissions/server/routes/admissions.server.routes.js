'use strict';

/**
 * Module dependencies
 */
var admissionsPolicy = require('../policies/admissions.server.policy'),
  admissions = require('../controllers/admissions.server.controller');

module.exports = function(app) {
  // Admissions Routes
  //app.route('/api/admissions').all(admissionsPolicy.isAllowed)
  app.route('/api/admissions')
    .get(admissions.list)
    .post(admissions.create);

  //app.route('/api/admissions/:admissionId').all(admissionsPolicy.isAllowed)
  app.route('/api/admissions/:admissionId')
    .get(admissions.read)
    .put(admissions.update)
    .delete(admissions.delete);

  // Finish by binding the Admission middleware
  app.param('admissionId', admissions.admissionByID);
};
