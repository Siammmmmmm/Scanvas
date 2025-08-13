// backend/index.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Files go in 'uploads/' folder


// Middleware
app.use(cors());
app.use(express.json());

//root route
app.get('/', (req, res) => {
  res.send('Scanvas Renderer Backend');
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/upload', upload.single('file'), (req, res) => {
  // req.file now has your PSD!
  // e.g., req.file.path is the temp path to your file
  res.json({ success: true });
});


// Placeholder for future /upload endpoint
// app.post('/upload', ...);

app.listen(PORT, () => {
  console.log(`Renderer backend running on http://localhost:${PORT}`);
});
