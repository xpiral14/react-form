const express = require('express');
const router = express.Router();
const {
    PERMITED_USERS
} = require('../config')
/* GET users listing. */
router.post('/register', (req, res, next) => {
    const {
        name,
        email,
        pass
    } = req.body.userData;

    const dataToInsert = {
        id: PERMITED_USERS.length + 1,
        name,
        email,
        pass
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

module.exports = router;