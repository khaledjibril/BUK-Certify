import rateLimit from "express-rate-limit";

export const verifierLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: "Too many verification attempts. Try again later.",
});
