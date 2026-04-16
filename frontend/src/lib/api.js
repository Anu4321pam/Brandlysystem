import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

export const auditWebsite = (url) =>
  api.post("/audit/website", { url }).then((r) => r.data);

export const auditGmb = (payload) =>
  api.post("/audit/gmb", payload).then((r) => r.data);

export const createLead = (payload) =>
  api.post("/leads", payload).then((r) => r.data);

export const createConsultation = (payload) =>
  api.post("/consultations", payload).then((r) => r.data);

export const listConsultations = () =>
  api.get("/consultations").then((r) => r.data);

export const listLeads = () =>
  api.get("/leads").then((r) => r.data);
