const router = require(`express`).Router()
const skatesModel = require(`../models/skates`)
const jwt = require('jsonwebtoken')

const multer  = require('multer')
var upload = multer({dest: `${process.env.UPLOADED_FILES_FOLDER}`})

router.get('/DisplayAllSkates', (req, res) => 
{
    skatesModel.find({}, (error, data) =>
    {
        if(!error){
            res.json(data)
        }
    })
})

router.get('/DisplayAllSkates/:category', (req, res) => 
{
    skatesModel.find({type: req.params.category}, (error, data) =>
    {
        if(!error){
            res.json(data)
        }
    })
})

router.get(`/DisplayAllSkates/:id`, (req, res) => {
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) => 
    {
        if (err) 
        { 
            res.json({errorMessage:`User is not logged in`})
        }
        else
        {
            carsModel.findById(req.params.id, (error, data) => 
            {
                if(error)
                    res.json({errorMessage: `Product not found`})
                else
                    res.json(data)
            })
        }
    })
})

//Return a photo
router.get(`/DisplayAllSkates/photo/:filename`, (req, res) => 
{   
    fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${req.params.filename}`, 'base64', (err, fileData) => 
        {        
        if(fileData)
        {  
            res.json({image:fileData})                           
        }   
        else
        {
            res.json({image:null})
        }
    })             
})


router.post('/DisplayAllSkates', upload.array("productPhotos", parseInt(process.env.MAX_NUMBER_OF_UPLOAD_FILES_ALLOWED)), (req, res) => 
{
    console.log()
    jwt.verify(req.headers.authorization, process.env.JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) =>{
        if(err){
            res.json({errorMessage: `${err}`})
        }else{
            let productDetails = new Object()
            productDetails.type = req.body.type
            productDetails.size = req.body.size
            productDetails.brand = req.body.brand
            productDetails.price = req.body.price
            productDetails.photos = []

            req.files.map((file, index) =>
            {
                productDetails.photos[index] = {filename:`${file.filename}`}
            })
            
            skatesModel.create(productDetails, (error, data) =>
            {
                if(error){
                    res.json({errorMessage: `${error}`})
                    //res.json({errorMessage:`Bad Request`})
                }else{
                    res.json(data)
                }
                
            })
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