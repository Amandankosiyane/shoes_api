const mongoose = require('mongoose');
module.exports = function(mongoUrl) {
        mongoose.connect(mongoUrl);
        const shoesSchema = mongoose.Schema({
                Brand: String,
                Color: String,
                Price: Number,
                Size: Number,
                InStock: Number

        });

        const storeShoes = mongoose.model('storeShoes', shoesSchema);

        return {
                storeShoes
        }
}
