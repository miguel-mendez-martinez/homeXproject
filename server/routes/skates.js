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

router.post('/DisplayAllSkates/validateUser', (req, res) => 
{
    //we verify the user and return name, access level and token in order to avoid changes in web from changing the access level in app display oon dev tools
    jwt.verify(req.headers.authorization, process.env.JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) => {

        if( typeof decodedToken  == 'undefined'){
            res.json({accessLevel: 0})
        }else{
            res.json({accessLevel: decodedToken.accessLevel})
        }
        
    })
})

router.post('/DisplayAllSkates/:type/:size/:brand/:price', (req, res) => 
{
    skatesModel.create({model: req.params.model, colour: req.params.colour, year: req.params.year, price: parseInt(req.params.price)}, (error, data) =>
    {
        if(error){
            res.json({errorMessage:`Bad Request`})
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