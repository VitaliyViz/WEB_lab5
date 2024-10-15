const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const shipsAPI = require('./API/ships');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/shipsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use(bodyParser.json());
app.use(cors());
app.use('/api/ships', shipsAPI);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
