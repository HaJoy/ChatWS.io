


exports.index = (app, models, generateAccessToken, authenticateToken, jwt, io) => {
    
    // GET routes
    app.get('/', async (req, res) => {
        const users = await models.user.find().sort({ _id: -1 });
        res.json(users);
    });

    // POST routes
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

    // PUT routes
    app.put('/updateUser/:id', authenticateToken, async (req, res) => {
        let userFound = await models.user.findById(req.params.id);
        userFound.name = req.body.name;
        userFound.email = req.body.email;

        const userUpdate = await userFound.save();
        res.json(userUpdate);
    });

    // DELETE routes
    app.delete('/userDelete', authenticateToken, async (req, res) => {
        const { email } = req.body;

        const result = await models.user.deleteOne({ email: email });

        if (result.deletedCount === 0) {
            return res.json({ message: 'Usuario no encontrado' });
        }

        res.json({ message: 'Usuario eliminado correctamente' });
        
    });


    // websockets
    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('chat message', (msg) => {
            console.log('Message: ', msg);
            io.emit('chat message', msg);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
};