const router = require(`express`).Router()
const usersModel = require(`../models/users`)
const tenantModel = require(`../models/tenants`)
const residentModel = require(`../models/residents`)
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const createError = require('http-errors')
var urlencode = require('urlencode');

//this is for multipart form data
const multer  = require('multer')
const upload = multer()

//Middleware
const checkUserExists = (req, res, next) =>
{
    req.body.password = urlencode.decode(req.body.password)
    usersModel.findOne({email:req.body.email}, (error, data) => 
    {
        if(error || data==null){
            return next(createError(400), `User doesn't exists.`)
        }
        req.data = data            
        return next()        
    })    
}

const checkUserNotExists = (req, res, next) =>
{
    req.body.password = urlencode.decode(req.body.password)
    usersModel.findOne({email:req.body.email}, (err, data) => 
    {
        if(data){
            if(err){
                return next(err)
            }
            return next(createError(400, "User already exists."))
        }
    }) 
    
    return next()
}

const checkLogIn = (req, res, next) =>
{    
    bcrypt.compare(req.body.password, req.data.password, (err, result) =>
    {     
        if(err){
            return next(err)
        }
        if(!result)
        {  
            return next(createError(400, "Error. Email or password are incorrect. Please try again."))

        }        
        
        return next()        
    })
}

const logInUser = (req, res, next) => 
{
    const token = jwt.sign({email:req.data.email, accessLevel:req.data.accessLevel}, process.env.JWT_PRIVATE_KEY, {algorithm:'HS256', expiresIn:process.env.JWT_EXPIRY})     
           
    res.json({email:req.data.email, accessLevel:req.data.accessLevel, token:token})
}

const createUser = (req, res, next) => 
{
    bcrypt.hash(req.body.password, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) =>  
    {
        if(err)
        {
            return next(err)
        }
        if(req.body.userType == "Tenant"){
            usersModel.create({name:req.body.userName,email:req.body.email,password:hash, accessLevel: process.env.ACCESS_LEVEL_ADMIN}, (err, data) => 
            {
                if(err)
                {
                    return next(err)
                }
                req.data = data
                return next()
            })
        }else{
            usersModel.create({name:req.body.userName,email:req.body.email,password:hash, accessLevel: process.env.ACCESS_LEVEL_NORMAL_USER}, (err, data) => 
            {
                if(err)
                {
                    return next(err)
                }
                req.data = data
                return next()
            })
        }
    })
}

const createTypeUser = (req, res, next) => 
{
      
    //here we check if the user is a tenant or a resident and next we will create an object of one of those 
    if(req.body.userType == "Tenant"){
        tenantModel.create({userID: req.data._id, name:req.body.name, id:req.body.id, phoneNumber:req.body.phoneNumber}, (err, data) => 
        {
            if(err)
            {
                return next(err)
            }
            req.data = data
            return next()
        })
    }else{
        residentModel.create({userID: req.data._id, name:req.body.name, id:req.body.id, phoneNumber:req.body.phoneNumber}, (err, data) => 
        {
            if(err)
            {
                return next(err)
            }
            req.data = data
            return next()
        })
    }
}

const eliminateCollection = (req, res, next) =>
{
    usersModel.deleteMany({}, (error, data) =>{
        if(error){
            return next(error)
        }
        if(data){
            return next()
        }
    })
}

const createAdmin = (req, res, next) => {
    bcrypt.hash(process.env.ADMIN_PASSWORD.toString(), parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) =>  
    {
        if(err){
            return next(err)
        }
        usersModel.create({name:"Administrator", email:"admin@admin.com", password:hash, accessLevel:parseInt(process.env.ACCESS_LEVEL_ADMIN)}, (error, createData) => 
        {
            if(error){
                return next(error)
            }
            if(createData)
            {
                res.json(createData)
            }else{
                return next(createError(500, "Error recreating the database."))
            }
        })
    })
}

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

//Register
router.post(`/Users/register`, upload.none(), checkUserNotExists, createUser, createTypeUser, logInUser) //we have to create the tenant or resident next
//Log in
router.post(`/Users/login`, upload.none(), checkUserExists, checkLogIn, logInUser) 
//Drop Database
router.post(`/Users/resetUsers`, eliminateCollection, createAdmin)
//Log out
router.post(`/Users/logout`, (req,res) => {       
    res.json({})
})
//Retrive all users
router.get('/Users', (req, res) => 
{
    usersModel.find({}, (error, data) =>
    {
        if(!error){
            res.json(data)
        }
    })
})

module.exports = router