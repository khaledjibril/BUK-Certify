// services/certificateApi.js

const BASE_URL = "http://localhost:5000/api/certificate";

async function handleResponse(res) {
  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error("Invalid server response");
  }

  if (!res.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data;
}

export const certificateApi = {
  async list() {
    const res = await fetch(BASE_URL);
    return handleResponse(res);
  },

  async upload(formData) {
    const res = await fetch(BASE_URL, {
      method: "POST",
      body: formData,
    });
    return handleResponse(res);
  },

  async revoke(id) {
    const res = await fetch(`${BASE_URL}/${id}/revoke`, {
      method: "PUT",
    });
    return handleResponse(res);
  },
};
