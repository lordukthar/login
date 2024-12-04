const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');

// Create a new Express application
const app = express();
app.use(cors());
app.use(express.json());

// Configure PostgreSQL connection
const pool = new Pool({
  user: 'myuser',
  host: 'localhost',
  database: 'mydb',
  password: 'mypassword',
  port: 5432,
});

// Check database connection
pool.connect((err, client, done) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
  } else {
    console.log('Database connected');
  }
  done();
});

app.delete('/presents', async (req, res) => {
  const { name, wisher } = req.body;

  try {
    // Delete the present matching the name and wisher
    const result = await pool.query(
      'DELETE FROM presents WHERE name = $1 AND wisher = $2',
      [name, wisher]
    );

    // Check if any rows were deleted
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Present not found' });
    }

    res.status(200).json({ message: 'Present deleted successfully' });
  } catch (err) {
    console.error('Error during delete process:', err.message);
    res.status(500).send('Server Error');
  }
});

// Define the /users endpoint to fetch all users
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/session', async (req, res) => {
  const { sessionToken } = req.query;

  try {
    const sessionResult = await pool.query('SELECT * FROM sessions WHERE session_token = $1 AND expires_at > CURRENT_TIMESTAMP', [sessionToken]);

    if (sessionResult.rows.length > 0) {
      res.json(sessionResult.rows[0]);
    } else {
      res.status(404).json({ message: 'Session not found or expired' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3)', [username, hashedPassword, email]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during registration process:', err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching items:', err.message);
    res.status(500).send('Server Error');
  }
});

app.delete('/items/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM items WHERE id = $1', [id]);
    if (result.rowCount > 0) {
      res.status(200).json({ message: 'Item deleted successfully' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (err) {
    console.error('Error deleting item:', err.message);
    res.status(500).send('Server Error');
  }
});

app.put('/items/:id', async (req, res) => {
  const { id } = req.params;
  const { href, name, price, description, wisher, bought, buyer } = req.body;

  try {
    const result = await pool.query(
      'UPDATE items SET href = $1, name = $2, price = $3, description = $4, wisher = $5, bought = $6, buyer = $7 WHERE id = $8',
      [href, name, price, description, wisher, bought, buyer, id]
    );

    if (result.rowCount > 0) {
      res.status(200).json({ message: 'Item updated successfully' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (err) {
    console.error('Error updating item:', err.message);
    res.status(500).send('Server Error');
  }
});


app.post('/items', async (req, res) => {
  const { href, name, price, description, wisher } = req.body;

  try {
    await pool.query(
      'INSERT INTO items (href, name, price, description, wisher, bought, buyer) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [href, name, price, description, wisher, false, '']
    );
    res.status(201).json({ message: 'Item inserted successfully' });
  } catch (err) {
    console.error('Error inserting item:', err.message);
    res.status(500).send('Server Error');
  }
});




app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userResult = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    if (userResult.rows.length > 0) {
      const user = userResult.rows[0];
      const sessionToken = uuidv4();
      const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 5 minutes from now

      await pool.query('INSERT INTO sessions (user_id, session_token, expires_at) VALUES ($1, $2, $3)', [user.id, sessionToken, expiresAt]);

      res.json({ sessionToken, user });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

