import mongoose, { Schema } from "mongoose";

const PokemonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    generation: {
        type: String,
        required: true
    },
    personality: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    abilities: [{
        type: Schema.Types.ObjectId,
        ref: "Ability",
    }]

});

const Pokemon = mongoose.model('Pokemon',PokemonSchema);

export default Pokemon;