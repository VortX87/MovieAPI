const { Movie } = require('./Movie')
const { User } = require('./User')

User.belongsToMany(Movie, { through: 'moviesDB' });
Movie.belongsToMany(User, { through: 'moviesDB' });

module.exports = {
    Movie,
    User
}