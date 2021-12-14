const router = require(`express`).Router()
const usersModel = require(`../models/users`)
const bcrypt = require('bcrypt')

router.get('/Users', (req, res) => 
{
    usersModel.find({}, (error, data) =>
    {
        if(!error){
            res.json(data)
        }
    })
})

router.post('/Users/:name/:email/:password/:confirmPassword', (req, res) => 
{
    /*if(!req.params.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        console.log('Email must be Valid')
    }else if(!req.params.password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)){
        console.log('Password must have at leat 6 characters, including 1 number and 1 special character')
    }else if(!req.params.confirmPassword.match(req.params.password)){
        console.log(Passwords must match.')
    }*///else{
        bcrypt.hash(req.params.password, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) =>  
        {
            // hash is the encrypted password.
            usersModel.create({name: req.params.name, email: req.params.email, password: hash, confirmPassword: req.params.confirmPassword}, (error, data) =>
            {
                console.log(error)
                if(error){
                    res.json({errorMessage:`Bad Request`})
                }else{
                    res.json(data)
                }
                
            })
        })
        
    //}


    
})

module.exports = router