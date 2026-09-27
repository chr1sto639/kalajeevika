# 🪔 कलाजीविका • KALAJEEVIKA
### AI-Powered Folk Artisan & Agrarian Heritage Marketplace

[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v20+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Database](https://img.shields.io/badge/Database-Persistent%20JSON%20%2F%20SQLite-orange.svg)](#database-architecture)
[![Zero Middlemen](https://img.shields.io/badge/Artisan%20Direct-100%25%20UPI-emerald.svg)](#direct-fair-trade)

**Kalajeevika** (कलाजीविका — *Art & Livelihood*) is a fullstack web platform engineered to eliminate all technical and economic barriers for rural Indian folk artisans, potters, weavers, and agrarian smallholders by connecting them directly with patrons worldwide.

---

## 🌟 Key Innovations & Architecture

### 1. 🎨 Dedicated Artisan Portal (`/studio` & `/dashboard`)
* **Camera Viewfinder with Framing Reticle**: Rural artisans can snap their craft in seconds with zero technical friction.
* **Native Dialect Speech-to-Text**: Voice recording supporting **Hindi**, **English (India)**, **Bengali**, **Tamil**, **Telugu**, **Marathi**, and **Gujarati**.
* **AI Folklore Polisher**: Converts spoken dialect into an evocative, buyer-ready provenance story.
* **Spoken Audio Guide (बोलकर सुनें)**: Interactive audio guidance on every step for low-literacy users.
* **Artisan Catalog & Earnings Tracker**: Manage inventory, view direct payout statistics, and print certificates.

### 2. 🛍️ Dedicated Buyer Haat (`/marketplace`)
* **Curated Geographical Indication (GI) Crafts**: Filter by tradition (Madhubani, Terracotta, Blue Pottery, Dhokra, Channapatna Toys).
* **Audio Story Player**: Patrons can listen to the folklore and creator voice directly on each craft card.
* **100% Direct Trade with Zero Commission**:
  * Direct WhatsApp chat trigger with pre-filled greeting and craft metadata.
  * Direct UPI mobile deep link (`upi://pay`) for Google Pay, PhonePe, and Paytm.

### 3. ⚖️ AI Market Price Intelligence Engine
* **Fair Living Wage Formulation**:
  $$\text{Fair Price} = \Big(\text{Raw Material Cost} + (\text{Labor Hours} \times \text{Fair Living Hourly Wage})\Big) \times \text{Complexity Multiplier} + \text{Emergency Savings Fund}$$
* **Middleman vs Direct Comparison**: Transparently exposes exploitative 50%+ trader markups and guarantees 75%–85% direct income to creators.

### 4. 📜 Official Certificate of Authenticity & GI Tag Card
* Printable & shareable certificates with unique verification IDs, craftsperson digital signature, materials breakdown, and QR verification stamp.

---

## 🗄️ Database Architecture & REST API

The platform uses a persistent JSON document store with full SQLite compatibility located at `server/data/kalajeevika_db.json`.

### REST API Endpoints:
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | System health, uptime & DB connection stats |
| `GET` | `/api/crafts` | List all crafts (supports filters: `category`, `state`, `search`, `maxPrice`) |
| `GET` | `/api/crafts/:id` | Fetch detailed craft data by ID |
| `POST` | `/api/crafts` | Publish new handcrafted piece to persistent database |
| `POST` | `/api/inquiries` | Record buyer WhatsApp inquiry or UPI checkout intent |
| `GET` | `/api/stats` | Platform-wide community analytics & total catalog valuation |

---

## 🚀 Quick Start (Local Development)

### Prerequisites:
* Node.js v18+ & npm

### Installation:
```bash
# 1. Clone repository
git clone https://github.com/your-username/kalajeevika.git
cd kalajeevika

# 2. Install dependencies
npm install

# 3. Start fullstack app (Frontend + Backend Database)
# Terminal 1: Start Backend API & Database (Port 3001)
npm run server

# Terminal 2: Start Vite Frontend (Port 5173)
npm run dev
```

Visit **http://localhost:5173/** in your browser!

---

## 🌐 Production Deployment

### Option A: Unified Fullstack on Render / Railway / Heroku
The server automatically serves the built React frontend (`dist/`) in production!
```bash
# Build frontend and start production server on a single port
npm run build
npm start
```
* **Render**: Use `render.yaml` included in the root directory.
* **Railway**: Point to the repository and set start command to `npm start`.

### Option B: Frontend on Vercel
* Connect the repo to Vercel.
* The included `vercel.json` handles rewrites for single-page routing and serverless routing.

---

## 📤 Push to GitHub Guide

If you haven't initialized your Git repository yet:

```bash
# 1. Initialize Git
git init

# 2. Add all project files
git add .

# 3. Commit
git commit -m "Initial commit: Kalajeevika AI Artisan Platform with Database"

# 4. Link to your GitHub repository
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/kalajeevika.git

# 5. Push to GitHub
git push -u origin main
```

---

## 📜 Cultural Heritage Acknowledgements
Dedicated to the generational hands across Indian villages—Mithila, Bastar, Bankura, Jaipur, Channapatna, and Palghar—that mould earth, carve wood, and weave timeless heritage.
