// src/services/api.js
import axios from "axios";
const API_BASE_URL = "http://localhost:5000/api/verifiers";
const HELP_DESK_BASE_URL = "http://localhost:5000/api/helpdesk";

/* =========================
   VERIFIER AUTH APIS
========================= */

export async function registerVerifier(formData) {
  try {
    const payload = new FormData();

    Object.keys(formData).forEach((key) => {
      payload.append(key, formData[key]);
    });

    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      body: payload,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Registration failed");

    return data;
  } catch (error) {
    throw error;
  }
}

export async function loginVerifier(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Login failed");

    return data;
  } catch (error) {
    throw error;
  }
}

/* =========================
   HELP DESK API
========================= */

export async function submitHelpDeskTicket(formData) {
  try {
    const response = await fetch(`${HELP_DESK_BASE_URL}/ticket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to submit support ticket");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

/* ================================
   HELP DESK (ADMIN)
================================ */

export const getHelpdeskTickets = async () => {
  const res = await axios.get("http://localhost:5000/api/helpdesk");
  return res.data;
};

export const closeHelpdeskTicket = async (ticketId, reply) => {
  const res = await axios.put(
    `http://localhost:5000/api/helpdesk/${ticketId}/close`,
    { reply }
  );
  return res.data;
};