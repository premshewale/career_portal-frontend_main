import api from "../api/axios";
export const registerCandidate = (payload) =>
  api.post("/auth/register/candidate", payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
