const router = require(`express`).Router()
const skatesModel = require(`../models/skates`)
const jwt = require('jsonwebtoken')
const fs = require('fs');

const multer  = require('multer')
var upload = multer({dest: `${process.env.UPLOADED_FILES_FOLDER}`})

const checkUserLogged = (req, res, next) =>
{
    jwt.verify(req.headers.authorization, process.env.JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) => 
    {
        if (err) 
        { 
            return res.json({errorMessage:`User is not logged in`})
        }
        else 
        {
            req.decodedToken = decodedToken
            return next()
        }
    })
}


const checkIfAdmin = (req, res, next) =>
{
    if(req.decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN)
    {    
        return next()
    }
    else
    {
        return res.json({errorMessage:`User is not an administrator`})
    }
}

const findById = (req, res, next) =>{
    skatesModel.findById(req.params.id, (error, data) => 
    {
        if(error)
            res.json({errorMessage: `Product not found`})
        else
            res.json(data)
    })
}

const addProduct = (req, res, next) =>{
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
    console.log(productDetails)
    
    skatesModel.create(productDetails, (error, data) =>
    {
        if(error){
            console.log(`Error en la creacion: ${error}`)
            res.json({errorMessage: `${error}`})
            //res.json({errorMessage:`Bad Request`})
        }else{
            console.log(data)
            res.json(data)
        }
        
    })
}

const deleteProduct = (req, res, next) =>{
    skatesModel.findByIdAndRemove(req.params.id, (error, data) => 
    {
        if(error){
            res.json({errorMessage: `${error}`})
        }else{
            res.json(data)
        }
    })
}

const updateProduct = (req, res, next) =>{
    skatesModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) => 
    {
        if(error){
            console.log(error)
        }else{
            res.json(data)
        }
    })
}

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

router.get(`/DisplayAllSkates/get/:id`, checkUserLogged, findById)

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

router.post('/DisplayAllSkates', upload.array("productPhotos", parseInt(process.env.MAX_NUMBER_OF_UPLOAD_FILES_ALLOWED)), checkUserLogged, checkIfAdmin, addProduct)

router.delete('/DisplayAllSkates/:id', checkUserLogged, checkIfAdmin, deleteProduct)

router.put(`/DisplayAllSkates/:id`, checkUserLogged, checkIfAdmin, updateProduct)

module.exports = router