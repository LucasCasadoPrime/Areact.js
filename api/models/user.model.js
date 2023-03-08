const mongoose = require('mongoose');
const Area = require('./area.model');

const userSchema = new mongoose.Schema({
  local: {
    email       : { type: String, require: true },
    password    : { type: String, require: true },
  },
  discord: {
    id            : { type: String },
    username      : { type: String },
    discriminator : { type: String },
    avatar        : { type: String },
    email         : { type: String },
    accesstoken   : { type: String },
    accesstokensecret : { type: String }
  },
  google: {
    name                : { type: String },
    email               : { type: String },
    accesstoken         : { type: String },
    accesstokensecret   : { type: String }
  },
  twitter: {
    id                  : { type: String },
    username            : { type: String },
    displayName         : { type: String },
    photos              : { type: String },
    email               : { type: String },
    accesstoken         : { type: String },
    accesstokensecret   : { type: String }
  },
  facebook: {
    id                  : { type: String },
    email               : { type: String },
    username            : { type: String },
    displayName         : { type: String },
    accesstoken         : { type: String },
    accesstokensecret   : { type: String }
  },
  github: {
    id                  : { type: String },
    username            : { type: String },
    email               : { type: String },
    accesstoken         : { type: String },
    accesstokensecret   : { type: String }
  },
  token: { type: String },
  workflows: [Area.schema]
});

userSchema.methods.deleteWorkflowById = function(id) {
  this.workflows = this.workflows.filter(workflow => workflow._id != id);
  return this.save();
}

const User = mongoose.model('User', userSchema);
module.exports = User;