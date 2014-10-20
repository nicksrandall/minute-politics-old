'use strict';

angular.module('stumpIoApp')
  .factory('userAction', function ($http, User, $cookieStore, $q, growl, $state) {
    var currentUser = {};
    if($cookieStore.get('token')) {
      currentUser = User.get();
    }

    function followUser (person) {
      $http.get('/api/users/follow/' + person._id)
        .success(function() {
          growl.success('You are now following ' + person.name + '.');
        })
        .error(function() {
          growl.error('There was a problem.');
        });
    }

    // Public API here
    return {
      follow: function (person) {
        if(currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function() {
            followUser(person);
          }).catch(function() {
            followUser(person);
          });
        } else {
          followUser(person);
        }
      },
      getUser: function (id, cb) {
        $http.get('/api/users/' + id)
          .success(function(data) {
            cb(data);
          })
          .error(function() {
            growl.error('There was a problem.');
          });
      },
      goToProfile: function (id) {
        $state.go('profile', { id: id });
      },
      searchByName: function (name, cb) {
        $http.get('/api/users/name/' + name)
          .success(function(results) {
            results = results.map(function (item) {
              item.isFollowing = _.contains(currentUser.following, item._id);
              return item;
            });
          cb(results);
        });
      },
      like: function (post, cb) {
        if (!_.contains(post.likers, currentUser._id)) {
          $http.post('/api/posts/like/' + post._id);
          post.likes++;
          cb(true, post);
        } else {
          cb(false, post);
        }
      },
      share: function (id) {
        $http.post('/api/posts/share/' + id)
          .success(function(post) {
            console.log(post);
          });
      }
    };
  });
