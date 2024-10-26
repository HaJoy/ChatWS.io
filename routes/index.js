const { join } = require('node:path');

exports.index = (app, models, generateAccessToken, authenticateToken, jwt, io) => {
    
    // GET routes
    app.get('/', (req, res) => {
        res.sendFile(join(__dirname, '../public/index.html'));
    });




    // POST routes
    app.post('/user',authenticateToken, async (req, res) => {
        let user = req.body;
        let newUser = await models.user.create(user);
        res.json(newUser);
    });

    app.post('/register', async (req, res) => {
        // create user in db
        let user = req.body;
        let newUser = await models.user.create(user);

        // generate token for the user and adding it to user info
        let jwtsignature = await generateAccessToken({useremail: user.email}, jwt);
        
        // response
        res.json({
            "name" : user.name,
            "email" : user.email,
            "token" : jwtsignature
        });
    });


    // websockets
    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('hello', (msg) => {
            console.log(msg);
        });
    });
};