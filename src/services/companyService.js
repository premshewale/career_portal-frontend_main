import api from "../api/axios";
export const registerCompany = (payload) =>
  api.post("/auth/register/company", payload);
