const User = require("../models/userModel");

// GET /users
async function getUsers(req, res) {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
}
// PATCH /users/:id/status
async function updateStatus(req, res) {
  try {
    const { id } = req.params;
    const { status, adminName } = req.body;
    const user = await User.updateUserStatus(id, status, adminName);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update user status" });
  }
}

// PATCH /users/bulk-approve
async function bulkApprove(req, res) {
  try {
    const { userIds, adminName } = req.body;
    const users = await User.bulkApprove(userIds, adminName);
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to bulk approve users" });
  }
}

module.exports = {
  getUsers,
  updateStatus,
  bulkApprove,
};
