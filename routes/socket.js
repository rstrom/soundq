module.exports = function (socket) {
  socket.on('change:queue', function (data) {
    socket.broadcast.emit ('change:queue', data)
  })

  socket.on('user:join', function () {
    socket.broadcast.emit('user:join')
  })

  socket.on('play:state', function (data) {
    socket.broadcast.emit('play:state', data)
  })

  socket.on('play:track', function (track) {
    socket.broadcast.emit('play:track', track)
  })

  socket.on('play', function () {
    socket.broadcast.emit('play')
  })

  socket.on('pause', function () {
    socket.broadcast.emit('pause')
  })

  socket.on('ping', function () {
    socket.emit('pong')
  })
}
