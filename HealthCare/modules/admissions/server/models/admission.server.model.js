'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Admission Schema
 */
var AdmissionSchema = new Schema({
  patientid: {
    type: String,
    default: '',    
    trim: true
  },
  patientname: {
    type: String,
    default: '',    
    trim: true
  },
  insuranceid: {
    type: String,
    default: '',    
    trim: true
  },
  admissioncomments: {
    type: String,
    default: '',
    required: 'Please fill Admission comments',    
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Admission', AdmissionSchema);
