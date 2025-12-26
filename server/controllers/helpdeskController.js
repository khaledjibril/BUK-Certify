import pool from "../config/db.js";
import transporter from "../services/emailService.js";

/* ================= CREATE TICKET (USER) ================= */
export const createTicket = async (req, res) => {
  const { name, email, category, message } = req.body;

  if (!name || !email || !category || !message) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const result = await pool.query(
      `
      INSERT INTO helpdesk_tickets (name, email, category, message, status)
      VALUES ($1, $2, $3, $4, 'open')
      RETURNING *
      `,
      [name, email, category, message]
    );

    res.status(201).json({
      message: "Support ticket created successfully",
      ticket: result.rows[0],
    });
  } catch (error) {
    console.error("HelpDesk Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

/* ================= GET ALL TICKETS (ADMIN) ================= */
export const getAllTickets = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM helpdesk_tickets
      ORDER BY created_at DESC
      `
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Fetch Tickets Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* ================= CLOSE TICKET + EMAIL (ADMIN) ================= */
export const closeTicket = async (req, res) => {
  const { id } = req.params;
  const { reply } = req.body;

  if (!reply) {
    return res.status(400).json({ message: "Reply message is required" });
  }

  try {
    const ticketRes = await pool.query(
      "SELECT * FROM helpdesk_tickets WHERE id = $1",
      [id]
    );

    if (!ticketRes.rows.length) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    const ticket = ticketRes.rows[0];

    await pool.query(
      `
      UPDATE helpdesk_tickets
      SET status = 'closed',
          admin_reply = $1
      WHERE id = $2
      `,
      [reply, id]
    );

    // Send email to user
    await transporter.sendMail({
      from: `"BUK Certify Support" <${process.env.MAIL_USER}>`,
      to: ticket.email,
      subject: "Your Support Ticket Has Been Resolved",
      text: reply,
    });

    res.json({
      message: "Ticket closed successfully and email sent",
    });
  } catch (error) {
    console.error("Close Ticket Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
