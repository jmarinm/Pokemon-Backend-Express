import mongoose, { Schema } from "mongoose";

const AbilitySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    power: {
        type: Number,
        required: true
    },
    accuracy: {
        type: Number,
        required: true
    },

});

const Ability = mongoose.model('Ability',AbilitySchema);

export default Ability;