const http = require('http');
let ioPort = parseInt(process.env.IOPORT);
console.log(typeof ioPort);

exports.ioSocket = (app) => {
    const server = http.createServer(app);

    const Server = require("socket.io")(server, {
        cors: {
            origin: ["*", "localhost", "http://localhost", `http://localhost:${ioPort}`],
            methods: ["GET", "POST"]
        }
    }).listen(ioPort+1);

    return Server;
};