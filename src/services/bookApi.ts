import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// Otomatis tempelkan token setiap kali kirim data
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Pastikan saat login, kamu simpan token dengan nama 'token'
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getBooks = () => api.get("/books");
export const createBook = (data: any) => api.post("/books", data);
export const deleteBook = (id: number) => api.delete(`/books/${id}`);
