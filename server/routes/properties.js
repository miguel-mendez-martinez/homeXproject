const router = require(`express`).Router()
const propertiesModel = require(`../models/property`)
const createError = require('http-errors')

//Middleware

router.get('/Properties', (req, res) => 
{
    propertiesModel.find({}, (error, data) =>
    {
        if(!error){
            res.json(data)
        }
    })
})
module.exports = router