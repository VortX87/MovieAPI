const { db } = require('.')
const { movieData, userData } = require('./seedData');
const { User, Movie } = require('../models')

let populateDataBase = async () => {
    await db.sync({ force: true });
    await Promise.all(userData.map((c) => { User.create(c) }))
    await Promise.all(movieData.map((c) => { Movie.create(c) }))

};

let buildDB = async () => {
    await populateDataBase()
}

module.exports = { buildDB }