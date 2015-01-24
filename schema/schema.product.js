/**
 * Created by terminate2030#gmail.com on 1/22/2015.
 */

var ProductSchema = function ($mongoose) {
    var schema = new $mongoose.Schema({
        title : { type: String , required: true},
        brand : { type: String},
        category : { type: $mongoose.Schema.Types.ObjectId , ref: 'Category'},
        quantity : { type: Number,default: 0},
        price : { type: Number},
        discount : { type: Number , default: 0},
        imgUrl : { type: String , default: 'there is no images for product'},
        imgAlt : { type: String , default: 'there is no alternative for product image'},
        inStock : { type: Boolean, default: false},
        isActive : { type: Boolean, default: false},
        startSaleTime : { type: Date , default: null},
        finishSaleTime : { type: Date , default: null},
        createAt : { type: Date, default: Date.now},
        modifiedAt : { type: Date, default:Date.now},
        addedBy : { type: $mongoose.Schema.Types.ObjectId},
        comments : [{ type: $mongoose.Schema.Types.ObjectId , ref: 'Comment'}]
    });
    schema.virtual('id').get(function () {
        return this._id.toHexString();
    });
    schema.virtual('totalPrice').get(function () {
        return this.price - Math.floor((this.price*this.discount / 100));
    });
    return schema;
};

module.exports = ProductSchema;
