/**
 * Created by terminate2030@gmail.com on 1/22/2015.
 */

var CategorySchema = function ($mongoose) {
    var schema = new $mongoose.Schema({
        title : { type: String},
        description : { type: String , default : 'there is no description'},
        createAt : { type: Date , default : Date.now},
        modifiedAt : { type: Date , default : Date.now},
        createdBy : { type: $mongoose.Schema.Types.ObjectId},
        products :  [{ type: $mongoose.Schema.Types.ObjectId , ref: 'Product'}]
    });
    schema.virtual('id').get(function () {
        return this._id.toHexString();
    });
    return schema;
};
module.exports = CategorySchema;
