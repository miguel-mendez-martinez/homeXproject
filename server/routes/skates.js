const router = require(`express`).Router()
const skatesModel = require(`../models/skates`)

router.get('/DisplayAllSkates', (req, res) => 
{
    skatesModel.find({}, (error, data) =>
    {
        if(!error){
            res.json(data)
        }
    })
})

router.post('/DisplayAllSkates/:model/:colour/:year/:price', (req, res) => 
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