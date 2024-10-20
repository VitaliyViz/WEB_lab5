import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Ship from './models/shipModel.mjs';

const app = express();
const PORT = 5000;

mongoose.connect('mongodb+srv://Vitaliy_WEB:1y9ac4hmpPtFAZnM@lab5.kpl77.mongodb.net/ships?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB підключено'))
    .catch(err => console.error('Помилка підключення до MongoDB:', err));

app.use(cors());
app.use(express.json());

app.post('/ships', async (req, res) => {
    try {
        const { Name, weight } = req.body;

        if (!Name || !weight) {
            return res.status(400).json({ error: 'Необхідно вказати назву та вагу корабля.' });
        }

        const newShip = new Ship({ Name, weight });
        await newShip.save();
        res.status(201).json(newShip);
    } catch (err) {
        console.error('Помилка при створенні корабля:', err);
        res.status(400).json({ error: 'Помилка при створенні корабля: ' + err.message });
    }
});

app.get('/ships', async (req, res) => {
    try {
        const ships = await Ship.find();
        res.json(ships);
    } catch (err) {
        res.status(500).send('Помилка при отриманні кораблів: ' + err.message);
    }
});

app.get('/ships/:id', async (req, res) => {
    try {
        const ship = await Ship.findById(req.params.id);
        if (!ship) {
            return res.status(404).send('Корабель не знайдено');
        }
        res.json(ship);
    } catch (err) {
        res.status(500).send('Помилка при отриманні корабля: ' + err.message);
    }
});

app.put('/ships/:id', async (req, res) => {
    try {
        const updatedShip = await Ship.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedShip) {
            return res.status(404).send('Корабель не знайдено для оновлення');
        }
        res.json(updatedShip);
    } catch (err) {
        res.status(400).send('Помилка при оновленні корабля: ' + err.message);
    }
});

app.delete('/ships/:id', async (req, res) => {
    try {
        const deletedShip = await Ship.findByIdAndDelete(req.params.id);
        if (!deletedShip) {
            return res.status(404).send('Корабель не знайдено для видалення');
        }
        res.json({ message: 'Корабель успішно видалено' });
    } catch (err) {
        res.status(500).send('Помилка при видаленні корабля: ' + err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Сервер працює на http://localhost:${PORT}`);
});
