
const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
  nome: { type: String, required: true }, 
  idade: { type: Number, required: true }, 
  raca: { type: String, required: true } 
});

const Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet;
