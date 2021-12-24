const router = require(`express`).Router()
const skatesModel = require(`../models/skates`)
const jwt = require('jsonwebtoken')

router.get('/DisplayAllSkates', (req, res) => 
{
    skatesModel.find({}, (error, data) =>
    {
        if(!error){
            res.json(data)
        }
    })
})


router.post('/DisplayAllSkates/:type/:size/:brand/:price', (req, res) => 
{
    skatesModel.create({type: req.params.type, size: parseFloat(req.params.size), brand: req.params.brand, price: parseInt(req.params.price)}, (error, data) =>
    {
        if(error){
            res.json({errorMessage: `${error}`})
            //res.json({errorMessage:`Bad Request`})
        }else{
            res.json(data)
        }
        
    })

    
})

router.delete('/DisplayAllSkates/:id', (req, res) => 
{
    skatesModel.findByIdAndRemove(req.params.id, (error, data) => 
    {
        if(error){
            console.log(error)
        }else{
            res.json(data)
        }
    })
})

router.put(`/DisplayAllSkates/:id`, (req, res) => 
{
    skatesModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) => 
    {
        if(error){
            console.log(error)
        }else{
            res.json(data)
        }
    })
    
})

module.exports = router