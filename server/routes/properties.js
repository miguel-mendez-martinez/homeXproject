const router = require(`express`).Router()
const propertiesModel = require(`../models/property`)
const usersModel = require(`../models/users`)
const contractsModel = require(`../models/contracts`)
const createError = require('http-errors')
const fs = require('fs');
const jwt = require('jsonwebtoken')
const multer  = require('multer')
var upload = multer({dest: `${process.env.UPLOADED_FILES_FOLDER}`})

//Middleware

const checkUserLogged = (req, res, next) =>
{
    jwt.verify(req.headers.authorization, process.env.JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) => 
    {
        if (err) 
        { 
            return next(createError(400, "User is not logged in."))
        }
        else 
        {
            req.decodedToken = decodedToken
            return next()
        }
    })
}

/* const findUser = (req, res, next) => {
    usersModel.findOne({email: req.decodedToken.email}, (error, data) => 
        {
            if(error || data==null){
                return next(createError(400), `User doesn't exists.`)
            }
            console.log(data)
            req.user = data            
            return next()        
        }) 
}  */  

const checkPropertyDontExists = (req, res, next) =>
{
    propertiesModel.findOne({address: req.body.address}, (error, data) =>
    {
        if(error){
            return next(createError(400, "Error checking property existance"))
        }else{
            if(!data)
                return next()
            else
                return next(createError(400, "Property already exists"))
        }
    })
}

const addProperty = (req, res, next) =>
{
    let property = new Object()
    property.tenant = req.body.tenant
    property.address = req.body.address
    property.area = req.body.area
    property.price = req.body.price
    property.residents = []
    property.images = []

    req.files.map((file, index) =>
    {
        property.images[index] = {filename:`${file.filename}`}
    })

    propertiesModel.create(property, (error, data) =>
    {
        if(error){
            return next(createError(400, `Error on property creation.`))
        }else{
            res.json(data)
        }
        
    })
}

const updateProperty = (req, res, next) =>{ //At the moment is not possible to update images

    propertiesModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) => 
    {
        if(error){
            return next(createError(400, `Error on property update.`))
        }else{
            res.json(data)
        }
    })
}

const deleteProperty = (req, res, next) =>{
    let pathArray = __dirname.split('\\')
    let path = pathArray.splice(-0, pathArray.length - 1).join('\\')

    propertiesModel.findByIdAndRemove(req.params.id, (error, data) => 
    {
        if(error){
            return next(createError(400, `Error on property delete.`))
        }else{
            fs.unlink(`${path}\\uploads\\${data.images[0].filename}`, (err) => { //Only deletes one image for now
                if(err)
                    return next(createError(400, `Error on image deleting.`))
                else
                    res.json(data)
            })
        }
    })
}

const checkAvaliable = (req, res, next) =>{

    propertiesModel.findById(req.params.idProp, (error, data) =>
    {
        if(error){
            return next(createError(400, "Error checking avaliability"))
        }else{
            if(data){
                if(data.resident === 'none')
                    return next()
                else
                return next(createError(400, "Property is not avaliable"))
            }
        }
              
    })
}

const generateContract = (req, res, next) =>{

    console.log(req.body)

    let contract = new Object()
    contract.date = req.body.date
    contract.status = 'requested'
    contract.tenant = req.body.tenant
    contract.resident = req.decodedToken.email
    contract.property = req.params.idProp
    contract.expireDate = req.body.expireDate
    contract.moneyAmount = req.body.moneyAmount
    contract.monthlyDeadLine = req.body.monthlyDeadLine
    contract.residents = []

    //residents
    req.body.residents.map((resident, index) =>
    {
        contract.residents[index] = {name:`${resident.name}`, id:`${resident.id}`}
    })
    
    contractsModel.create(contract, (error, data) =>
    {
        if(error){
            console.log(error)
            return next(createError(400, `Error on contract creation.`))
        }else{
            res.json(data)
        }       
    })
}


//routes
router.get('/Properties/resident', (req, res) => 
{
    propertiesModel.find({ resident: 'none'}, (error, data) =>
    {
        if(!error){
            res.json(data)
        }
    })
})

router.get('/Properties/tenant/', checkUserLogged, (req, res) => 
{
    propertiesModel.find({tenant: req.decodedToken.email}, (error, data) =>
    {
        if(!error){
            res.json(data)
        }
    })
})

router.get(`/Properties/images/:filename`, (req, res) => 
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

router.get('/Properties/:id', (req, res) =>{
    propertiesModel.find({}, (error, data) =>
    {
        if(!error){
            res.json(data)
        }
    })
})

router.post('/Properties/AddNew', upload.array("propertyImages", parseInt(process.env.MAX_NUMBER_OF_UPLOAD_FILES_ALLOWED)),checkUserLogged, checkPropertyDontExists, addProperty)

router.put('/Properties/:id', upload.array("propertyImages", parseInt(process.env.MAX_NUMBER_OF_UPLOAD_FILES_ALLOWED)), checkUserLogged, updateProperty)

router.delete('/Properties/:id', checkUserLogged, deleteProperty)

router.post('/Properties/rentProperty/:idProp', upload.none(), checkUserLogged, checkAvaliable, generateContract)

module.exports = router