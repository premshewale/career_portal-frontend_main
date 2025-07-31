import api from "../api/axios";

export const login = (payload) => api.post("/auth/login", payload);
