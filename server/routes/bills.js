const router = require(`express`).Router()
const contractModel = require(`../models/contracts`)
const billsModel = require(`../models/bills`)
const usersModel = require(`../models/users`)
const createError = require('http-errors')
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
router.get('/Bills/pending/:id', checkUserLogged, (req,res) =>{
    billsModel.find({status: "pending"}, (error, data) =>
    {
        if(error){
            return next(createError(400, `Error on searching.`))
        }else{
            res.json(data)
        }
        
    })
})

router.get('/Bills/delayed/:id', checkUserLogged, (req,res) =>{
    billsModel.find({status: "delayed"}, (error, data) =>
    {
        if(error){
            return next(createError(400, `Error on searching.`))
        }else{
            res.json(data)
        }
        
    })
})

router.get('/Bills/paid/:id', checkUserLogged, (req,res) =>{
    billsModel.find({status: "paid"}, (error, data) =>
    {
        if(error){
            return next(createError(400, `Error on searching.`))
        }else{
            res.json(data)
        }
        
    })
})


router.put('/Bills/:id', checkUserLogged, (req,res) =>{ //Need to set how to manage the pay option
    billsModel.updateOne({_id: req.params.id},{status: "paid"}, (error, data) =>
    {
        if(error){
            return next(createError(400, `Error on paying bill.`))
        }else{
            res.json(data)
        }
        
    })
})


module.exports = router