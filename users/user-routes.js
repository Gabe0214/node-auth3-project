const router = require('express').Router()

const jwt = require('jsonwebtoken')
const userDB = require('./user-modal')

const bycrpt = require('bcryptjs')
const restricted = require('./retricted-middleware')
const { jwtSecret } = require('../config/secret')
router.get('/users', restricted, (req, res) => {
    userDB.find()
    .then( result => {
        res.status(201).json(result)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "Error with the server"})
    })
})

router.post('/register', (req, res) => {
 const { username, password } = req.body

    userDB.insert({username, password: bycrpt.hashSync(password, 5)})
    .then(user => {
        res.status(201).json({id: user[0], username})
    })
   
    .catch(err => {
        console.log(err)
    })
})

router.post('/login', (req, res) => {
    const { username, password } = req.body 

    userDB.findByUsername(username)
    .then(user => {
        if( user && bycrpt.compareSync(password, user.password)){
            const token = signToken(user)
            res.status(201).json({token})
        } else {
            res.status(401).json({message: 'Invalid Credentials'})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "Server is having an issue. "})
    })
    


})
function signToken(user){
    const payload = {
        userId: user.id,
        username: user.username
    }

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, jwtSecret, options)
}

module.exports = router;