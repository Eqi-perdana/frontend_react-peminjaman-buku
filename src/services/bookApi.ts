import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/books";

export const getBooks = () => axios.get(API_URL);
export const createBook = (data: any) => axios.post(API_URL, data);
export const updateBook = (id: number, data: any) =>
  axios.put(`${API_URL}/${id}`, data);
export const deleteBook = (id: number) => axios.delete(`${API_URL}/${id}`);
