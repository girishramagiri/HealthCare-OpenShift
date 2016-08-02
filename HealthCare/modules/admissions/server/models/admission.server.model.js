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
    required: 'Please fill Patient ID',
    trim: true
  },
  name: {
    type: String,
    default: '',
    required: 'Please fill Admission name',
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
