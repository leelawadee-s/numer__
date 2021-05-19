const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Movie = new Schema(
    {
        name: { type: String, required: false },
        time: { type: String, required: false },
        rating: { type: String, required: false },
        n:{type: String, required: false}
    },
    { timestamps: true },
)

module.exports = mongoose.model('movies', Movie)