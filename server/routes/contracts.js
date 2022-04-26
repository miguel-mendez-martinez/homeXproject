const router = require(`express`).Router()
const contractModel = require(`../models/contracts`)
const createError = require('http-errors')

//Middleware

router.get('/Contracts', (req, res) => 
{
    contractModel.find({}, (error, data) =>
    {
        if(!error){
            res.json(data)
        }
    })
})
module.exports = router