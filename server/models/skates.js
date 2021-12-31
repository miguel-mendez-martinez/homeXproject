const mongoose = require(`mongoose`)


const types = "Deck,Trucks,Wheels".split(",")

let skatePhotosSchema = new mongoose.Schema(
     {
        filename:{type:String}
     })

let skateSchema = new mongoose.Schema(
   {
        type: {type: String, enum:types},
        size: {type: Number},
        brand: {type: String},
        price: {type: Number, validate: function(){return this.price > 0}},
        photos: [skatePhotosSchema]
   },
   {
        collection: `Skates`
   })

module.exports = mongoose.model(`Skates`, skateSchema)