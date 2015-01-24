/**
 * Created by terminate2030@gmail.com on 1/22/2015.
 */
var crypto = require('crypto');
var Schema = function ($mongoose) {
    var userSchema = new $mongoose.Schema({
        firstName  : { type : String , lowercase: true},
        lastName : { type : String , lowercase: true},
        age : { type: Number , min: 5 ,max: 120},
        gender : { type: String , default: 'Unknown'},
        phoneNumber : { type: String , default: ''},
        email : { type : String ,index : true},
        createAt : { type : Date , default : Date.now},
        modifiedAt : { type : Date , default : Date.now},
        salt : { type : String},
        hashed_password : { type : String},
        userName : { type : String},
        addresses : [{ type: $mongoose.Schema.Types.ObjectId ,ref: 'Address'}]
    });
    userSchema.virtual('id').get(function () {
        return this._id.toHexString();
    });
    userSchema.virtual('fullName').get(function () {
        return this.firstName+' '+this.lastName;
    });
    userSchema.virtual('password').set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.cryptedPassword(this._password);
    });
    userSchema.method('makeSalt', function () {
        return crypto.randomBytes(128).toString('base64');
    });
    userSchema.method('cryptedPassword', function (password) {
        return crypto.createHmac('sha1',this.salt).update(password).digest('hex');
    });

    return userSchema;
};
module.exports = Schema;
