const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// model definition
const userSchema = new Schema({
  username: String,
  // about
  subjecttaught: String,
  enlevel: String,
  teachingexperience: String,
  currentsituation: String,

  // about
  excompany: String,
  exendDate1: Date,
  exendDate2: Date,
  exlocation: String,
  exsituation: String,
  exstartDate1: Date,
  exstartDate2: Date,
  extitle: String,

  // education
  eddegree: String,
  eddescription: String,
  edfieldofstudy: String,
  edschool: String,
  edstartDate1: String,
  edstartDate2: String,

  // description
  aboutme: String,
  aboutsubject: String,

  // price
  hourlyRate: Number,

  // availability
  availability: String,

  // certification
  certitle: String,
  cercontent: String,

  // done
  done: { type: String, default: 'none' }
});

// Create the model class
const ModelClass = mongoose.model('tutor', userSchema);

// Export the model
module.exports = ModelClass;
