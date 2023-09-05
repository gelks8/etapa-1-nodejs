const express = require('express');
const router = express.Router();
const Evento = require('../models/Evento');

// Rota para criar um evento
router.post('/', async (req, res) => {
  try {
    const evento = new Evento(req.body);
    await evento.save();
    res.status(201).json(evento);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Rota para buscar todos os eventos
router.get('/', async (req, res) => {
  try {
    const eventos = await Evento.find();
    res.json(eventos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para editar um evento por ID
router.put('/:id', async (req, res) => {
  try {
    const evento = await Evento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(evento);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Rota para excluir um evento por ID
router.delete('/:id', async (req, res) => {
  try {
    await Evento.findByIdAndRemove(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
