import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Setup directories and JSON database
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'messages.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf-8');
}

// Helper to read/write database
const readMessages = () => {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading messages database:', err);
    return [];
  }
};

const writeMessages = (messages) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(messages, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing to messages database:', err);
    return false;
  }
};

// Middlewares
app.use(express.json());
app.use(express.static(__dirname));

// API Endpoint: Submit contact form
app.post('/api/contact', (req, finalRes) => {
  const { name, email, message } = req.body;
  
  // Validation
  if (!name || !name.trim()) {
    return finalRes.status(400).json({ success: false, error: 'Name is required' });
  }
  if (!email || !email.trim() || !email.includes('@')) {
    return finalRes.status(400).json({ success: false, error: 'A valid email is required' });
  }
  if (!message || !message.trim()) {
    return finalRes.status(400).json({ success: false, error: 'Message is required' });
  }

  const messages = readMessages();
  const newMessage = {
    id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    timestamp: new Date().toISOString()
  };

  messages.push(newMessage);
  
  if (writeMessages(messages)) {
    return finalRes.status(201).json({ success: true, message: 'Message saved successfully', data: newMessage });
  } else {
    return finalRes.status(500).json({ success: false, error: 'Failed to persist message on server' });
  }
});

// API Endpoint: Get all messages (for dashboard)
app.get('/api/messages', (req, finalRes) => {
  const messages = readMessages();
  // Sort descending by timestamp (newest first)
  const sortedMessages = [...messages].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  return finalRes.json(sortedMessages);
});

// API Endpoint: Delete a message by ID
app.delete('/api/messages/:id', (req, finalRes) => {
  const { id } = req.params;
  const messages = readMessages();
  const filteredMessages = messages.filter(msg => msg.id !== id);

  if (messages.length === filteredMessages.length) {
    return finalRes.status(404).json({ success: false, error: 'Message not found' });
  }

  if (writeMessages(filteredMessages)) {
    return finalRes.json({ success: true, message: 'Message deleted successfully' });
  } else {
    return finalRes.status(500).json({ success: false, error: 'Failed to delete message on server' });
  }
});

// Catch-all route to serve the dashboard or index page (optional, but good practice)
app.get('/dashboard', (req, finalRes) => {
  finalRes.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n🚀 MTC Server running at: http://localhost:${PORT}\n`);
});
