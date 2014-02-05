'use strict';

angular.module('qApp.controllers', []).
  controller('QCtrl', function ($scope, $rootScope, socket, player) {
    socket.emit('user:join')

    $scope.player = player;

    $rootScope.playing = {
      state: null,
      track: null,
      playPause: function () {
        if ($scope.playing.state == 'playing') {
          socket.emit('pause')
          player.pause()
          $scope.playing.state = 'paused'
        } else {
          socket.emit('play')
          player.play()
          $scope.playing.state = 'playing'
        }
      },
      cue: function (i) {
        var track = $scope.queue.tracks.splice(i, 1)[0]
        socket.emit('play:track', track)
        player.stream(track.stream_url)
        $scope.playing.track = track
        $scope.playing.state = 'playing'
      }
    }

    $scope.queue = {
      tracks: null,
      add: function (i) {
        var track = {
          title: $scope.search.results[i].title,
          stream_url: $scope.search.results[i].stream_url,
          duration: $scope.search.results[i].duration,
          art: $scope.search.results[i].artwork_url ? 
            $scope.search.results[i].artwork_url :
            $scope.search.results[i].user.avatar_url,
          waveform_url: $scope.search.results[i].waveform_url,
          favoritings_count: $scope.search.results[i].favoritings_count,
          playback_count: $scope.search.results[i].playback_count,
          username: $scope.search.results[i].user.username
        }
        if ($scope.queue.tracks) {
          $scope.queue.tracks.push(track)
        } else {
          $scope.queue.tracks = [track]
        }
      }
    }

    $scope.$watch('queue', function () {
      if ($scope.queue.tracks) {
        socket.emit('change:queue', $scope.queue.tracks, function (result) {
          console.log(result)
        })
      }
    }, true)

    $scope.search = {
      input: '',
      results: [],
      selected: 0
    }

    socket.on('user:join', function () {
      if ($scope.queue.tracks) {
        socket.emit('change:queue', $scope.queue.tracks, function (result) {
          console.log(result)
        })
      }
      if ($scope.playing.state) {
        socket.emit('play:state', {
          state: $scope.playing.state,
          track: $scope.playing.track
        }, function (result) {
          console.log(result)
        })
      }
    })

    socket.on('change:queue', function (data) {
      $scope.queue.tracks = data
    })

    socket.on('play:state', function (data) {
      $scope.playing.state = data.state
      $scope.playing.track = data.track
    })

    socket.on('play:track', function (track) {
      player.stream(track.stream_url)
      $scope.playing.track = track
      $scope.playing.state = 'playing'
    })

    socket.on('play', function () {
      $scope.playing.state = 'playing'
      player.play()
    })

    socket.on('pause', function () {
      $scope.playing.state = 'paused'
      player.pause()
    })

    var startTime = Date.now()
    socket.emit('ping')
    socket.on('pong', function () {
      console.log(Date.now() - startTime)
    })
  })
