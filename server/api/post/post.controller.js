'use strict';

var _ = require('lodash');
var Post = require('./post.model');
var User = require('../user/user.model');
var AWS = require('aws-sdk');

AWS.config.region = 'us-west-2';

// Get list of posts
exports.index = function(req, res) {
  Post.find()
    .populate('author', 'name party picture office area email')
    .sort('-date')
    .exec(function (err, posts) {
      if (err) return res.status(400).send('Error firding posts.');
      res.json(200, posts);
    });
};

// Get list of posts for a specific user
exports.followed_by = function(req, res) {
  User.findById(req.params.id, function (err, user) {
    if(err) { return handleError(res, err); }
    Post.find()
      .where('author').in( user.following )
      .populate('author', 'name party picture office area email')
      .sort('-date')
      .exec(function (err, posts) {
        if (err) return res.status(400).send('Error firding posts.');
        res.json(200, posts);
      });
  });
};

// Get list of posts for a specific user
exports.user = function(req, res) {
  Post.find()
    .where('author').equals(req.params.id)
    .populate('author', 'name party picture office area email')
    .sort('-date')
    .exec(function (err, posts) {
      if (err) return res.status(400).send('Error firding posts.');
      res.json(200, posts);
    });
};

// Get list of posts for a specific user
exports.tags = function(req, res) {
  var tag = req.params.tag;
  Post.find()
    .distinct('tags.text')
    .where({'tags.text': new RegExp(tag , 'i')})
    .exec(function (err, posts) {
      if (err) return res.status(400).send('Error firding posts.');
      res.json(200, posts);
    });
};

// Gets a unique list of tags.
exports.tag = function(req, res) {
  Post.find()
    .where('tags.text').equals(req.params.tagName)
    .populate('author', 'name party picture office area email')
    .sort('-date')
    .exec(function (err, posts) {
      if (err) return res.status(400).send('Error firding posts.');
      res.json(200, posts);
    });
};

// Get a single post
exports.show = function(req, res) {
  Post.findById(req.params.id, function (err, post) {
    if(err) { return handleError(res, err); }
    if(!post) { return res.send(404); }
    return res.json(200, post);
  });
};

exports.like = function(req, res) {
  Post.findById(req.params.id, function (err, post) {
    if(err) { return handleError(res, err); }
    if(!post) { return res.send(404); }
    var canLike = post.incrLikes(req.user);
    if (canLike) {
      res.json(200, post)
    } else {
      res.json(403, post);
    }
  });
};

exports.share = function(req, res) {
  Post.findById(req.params.id, function (err, post) {
    if(err) { return handleError(res, err); }
    if(!post) { return res.send(404); }
    post.incrLikes();
    res.json(200, post)
  });
};

// Creates a new post in the DB.
exports.create = function(req, res) {
  var post;
  var url = req.body.videoURL;
  transcodeVideo(url);
  post = new Post({
    mp4SD: '//videos.minutepolitics.com/mp4SD/' + url.replace(/ /g, '%2B') + '.mp4',
    mp4HD: '//videos.minutepolitics.com/mp4HD/' + url.replace(/ /g, '%2B') + '.mp4',
    mobile: '//videos.minutepolitics.com/mobile/' + url.replace(/ /g, '%2B') + '.mp4',
    webmSD: '//videos.minutepolitics.com/webmSD/' + url.replace(/ /g, '%2B') + '.webm',
    webmHD: '//videos.minutepolitics.com/webmHD/' + url.replace(/ /g, '%2B') + '.webm',
    author: req.user,
    poster: url.replace(/ /g, '%2B') + '-00001.png',
    headline: req.body.headline,
    tags: req.body.tags,
    hidden: true,
    likes: 0
  });

  User.findOne({
    _id: req.user._id
  }, function (err, user) {
    user.posts.push(post._id);
    user.save();
  });

  post.save(function (err) {
    if (err) {
      console.log(err)
    } else {
      return res.json(201, post);
    }
  });
};

// Updates an existing post in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Post.findById(req.params.id, function (err, post) {
    if (err) { return handleError(res, err); }
    if(!post) { return res.send(404); }
    var updated = _.merge(post, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, post);
    });
  });
};

// Deletes a post from the DB.
exports.destroy = function(req, res) {
  Post.findById(req.params.id, function (err, post) {
    if(err) { return handleError(res, err); }
    if(!post) { return res.send(404); }
    post.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

/**
 * Sets up an amazon transcoding job for given url
 * @param  {string} url url of video to transcode on S3
 */
function transcodeVideo(url) {
  var elastictranscoder = new AWS.ElasticTranscoder();
  var newUrl = url.replace(/ /g, '+');
  var params = {
    Input: { /* required */
      AspectRatio: 'auto',
      Container: 'auto',
      FrameRate: 'auto',
      Interlaced: 'auto',
      Key: url,
      Resolution: 'auto'
    },
    PipelineId: '1407091689058-oeztcu',
    Outputs: [{
        Key: 'mp4HD/' + newUrl + '.mp4',
        PresetId: '1351620000001-100070',
        Rotate: 'auto',
        Composition: [{
          TimeSpan: {
            Duration: '00:01:00.000',
            StartTime: '0'
          }
        }],
      }, {
        Key: 'mp4SD/' + newUrl + '.mp4',
        PresetId: '1351620000001-000020',
        Rotate: 'auto',
        Composition: [{
          TimeSpan: {
            Duration: '00:01:00.000',
            StartTime: '0'
          }
        }],
      }, {
        Key: 'mobile/' + newUrl + '.mp4',
        PresetId: '1351620000001-100020',
        ThumbnailPattern: newUrl + '-{count}',
        Rotate: 'auto',
        Composition: [{
          TimeSpan: {
            Duration: '00:01:00.000',
            StartTime: '0'
          }
        }],
      }, {
        Key: 'webmSD/' + newUrl + '.webm',
        PresetId: '1412651222522-9agsmf',
        Rotate: 'auto',
        Composition: [{
          TimeSpan: {
            Duration: '00:01:00.000',
            StartTime: '0'
          }
        }],
      }, {
        Key: 'webmHD/' + newUrl + '.webm',
        PresetId: '1412651133539-phi1xi',
        Rotate: 'auto',
        Composition: [{
          TimeSpan: {
            Duration: '00:01:00.000',
            StartTime: '0'
          }
        }]
    }]
  };

  elastictranscoder.createJob(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(data);
    } // successful response
  });
}
