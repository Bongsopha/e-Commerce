const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
	name:{
		type: String,
		require: true
	},
	email:{
		type: String,
		require: true
	},
	username:{
		type: String,
		require: true
    },
    password:{
		type: String,
		require: true
	}
});

module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);

}
module.exports.getUserByUsername = function(username, callback){
    const query = {username: username}
    User.findUser(query, callback);
}

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, slat) => {
        bcrypt.hash(newUser.password, slat, (err, hash)=>{
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
        if (err) throw err;
        callback(null, isMatch);

    });
}
