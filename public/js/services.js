'use strict';

angular.module('qApp.services', []).
  factory('socket', function ($rootScope) {
    var socket = io.connect()
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {  
          var args = arguments
          $rootScope.$apply(function () {
            callback.apply(socket, args)
          })
        })
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args)
            }
          })
        })
      }
    }
  }).
  factory('audio', function($document) {
    var audio = $document[0].createElement('audio')
    return audio
  }).
  factory('soundcloud', function($q) {
    SC.initialize({
      client_id: 'fe2636dc68d32b9e068e3f50e121ced0'
    })
    var soundcloud = {
      get: function (query) {
        var deferred = $q.defer()
        SC.get('/tracks', { q: query, limit: 10 }, function (tracks) {
          deferred.resolve(tracks)
        })
        return deferred.promise
      }
    }
    return soundcloud
  }).  
  factory('player', function(audio, $rootScope) {
    var player = {
      client_id: 'fe2636dc68d32b9e068e3f50e121ced0',
      progress: 0,
      stream: function (stream_url) {
        console.log(stream_url)
        audio.src = stream_url + '?client_id=' + this.client_id
        audio.play()
      },
      play: function () {
        audio.play()
      },
      pause: function () {
        audio.pause()
      },
      currentTime: function () {
        return audio.currentTime
      },
      currentDuration: function () {
        return audio.duration
      }
    }
    audio.addEventListener('ended', function () {
      console.log(ended)
      scope.playing.cue(0)
    })
    audio.addEventListener('timeupdate', function () {
      $rootScope.$apply(function() {
        player.progress = player.currentTime() / player.currentDuration()
      })
    })
    return player
  })
