const getConnection = require("../config/db");
const oracledb = require("oracledb");

// Get all tickets
exports.getAllTickets = async (req, res) => {
  try {
    const conn = await getConnection();
    const result = await conn.execute("SELECT * FROM tickets", [], {
      outFormat: oracledb.OUT_FORMAT_OBJECT
    });
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Post a new ticket
exports.createTicket = async (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: "Name and price are required" });
  }

  try {
    const conn = await getConnection();
    await conn.execute(
      "INSERT INTO tickets (name, price) VALUES (:name, :price)",
      { name, price },
      { autoCommit: true }
    );
    res.status(201).json({ message: "Ticket created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Put - update ticket by ID
exports.updateTicket = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: "Name and price are required" });
  }

  try {
    const conn = await getConnection();
    const result = await conn.execute(
      "UPDATE tickets SET name = :name, price = :price WHERE id = :id",
      { name, price, id },
      { autoCommit: true }
    );

    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json({ message: "Ticket updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete ticket by ID
exports.deleteTicket = async (req, res) => {
  const { id } = req.params;

  try {
    const conn = await getConnection();
    const result = await conn.execute(
      "DELETE FROM tickets WHERE id = :id",
      { id },
      { autoCommit: true }
    );

    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json({ message: "Ticket deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};