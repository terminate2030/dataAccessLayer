/**
 * Created by terminate2030@gmail.com on 1/23/2015.
 */
var CommentSchema = function ($mongoose) {
    var schema = new $mongoose.Schema({
        title : { type: String},
        body: { type: String},
        author: { type: String , default: 'Unknown'},
        email: { type: String},
        createdAt : { type: Date, default: Date.now},
        modifiedAt : { type: Date , default: Date.now},
        status : { type: String, default: 'pending'}
    });
    schema.virtual('id').get(function () {
        return this._id.toHexString();
    });
    return schema;
};
module.exports = CommentSchema;
