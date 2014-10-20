'use strict';

var _ = require('lodash');
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
  likes: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
});

PostSchema.methods = {
  incrShares: function () {
      this.shares += 1;
      this.save();
  },
  incrLikes: function (user) {
    console.log(this.likers, user._id.toString());
    console.log(_.contains(this.likers, user._id.toString()))
    if (!_.contains(this.likers.map(function (item) { return item.toString(); }), user._id.toString())) {
      this.likers.push(user);
      this.likes += 1;
      this.save();
      return true;
    } else {
      return false;
    }
  },
  decrShares: function () {
    this.shares -= 1;
    this.save();
  },
  decrLikes: function () {
    this.likes -= 1;
    this.save();
  }
}

module.exports = mongoose.model('Post', PostSchema);
