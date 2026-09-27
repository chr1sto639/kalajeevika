import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { db } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Support base64 photo payloads

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'Kalajeevika (कलाजीविका) Platform API',
    time: new Date().toISOString(),
    stats: db.getStats()
  });
});

// List all crafts with optional search & filtering
app.get('/api/crafts', (req, res) => {
  try {
    const { category, state, search, maxPrice } = req.query;
    const crafts = db.getAllCrafts({ category, state, search, maxPrice });
    res.json({ success: true, count: crafts.length, data: crafts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get single craft by ID
app.get('/api/crafts/:id', (req, res) => {
  try {
    const craft = db.getCraftById(req.params.id);
    if (!craft) {
      return res.status(404).json({ success: false, message: 'Craft not found' });
    }
    res.json({ success: true, data: craft });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Create and publish a new craft piece
app.post('/api/crafts', (req, res) => {
  try {
    const craftData = req.body;
    if (!craftData.title || !craftData.image) {
      return res.status(400).json({ success: false, message: 'Title and image are required.' });
    }

    const created = db.addCraft(craftData);
    res.status(201).json({ success: true, message: 'Craft published successfully', data: created });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Record a buyer direct inquiry or payment intent
app.post('/api/inquiries', (req, res) => {
  try {
    const inquiry = db.addInquiry(req.body);
    res.status(201).json({ success: true, message: 'Inquiry recorded', data: inquiry });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Platform stats
app.get('/api/stats', (req, res) => {
  res.json({ success: true, data: db.getStats() });
});

// Serve frontend in production
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    // Only route GET requests for HTML to index.html
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(distPath, 'index.html'));
    }
    next();
  });
}

app.listen(PORT, () => {
  console.log(`🪔 Kalajeevika Server & Database active at http://localhost:${PORT}`);
});
