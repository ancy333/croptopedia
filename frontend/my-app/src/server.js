const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection - update 'crops' with your actual database name
mongoose.connect('mongodb://localhost:27017/crops', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema matching the existing collection, modify fields as necessary
const cropSchema = new mongoose.Schema({
  nitrogen: Number,
  phosphorus: Number,
  potassium: Number,
  temperature: Number,
  pH: Number,
  humidity: Number,
  rainfall: Number,
}, { collection: 'sample' }); // replace with your existing collection name

// Connect to the existing collection
const Crop = mongoose.model('Crop', cropSchema);

// API endpoint to save data to the existing collection
app.post('/api/crops', async (req, res) => {
  try {
    const crop = new Crop(req.body);
    await crop.save();
    res.status(201).send(crop);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
