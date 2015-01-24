/**
 * Created by terminate2030@gmail.com on 1/23/2015.
 */
var userSchema = require('../schema/schema.user'),
    addressSchema = require('../schema/schema.address'),
    mongoose = require('mongoose');
var UserModel = function () {
    var user = {};

    user.schema = new userSchema(mongoose);
    user.addressSchema = new addressSchema(mongoose);
    user.addressModel = mongoose.model('Address',user.addressSchema);
    user.model = mongoose.model('User',user.schema);
    user.createNewUserByAddress = function ($newUser, $newAddress, callback) {
        if(!(typeof $newUser !== 'undefined' && typeof $newUser !== null)&&(typeof $newAddress !==null && typeof $newAddress !=='undefined')) {
            callback('parameters should be defined', null, null);
        }else {
            var address = new user.addressModel($newAddress);
            user.model.create($newUser, function (err, createdUser) {
                if (!err) {
                    address.user = createdUser._id;
                    address.save(function (err, createdAddress) {
                        if (!err) {
                            createdUser.addresses.push(createdAddress);
                            createdUser.save(function (err, updateCreatedUser) {
                                if (!err) {
                                    callback(null, updateCreatedUser, createdAddress);
                                } else {
                                    callback(err, null, null);
                                }
                            });
                        } else {
                            callback(err, null, null);
                        }
                    });
                } else {
                    callback(err, null, null);
                }
            });
        }
    };
    user.createNewUserByNewAddress = function($newUser,$newAddress,callback){
        user.model.create($newUser, function (err, createdUser) {
            if(!err){
                $newAddress.user = createdUser._id;
                user.AddressModel.create($newAddress, function (err, createdAddress) {
                    if(!err){
                        callback(null,createdUser,createdAddress);
                    }else{
                        callback(err,null,null);
                    }
                });
            }else{
                callback(err,null,null);
            }
        });
    };
    user.createNewUser = function ($newUser,callback) {
        user.model.create($newUser, function (err, createdUser) {
            if(!err){
                callback(null,createdUser);
            }else{
                callback(err,null);
            }
        });
    };
    user.findAllUsers = function (callback) {
        user.model.find({}, function (err, users) {
            if(!err){
                callback(null,users);
            }else{
                callback(err,null);
            }
        });
    };
    user.findUserById = function ($id, callback) {
        if(typeof $id === "String") {
            user.model.findOne({id: mongoose.Schema.Types.ObjectId($id)}, function (err, user) {
                if (!err) {
                    callback(null, user);
                } else {
                    callback(err, null);
                }
            });
        }else{
            callback('the $id parameter should be defined as String and valid',null,null);
        }
    };
    user.findUserAddresses = function ($id,callback) {
        user.model.find({ id : mongoose.Schema.Types.ObjectId($id)})
            .populate('addresses')
            .exec(function (err, user) {
                if(!err){
                    callback(null,user);
                }else{
                    callback(err,null);
                }
            });
    };
    user.updateUserById = function ($id,$updateUser, callback) {
        user.model.findOneAndUpdate({ id : mongoose.Schema.Types.ObjectId($id)},{$set : $updateUser},function (err, updatedUser) {
            if(!err){
                callback(null,updatedUser);
            }else{
                callback(err,null);
            }
        });
    };
    user.removeUserById = function ($id, callback) {
        user.model.findOneAndRemove({ id : mongoose.Schema.Types.ObjectId($id)}, function (err) {
            if(!err){
                callback(null,1);
            }else{
                callback(err,0);
            }
        });
    };

    return user;
};

module.exports = UserModel;
