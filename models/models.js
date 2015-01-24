/**
 * Created by terminate2030@gmail.com on 1/23/2015.
 */

var $mongoose = require('mongoose'),
    userSchema = require('../schema/schema.user'),
    addressSchema = require('../schema/schema.address'),
    categorySchema = require('../schema/schema.category'),
    productSchema = require('../schema/schema.product');

module.exports.UserModel = $mongoose.model('User',new userSchema($mongoose));
module.exports.AddressModel = $mongoose.model('Address',new addressSchema($mongoose));
