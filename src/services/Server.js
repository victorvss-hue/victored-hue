require("dotenv").config(); 

const express = require("express"); 
const mongoose = require("mongoose"); 

const app = express(); 

const PORT = process.env.PORT || 5000;

const MONGO_URI = process.env.MONGO_URI;


mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB conectado com sucesso!"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

app.use(express.json()); 

const Pet = require("./models/Pet");


app.post("/pets", async (req, res) => {
  try {
    const pet = new Pet(req.body); 
    await pet.save();
    res.status(201).json(pet); 
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
});


app.get("/pets", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/pets/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id); 
    if (!pet) return res.status(404).json({ error: "Pet não encontrado" });
    res.json(pet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.put("/pets/:id", async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
    if (!pet) return res.status(404).json({ error: "Pet não encontrado" });
    res.json(pet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.delete("/pets/:id", async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id); 
    if (!pet) return res.status(404).json({ error: "Pet não encontrado" });
    res.json({ message: "Pet removido com sucesso" }); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
