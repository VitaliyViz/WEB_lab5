import mongoose from 'mongoose';

const shipSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    weight: { type: Number, required: true }
});

const Ship = mongoose.model('Ship', shipSchema);
export default Ship;
