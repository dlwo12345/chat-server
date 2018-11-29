const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);


let count = 1;
io.on('connection', function (socket) {
    const userId = "user" + count++;
    socket.emit('connection', {
        type: 'notice',
        event: 'connection',
        msg: userId + '님 환영합니다.',
        userId,
    })

    socket.broadcast.emit('userConnection', {
        type: 'notice',
        event: 'userConnection',
        msg: userId + ' 님이 입장했습니다.',
        userId,
    });

    socket.on('sendMessage', function (msg) {
        socket.broadcast.emit('sendMessage', { ...msg,
            event: 'sendMessage',
            type: 'message',
            userId,
        })
    });
});

http.listen(8008, function () {
    console.log('Example app listening on port 8008!');
});