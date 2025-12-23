const db = require("../config/db");

const Admin = {
  findAdmin: async () => {
    const { rows } = await db.query("SELECT * FROM admins LIMIT 1");
    return rows[0];
  }
};

module.exports = Admin;
