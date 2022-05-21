const mongoose = require(`mongoose`)

let contractSchema = new mongoose.Schema(
   {
        date: {type: Date, required: true},
        tenant: {type: String, required: true},
        residents: {type: String, required:true},
        property: {type: String, required: true},
        expireDate: {type: Date, rquired: true},
        moneyAmount: {type: Number, validate: function(){return this.moneyAmount > 0}, required: true},
        monthlyDeadLine: {type: Number, validate: function(){return this.monthlyDeadLine > 0 && monthlyDeadLine < 30}, required: true},
   },
   {
        collection: `contracts`
   })

module.exports = mongoose.model(`contracts`, contractSchema)