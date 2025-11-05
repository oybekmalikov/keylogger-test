const { Server } = require('socket.io');

function rtcSocketInit(server) {
	const io = new Server(server, {
		cors: { origin: '*', methods: ['GET', 'POST'] },
	});

	io.on('connection', socket => {
		console.log('New socket connected:', socket.id);

		socket.on('join-room', roomId => {
			socket.join(roomId);
			console.log(`${socket.id} joined room ${roomId}`);
			socket.to(roomId).emit('user-joined', socket.id);
		});

		socket.on('offer', ({ roomId, sdp }) => {
			socket.to(roomId).emit('offer', { sdp, from: socket.id });
		});

		socket.on('answer', ({ roomId, sdp }) => {
			socket.to(roomId).emit('answer', { sdp, from: socket.id });
		});

		socket.on('ice-candidate', ({ roomId, candidate }) => {
			socket.to(roomId).emit('ice-candidate', { candidate, from: socket.id });
		});

		socket.on('disconnect', () => {
			console.log(`Socket ${socket.id} disconnected`);
		});
	});

	return io;
}

module.exports = rtcSocketInit;
