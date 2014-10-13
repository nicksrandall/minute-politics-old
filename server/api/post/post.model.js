'use strict';

var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  mp4SD:  String,
  mp4HD:  String,
  webmSD:  String,
  webmHD:  String,
  poster: String,
  author: { type: Schema.Types.ObjectId, ref: 'User'},
  likers: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  date: { type: Date, default: Date.now },
  tags: [{
    text: String
  }],
  channels: [String],
  hidden: Boolean,
  likes: Number
});

PostSchema.methods.gravatar = function(size) {
  if (!size) size = 200;

  if (!this.author.email) {
    return 'https://gravatar.com/avatar/?s=' + size + '&d=retro';
  }

  var md5 = crypto.createHash('md5').update(this.author.email).digest('hex');
  return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
};

module.exports = mongoose.model('Post', PostSchema);
