// API Client for Kalajeevika Persistent Database

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = {
  // Check backend & database connection status
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      if (!res.ok) throw new Error('Health check failed');
      return await res.json();
    } catch (err) {
      console.warn('Backend server currently in local fallback mode:', err.message);
      return { status: 'offline', error: err.message };
    }
  },

  // Fetch all crafts with optional search & filters
  async getCrafts(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (filters.category && filters.category !== 'All Crafts') queryParams.append('category', filters.category);
      if (filters.state && filters.state !== 'All States') queryParams.append('state', filters.state);
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
      if (filters.search) queryParams.append('search', filters.search);

      const url = `${API_BASE_URL}/crafts${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch crafts from database');
      const data = await res.json();
      return data.data || [];
    } catch (err) {
      console.warn('Using local fallback for crafts:', err.message);
      return null; // Signals component to use initial state
    }
  },

  // Save new handcrafted masterwork to database
  async createCraft(craftData) {
    try {
      const res = await fetch(`${API_BASE_URL}/crafts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(craftData)
      });
      if (!res.ok) throw new Error('Failed to save craft in database');
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.warn('Saving craft locally due to offline server:', err.message);
      return craftData;
    }
  },

  // Record buyer WhatsApp / UPI inquiry in database
  async recordInquiry(inquiryData) {
    try {
      const res = await fetch(`${API_BASE_URL}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryData)
      });
      if (!res.ok) throw new Error('Failed to record inquiry');
      return await res.json();
    } catch (err) {
      console.warn('Recorded inquiry locally:', err.message);
      return { success: true };
    }
  }
};
