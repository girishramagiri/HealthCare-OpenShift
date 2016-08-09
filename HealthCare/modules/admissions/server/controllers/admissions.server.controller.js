'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Admission = mongoose.model('Admission'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash'),
  http = require('http'),
  request = require('request');


exports.validateInsurance = function(req, res) {
  //http://insurancespring-healthcarespringservice.apps.infosys.openshift3roadshow.com/health-1.3.5.RELEASE/healthinsurance/17728488
  /* var options = {
    host: 'insurancespring-healthcarespringservice.apps.infosys.openshift3roadshow.com',
    port: 8080,
    path: '/health-1.3.5.RELEASE/healthinsurance/'+req.params.insuranceId,
    method: 'GET'
  };
  
  http.request(options, function(response){
    response.on('insurancePolicy',function(body){
      console.info('GET result:\n');
      process.stdout.write(body);
      console.info('\n\n GET call completed');		
    });
    response.on('end',function(body){
      console.log(body);
      res.jsonp(body);
    });
  }); */
  
  var id = req.params.insuranceId;
  var url = 'http://insurancespring-healthcarespringservice.apps.infosys.openshift3roadshow.com/health-1.3.5.RELEASE/healthinsurance/'+id;
  console.info('\n url: '+url);
  request(url, function (error, response, body) {
	if (!error && response.statusCode === 200) {
      console.info(body);
	  res.jsonp(body);
    }
  });
  //res.jsonp(req.params.insuranceId);
};  
  
/**
 * Create a Admission
 */
exports.create = function(req, res) {
  var admission = new Admission(req.body);
  admission.user = req.user;

  admission.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(admission);
    }
  });
};

/**
 * Show the current Admission
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var admission = req.admission ? req.admission.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  admission.isCurrentUserOwner = req.user && admission.user && admission.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(admission);
};

/**
 * Update a Admission
 */
exports.update = function(req, res) {
  var admission = req.admission ;

  admission = _.extend(admission , req.body);

  admission.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(admission);
    }
  });
};

/**
 * Delete an Admission
 */
exports.delete = function(req, res) {
  var admission = req.admission ;

  admission.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(admission);
    }
  });
};

/**
 * List of Admissions
 */
exports.list = function(req, res) { 
  Admission.find().sort('-created').populate('user', 'displayName').exec(function(err, admissions) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(admissions);
    }
  });
};

/**
 * Admission middleware
 */
exports.admissionByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Admission is invalid'
    });
  }

  Admission.findById(id).populate('user', 'displayName').exec(function (err, admission) {
    if (err) {
      return next(err);
    } else if (!admission) {
      return res.status(404).send({
        message: 'No Admission with that identifier has been found'
      });
    }
    req.admission = admission;
    next();
  });
};
