'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Patient Schema
 */
var PatientSchema = new Schema({
  patientid: {
    type: String,
    default: '',
    required: 'Please fill Patient ID',
    trim: true
  },
  name: {
    type: String,
    default: '',
    required: 'Please fill Patient name',
    trim: true
  },
  age: {
    type: String,
    default: '',
    required: 'Please fill Patient age',
    trim: true
  },
  insuranceid: {
    type: String,
    default: '',
    required: 'Please fill Health Insurance ID',
    trim: true
  },
  address: {
    type: String,
    default: '',
    required: 'Please fill Patient address',
    trim: true
  },
  contactno: {
    type: String,
    default: '',
    required: 'Please fill Patient contact number',
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

mongoose.model('Patient', PatientSchema);
