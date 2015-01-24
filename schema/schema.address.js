/**
 * Created by terminate2030@gmail.com on 1/22/2015.
 */

var AddressSchema = function ($mongoose) {
    var schema = new $mongoose.Schema({
        country : { type : String , default: 'united state of america'},
        province : { type : String , default:'california'},
        state : { type : String , default: 'los angles'},
        avenue : { type : String , default: ''},
        zipCode : { type : String , required: true},
        number : { type : String},
        user : { type: $mongoose.Schema.Types.ObjectId , ref: 'Address'}
    });
    schema.virtual('id').get(function () {
        return this._id.toHexString();
    });

    return schema;
};

module.exports = AddressSchema;
