/**
 * Created by terminate on 1/23/2015.
 */

var should = require('should');
var mongoose = require('mongoose');
var mongooseConnection= require('../lib/mongoose_connection');
var User = require('../models/userModel');


var connection = new mongooseConnection({ mongoose : mongoose});
var user = new User(mongoose);
before(function (done) {
    connection.createConnection(done);
});
after(function (done) {
    connection.closeConnection(done);
});
describe('# mongoose User model ', function () {
    describe.skip(' # user interactive by default situation', function () {
        it('user must save to database successfully', function (done) {
            //TODO: user insert implementation
            var address = [ {
                country : 'Iran',
                province : 'tehran',
                state : 'tehran',
                avenue : 'fajr',
                zipCode : '17852972',
                number : 2
            },{
                country : 'Iran',
                province : 'tehran',
                state : 'tehran',
                avenue : 'fajr',
                zipCode : '17852972',
                number : 1}];
            var newUser = new user.model();
            newUser.firstName = 'hussein';
            newUser.lastName = 'taherian';
            newUser.age = 25 ;
            newUser.gender = 'Male';
            newUser.phoneNumber = '09124455108';
            newUser.email = 'terminate2030@gmail.com';
            newUser.password = '123456';
            newUser.userName = 'terminate2030';
            user.createNewUserByAddress(newUser,address[0],function (err, createdUser) {
                should.not.exist(err);
                should.exist(createdUser);
                createdUser.firstName.should.be.equal('hussein');
            });
            done();
        });
    });
    describe(' # find user and address information', function () {
        it('user retrieve successfully ');
        it('user addresses retrieve successfully');
        it('single user retrieve successfully by id');
        it('single user addresses retrieve successfully by user id');
    });
});
