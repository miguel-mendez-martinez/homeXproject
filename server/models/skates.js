const mongoose = require(`mongoose`)


const types = ['deck', 'truck', 'wheels']

let userSchema = new mongoose.Schema(
   {
        type: {type: String, match:[types, "Invalid product type"]},
        size: {type: Number},
        brand: {type: String},
        price: {type: Number, validate: function(){return this.price > 0}}
   },
   {
        collection: `Skates`
   })

module.exports = mongoose.model(`Skates`, userSchema)