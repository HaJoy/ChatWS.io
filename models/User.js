

exports.user = (odm) => {

    const userSchema = new odm.Schema({
        name : String,
        email : String,
    });

    return odm.model('User', userSchema);
};