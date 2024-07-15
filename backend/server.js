const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb://db:27017/resume-builder', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.json());

const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resume');

app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
