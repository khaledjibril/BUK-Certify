const db = require("../config/db");

class Verifier {
  static async getAll() {
    const { rows } = await db.query(
      `SELECT * FROM verifiers WHERE deleted_at IS NULL ORDER BY created_at DESC`
    );
    return rows;
  }

  static async approve(id) {
    const { rows } = await db.query(
      `UPDATE verifiers
       SET is_approved = true,
           status = 'approved',
           approved_at = NOW(),
           rejected_at = NULL
       WHERE id = $1
       RETURNING *`,
      [id]
    );
    return rows[0];
  }

  static async reject(id) {
    const { rows } = await db.query(
      `UPDATE verifiers
       SET is_approved = false,
           status = 'rejected',
           rejected_at = NOW()
       WHERE id = $1
       RETURNING *`,
      [id]
    );
    return rows[0];
  }

  static async softDelete(id) {
    const { rows } = await db.query(
      `UPDATE verifiers
       SET status = 'deleted',
           deleted_at = NOW()
       WHERE id = $1
       RETURNING *`,
      [id]
    );
    return rows[0];
  }

  static async bulkApprove(ids) {
    const { rows } = await db.query(
      `UPDATE verifiers
       SET is_approved = true,
           status = 'approved',
           approved_at = NOW()
       WHERE id = ANY($1::int[])
       RETURNING *`,
      [ids]
    );
    return rows;
  }
}

module.exports = Verifier;
