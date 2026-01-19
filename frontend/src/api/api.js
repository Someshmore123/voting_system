import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const signup = (data) => API.post("/api/users/signup", data);
export const login = (data) => API.post("/api/users/login", data);

export const getProfile = () => API.get("/api/users/profile");
export const changePassword = (data) =>
  API.put("/api/users/profile/password", data);

export const getCandidates = () => API.get("/api/candidates");
export const voteCandidate = (id) =>
  API.post(`/api/candidates/vote/${id}`);

export const getVoteCount = () =>
  API.get("/api/candidates/vote/count");

export const addCandidate = (data) =>
  API.post("/api/candidates", data);
export const deleteCandidate = (id) =>
  API.delete(`/api/candidates/${id}`);
