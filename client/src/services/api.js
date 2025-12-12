// src/services/api.js
const API_BASE_URL = "http://localhost:3000";

export async function registerVerifier(formData) {
  try {
    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] instanceof File) payload.append(key, formData[key]);
      else payload.append(key, formData[key]);
    });

    const response = await fetch(`${API_BASE_URL}/verifier/register`, {
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

export async function loginVerifier(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/verifier/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Login failed");
    return data;
  } catch (error) {
    throw error;
  }
}

// Add more API functions here in the future, e.g., fetch verifier dashboard, reset password, etc.
