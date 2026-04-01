import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// 🔥 inject token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getBooks = () => api.get("/books");
export const createBook = (data: any) => api.post("/books", data);
export const updateBook = (id: number, data: any) =>
  api.put(`/books/${id}`, data);
export const deleteBook = (id: number) => api.delete(`/books/${id}`);
