import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const getBooks = () => api.get("/books");
export const createBook = (data: any) => api.post("/books", data);
export const deleteBook = (id: number) => api.delete(`/books/${id}`);