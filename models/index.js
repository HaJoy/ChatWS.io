


// db config
const mongoose = require('mongoose');
const { user } = require('./User');
const connectionString = process.env.CONNECTION;

mongo().catch(err => console.log(err));

// connection
async function mongo() {
    await mongoose.connect(`${connectionString}`);
    console.log('Db connected!');
}

let jsonModels = {
    user : user(mongoose)
};

exports.models = jsonModels;