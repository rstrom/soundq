module.exports = function (socket) {
  socket.on('change:queue', function (data) {
    socket.broadcast.emit ('change:queue', data)
  })

  socket.on ('user:join', function () {
    socket.broadcast.emit('user:join')
  })

  socket.on ('play:track', function (track) {
    socket.emit('play:track', track)
  })

  socket.on ('play', function () {
    socket.emit('play')
  })

  socket.on ('pause', function () {
    socket.emit('pause')
  })

  socket.on ('ping', function () {
    socket.emit('pong')
  })
}
