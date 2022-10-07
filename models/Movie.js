const { DataTypes, db } = require('../db');

const Movie = db.define('movie', {
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    rating: DataTypes.INTEGER,
});

module.exports = { Movie };