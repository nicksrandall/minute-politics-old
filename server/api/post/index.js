'use strict';

var express = require('express');
var controller = require('./post.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

// Post Filters
router.get('/followed_by/:id', auth.isAuthenticated(), controller.followed_by);
router.get('/user/:id', auth.isAuthenticated(), controller.user);
router.get('/tag/:tagName', auth.isAuthenticated(), controller.tag);
router.get('/tags/:tag', auth.isAuthenticated(), controller.tags);

// Post Actions
router.post('/like/:id', auth.isAuthenticated(), controller.like);
router.post('/share/:id', auth.isAuthenticated(), controller.share);

module.exports = router;
