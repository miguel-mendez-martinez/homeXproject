const mongoose = require(`mongoose`)


let propResidentsSchema = new mongoose.Schema(
{
     residentname:{type:String, required: true},
     residentId:{type:String, required: true},
})

let contractSchema = new mongoose.Schema(
   {
        date: {type: Date, validate: function(input){return typeof new Date(input) === 'date' && new Date(input) >= new Date()},required: true, unique: true}, /* When the contract starts, not when created */
        status: {type: String, enum: ['requested', 'confirmated', 'signed', 'completed'], required: true},
        tenant: {type: String, required: true},
        residents: [propResidentsSchema],
        property: {type: String, required: true},
        expireDate: {type: Date, validate: function(input){return typeof new Date(input) === 'date' && new Date(input) >= new Date()}, required: true},
        moneyAmount: {type: Number, validate: function(){return this.moneyAmount > 0}, required: true},
        monthlyDeadLine: {type: Number, validate: function(){return this.monthlyDeadLine > 0 && monthlyDeadLine < 30}, required: true},
   },
   {
        collection: `contracts`
   })

module.exports = mongoose.model(`contracts`, contractSchema)