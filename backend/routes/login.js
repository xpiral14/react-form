const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {
    JWT_KEY,
    PERMITED_USERS,
    SAULT_ROUNDS
} = require('../config')
const {
    findUser
} = require('../Utils')
router.post('/login', (req, res, next) => {
        const {
            email,
            pass
        } = req.body.userData
        let id;
        if (!pass && !email) res.status(401).json({
            success: false,
            code: '001',
            message: 'Email and Pass not informed'
        })
    
        if (!email) res.status(401).json({
            success: false,
            code: '002',
            message: 'Email not informed'
        })
        if (!pass) res.status(401).json({
            success: false,
            code: '003',
            message: 'Pass not informed'
        })
        //Lógica para gerar o token. Geralmente se usa com querys para banco de dados.
        
    
        let user = PERMITED_USERS.filter(u => u.email === email)[0]
        if (user) {            
            if (bcrypt.compareSync(pass, user.pass)) {
                let tokenData = {
                    email: user.email,
                    name: user.name
                }
                let generatedToken = jwt.sign(tokenData, JWT_KEY, {
                    expiresIn: '10m',
                })
    
                res.json({
                    success: true,
                    token: generatedToken
                })
            }

        //Caso não ache a senha, o erro abaixo é enviado
        res.json({
            success: false,
            code: '004',
            message: 'Password is not valid',
            pass: passwordHashed
        })
    }
    //Caso nao ache nem o email, nem a senha, a resposta abaixo é enviada
    res.json({
        success: false,
        code: '005',
        message: 'Email and Password not valid',
        data: {}
    })
})
router.get('/verifytoken', (req, res) => {
    let token = req.headers["authorization"].split(' ')[1]
    jwt.verify(token, JWT_KEY, (err, result) => {
        if(!err) res.json({
            success: true,
            message: "token is valid."
        })

        res.json({
            success: false,
            error: err
        })
    })
})
module.exports = router