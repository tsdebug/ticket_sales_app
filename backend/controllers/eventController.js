// backend/controllers/eventController.js
const oracledb = require('oracledb');
const dbConfig = require('../config/db');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

// Create a new event
exports.createEvent = async (req, res) => {
  const { title, description, event_date, location, ticket_price, total_tickets } = req.body;

  try {
    const conn = await oracledb.getConnection(dbConfig);
    const result = await conn.execute(
      `INSERT INTO events (title, description, event_date, location, ticket_price, total_tickets)
       VALUES (:title, :description, TO_DATE(:event_date, 'YYYY-MM-DD'), :location, :ticket_price, :total_tickets)`,
      { title, description, event_date, location, ticket_price, total_tickets },
      { autoCommit: true }
    );
    res.status(201).json({ message: 'Event created successfully' });
    await conn.close();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create event' });
  }
};

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const conn = await oracledb.getConnection(dbConfig);
    const result = await conn.execute(`SELECT * FROM events`);
    res.status(200).json(result.rows);
    await conn.close();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// Get event by ID
exports.getEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const conn = await oracledb.getConnection(dbConfig);
    const result = await conn.execute(
      `SELECT * FROM events WHERE id = :id`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(result.rows[0]);
    await conn.close();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

// Update an event
exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, event_date, location, ticket_price, total_tickets } = req.body;

  try {
    const conn = await oracledb.getConnection(dbConfig);
    await conn.execute(
      `UPDATE events
       SET title = :title,
           description = :description,
           event_date = TO_DATE(:event_date, 'YYYY-MM-DD'),
           location = :location,
           ticket_price = :ticket_price,
           total_tickets = :total_tickets
       WHERE id = :id`,
      { title, description, event_date, location, ticket_price, total_tickets, id },
      { autoCommit: true }
    );
    res.status(200).json({ message: 'Event updated successfully' });
    await conn.close();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update event' });
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const conn = await oracledb.getConnection(dbConfig);
    await conn.execute(`DELETE FROM events WHERE id = :id`, [id], { autoCommit: true });
    res.status(200).json({ message: 'Event deleted successfully' });
    await conn.close();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete event' });
  }
};

// Ticket sales data
exports.getTicketSales = async (req, res) => {
  try {
    const conn = await oracledb.getConnection(dbConfig);
    const result = await conn.execute(`SELECT id, title, tickets_sold FROM events`);
    res.status(200).json(result.rows);
    await conn.close();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get ticket sales' });
  }
};

// Revenue analytics
exports.getRevenueInsights = async (req, res) => {
  try {
    const conn = await oracledb.getConnection(dbConfig);
    const result = await conn.execute(
      `SELECT id, title, tickets_sold, ticket_price, (tickets_sold * ticket_price) AS revenue FROM events`
    );
    res.status(200).json(result.rows);
    await conn.close();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get revenue insights' });
  }
};