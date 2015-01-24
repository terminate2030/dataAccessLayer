/**
 * Created by terminate on 1/23/2015.
 */

var $mongoose = require('mongoose');
var addressSchema = require('../schema/schema.address');
var AddressModel = function () {
    var address = {};
    address.schema = new addressSchema($mongoose);
    address.model = $mongoose.model('Address',address.schema);
    address.createNewAddress = function ($newAddress, callback) {
        address.model.create($newAddress, function (err,createdAddress) {
            if(!err){
                callback(null,createdAddress);
            }else{
                callback(err,null);
            }
        });
    };
    address.findAllAddresses = function (callback) {
        address.model.find({}, function (err, addresses) {
            if(!err){
                callback(null,addresses);
            }else{
                callback(err,null);
            }
        });
    };
    address.findOneAddressById = function ($id, callback) {
        address.model.findOne({ id : $mongoose.Schema.Types.ObjectId($id)}, function (err, address) {
            if(!err){
                callback(null,address);
            }else{
                callback(err,null);
            }
        });
    };
    address.updateAddressById = function ($id,$updateAddress,callback) {
        address.model.findOneAndUpdate({ id : $mongoose.Schema.Types.ObjectId($id)},{ $set : $updateAddress}, function (err, updatedAddress) {
            if(!err){
                callback(null,updatedAddress);
            }else{
                callback(err,null);
            }
        });
    };
    address.removeAddressById = function ($id,callback) {
        address.model.findOneAndRemove({ id : $mongoose.Schema.Types.ObjectId($id)}, function (err) {
            if(!err){
                callback(null,1);
            }else{
                callback(err,0);
            }
        });
    };
    return address;
};
module.exports = AddressModel;
