const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const {JWT_KEY} = require('../config')
const {
    PERMITED_USERS,
    SAULT_ROUNDS
} = require('../config')
const bcrypt = require('bcrypt')
/* GET users listing. */
router.post('/register', (req, res, next) => {
    const {
        name,
        email,
        pass
    } = req.body.userData;
    const hash = bcrypt.hashSync(pass, SAULT_ROUNDS)

    const dataToInsert = {
        id: PERMITED_USERS.length + 1,
        name,
        email,
        pass: hash
    }
    if (name && email && pass) {
        PERMITED_USERS.push(dataToInsert)
        res.json({
            success: true,
            data: PERMITED_USERS[PERMITED_USERS.length - 1]
        })
    }

    res.json({
        success: false,
        code: '005',
        message: "Fill all fields"
    })


});
router.get('/', (req, res) => {
    let token = req.headers['authorization'].split(' ')[1]
    jwt.verify(token, JWT_KEY, (err, result) => {
        if (!err) res.json(PERMITED_USERS)

        res.json({
            success: false,
            error: err
        })
    })

})
module.exports = router;