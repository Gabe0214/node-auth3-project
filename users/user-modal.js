const db = require('../data/db')

module.exports = {
    find,
    insert,
    findBy,
    findByUsername
}


function find(){
    return db('user');
}


function insert(user){
    return db('user').insert(user)
    
}

function findBy(where){
    return db('user').where(where)
}

function findByUsername(username){
    return db('user').where({username: username}).first()
}