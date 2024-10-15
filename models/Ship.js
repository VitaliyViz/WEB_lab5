const mongoose = require('mongoose');

const shipSchema = new mongoose.Schema({
    Name: { type: String, required: true, minlength: 3, maxlength: 20 },
    weight: { type: Number, required: true, min: 1, max: 1000 }
});

const Ship = mongoose.model('Ship', shipSchema);
module.exports = Ship;
