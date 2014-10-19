/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Post = require('../api/post/post.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

Post.find({}).remove(function() {
  Post.create({
    "_id": "543ea924e6fcd90000b5318c",
    "mp4SD": "https://d3yvfnmmtea7a.cloudfront.net/mp4SD/ogjheDOHRNy37t3RiZOy_ObamaCode.mp4.mp4",
    "mp4HD": "https://d3yvfnmmtea7a.cloudfront.net/mp4HD/ogjheDOHRNy37t3RiZOy_ObamaCode.mp4.mp4",
    "mobile": "https://d3yvfnmmtea7a.cloudfront.net/mobile/ogjheDOHRNy37t3RiZOy_ObamaCode.mp4.mp4",
    "webmSD": "https://d3yvfnmmtea7a.cloudfront.net/webmSD/ogjheDOHRNy37t3RiZOy_ObamaCode.mp4.webm",
    "webmHD": "https://d3yvfnmmtea7a.cloudfront.net/webmHD/ogjheDOHRNy37t3RiZOy_ObamaCode.mp4.webm",
    "author": "543ea474e6fcd90000b53188",
    "hidden": true,
    "headline": "We need more young people coding",
    "likes": 0,
    "channels": [],
    "tags": [
      {
        "text": "Computer-Science"
      },
      {
        "text": "Code"
      }
    ],
    "date": "2014-10-15T17:04:36.812Z",
    "likers": []
  }, {
    "_id": "543f029f63f2277846cec36b",
    "mp4SD": "https://d3yvfnmmtea7a.cloudfront.net/mp4SD/ZYvxmMrTSe6l5b94POZq_TooManyAmericans.mp4.mp4",
    "mp4HD": "https://d3yvfnmmtea7a.cloudfront.net/mp4HD/ZYvxmMrTSe6l5b94POZq_TooManyAmericans.mp4.mp4",
    "mobile": "https://d3yvfnmmtea7a.cloudfront.net/mobile/ZYvxmMrTSe6l5b94POZq_TooManyAmericans.mp4.mp4",
    "webmSD": "https://d3yvfnmmtea7a.cloudfront.net/webmSD/ZYvxmMrTSe6l5b94POZq_TooManyAmericans.mp4.webm",
    "webmHD": "https://d3yvfnmmtea7a.cloudfront.net/webmHD/ZYvxmMrTSe6l5b94POZq_TooManyAmericans.mp4.webm",
    "author": "543f018c63f2277846cec36a",
    "hidden": true,
    "likes": 0,
    "headline": "Let's Get People Off Welfare and into the Workforce",
    "channels": [],
    "tags": [
      {
          "text": "Middle-Class"
      },
      {
          "text": "Job-Creation"
      }
    ],
    "date": "2014-10-15T23:26:23.754Z",
    "likers": []
  }, function() {
    console.log('finished populating Posts');
  });
});

User.find({}).remove(function() {
  User.create({
    "_id": "543ea474e6fcd90000b53188",
    "area": "United States",
    "email": "barack@obama.com",
    "followers": [],
    "following": [
      "543ea474e6fcd90000b53188",
      "543f018c63f2277846cec36a"
    ],
    "gender": "male",
    "password": "obama",
    "likes": [],
    "location": "Washington DC",
    "name": "Barack Obama",
    "office": "President",
    "party": "Democrat",
    "picture": "zbDalycRfSjRiUeZkW2w_obamasq.jpeg",
    "posts": [
      "543ea924e6fcd90000b5318c"
    ],
    "provider": "local",
    "role": "admin",
    "website": "barackobama.com"
  },{
    "_id": "543f018c63f2277846cec36a",
    "area": "Massachusetts",
    "email": "mitt@romney.com",
    "followers": [],
    "following": [
      "543ea474e6fcd90000b53188",
      "543f018c63f2277846cec36a"
    ],
    "gender": "male",
    "password": "romney",
    "likes": [],
    "location": "Boston, MA",
    "name": "Mitt Romney",
    "office": "Governor",
    "party": "Republican",
    "picture": "QM5BmV7QTjOG7jIM90VB_mitt.jpeg",
    "posts": [
      "543f029f63f2277846cec36b"
    ],
    "provider": "local",
    "role": "admin",
    "website": "barackobama.com"
  },{
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin',
    following: []
  }, function() {
      console.log('finished populating users');
    }
  );
});
