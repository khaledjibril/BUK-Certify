import axios from "axios";

const api = axios.create({
  baseURL: "http://buk-certify-backend.onrender.com/api",
});

export const verifierApi = {
  verifyCertificate: async ({ uvc, certificateNumber }) => {
    const res = await api.post("/verifier/verify", {
      uvc,
      certificateNumber,
    });
    return res.data;
  },

  requestUvc: async ({ requestedLimit, reason }) => {
    const res = await api.post("/verifier/uvc/request", {
      requestedLimit,
      reason,
    });
    return res.data;
  },

  getUvcStatus: async () => {
    const res = await api.get("/verifier/uvc/status");
    return res.data;
  },
};
