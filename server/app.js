var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

function handler(req, res) {
    fs.readFile(__dirname + '/index.html',
    function (err, res) {
        if (err) {
            res.writeHead(500);
            return res.end('Fail to load html');
        }

        res.writeHead(200);
        res.end(data);
    });
}

// io.use((socket, next) => {
//     let handshake = socket.handshake;
// });

io.on('connect', function (socket) {
    let handshake = socket.id;
    let handshake2 = socket.rooms;
    console.log(handshake, handshake2);
    // 上线消息广播
    socket.on('online', (name) => {
        console.log('服务器接收到了emit事件')
        console.log(name + ' has connected!');
        socket.broadcast.emit('online', name);
    })
    // 加入特定房间
    // @param num type：number
    socket.on('join', function (num) {
        console.log(num);
        socket.join('room'+num, () => {
            let rooms = Object.keys(socket.rooms);
            console.log('room before chage', socket.rooms);
            console.log('rooms', rooms);
            console.log('查看是否为NUM1 房间');
        })
    });

    // 大厅消息发送 / 接收
    socket.on('Pubmsg_client', ( {name, msg} ) => {
        console.log(name, msg)
        let obj = {
            name: name,
            msg: msg
        }
        console.log(obj)
        socket.broadcast.emit('Pubmsg_serve', obj);
    })

    // 退出登录
    socket.on('quit_log', (cb) => {
        socket.disconnect(true);
        cb(err, res);
    })
});


app.listen(3000, () => {
    console.log('Our serve is running at 3000');
});