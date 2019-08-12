const config = {}

config.JWT_KEY = 'segredoparaapi'
config.PERMITED_USERS = [
    {id: 1,email: 'samreis@gmail.com', pass: '123456'},
    {id: 2,email: 'unknown@gmail.com', pass: 'idk123'},
    {id: 3,email: 'ilovecode@gmail.com', pass: '245212'},
]
config.MONGO_URL =  'mongodb://localhost:27017'
module.exports = config