'use strict';

var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  mp4SD:  String,
  mp4HD:  String,
  mobile:  String,
  webmSD:  String,
  webmHD:  String,
  poster: String,
  headline: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  likers: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  date: { type: Date, default: Date.now },
  tags: [{
    text: String
  }],
  channels: [String],
  hidden: { type: Boolean, default: false },
  likes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Post', PostSchema);
