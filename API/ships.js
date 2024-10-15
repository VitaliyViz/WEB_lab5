const express = require('express');
const router = express.Router();
const Ship = require('../models/Ship');

// GET: Отримати всі кораблі
router.get('/', async (req, res) => {
    const ships = await Ship.find();
    res.json(ships);
});

// POST: Додати новий корабель
router.post('/', async (req, res) => {
    const { Name, weight } = req.body;
    const newShip = new Ship({ Name, weight });
    await newShip.save();
    res.status(201).json(newShip);
});

// PUT: Оновити корабель
router.put('/:id', async (req, res) => {
    const { Name, weight } = req.body;
    const updatedShip = await Ship.findByIdAndUpdate(req.params.id, { Name, weight }, { new: true });
    res.json(updatedShip);
});

// DELETE: Видалити корабель
router.delete('/:id', async (req, res) => {
    await Ship.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

module.exports = router;
