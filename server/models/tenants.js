const mongoose = require(`mongoose`)

const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const accessLevels = [0, 1, 2]

let tenantSchema = new mongoose.Schema(
   {
        userID: {type: String, required:true},
        name: {type: String, required: true},
        id: {type: String, required: true},
        phoneNumber: {type: String, required: true},
   },
   {
        collection: `tenants`
   })

module.exports = mongoose.model(`tenants`, tenantSchema)