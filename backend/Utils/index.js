const {PERMITED_USERS} = require('../config')

module.exports = {
    findUser({email, pass}){
        let userData = PERMITED_USERS.filter(data => data.email === email && data.pass === pass)
        return userData
    }
}
