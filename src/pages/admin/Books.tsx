import React, { useEffect, useState } from "react";
import { getBooks, createBook, deleteBook } from "../../services/bookApi";
import "./Books.css";

interface Book {
  id?: number;
  title: string;
  author: string;
  publisher: string;
  year: number;
  stock: number;
}

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Book>({
    title: "",
    author: "",
    publisher: "",
    year: 2024,
    stock: 0,
  });

  const loadBooks = async () => {
    try {
      const res = await getBooks();
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching data");
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createBook(form);
      alert("Berhasil Menambah Buku!");
      setForm({ title: "", author: "", publisher: "", year: 2024, stock: 0 });
      loadBooks();
    } catch (err: any) {
      alert("Gagal: " + (err.response?.data?.message || "Cek Koneksi Server"));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Hapus buku ini?")) {
      try {
        await deleteBook(id);
        loadBooks();
      } catch (err) {
        alert("Gagal menghapus");
      }
    }
  };

  return (
    <div className="books-container">
      <h1 style={{ textAlign: "center", color: "#1e293b" }}>Library System</h1>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Tambah Buku</h3>
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="input-group">
            <label htmlFor="title">Judul Buku</label>
            <input
              id="title"
              className="input-field"
              value={form.title}
              placeholder="Masukkan judul"
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="author">Penulis</label>
            <input
              id="author"
              className="input-field"
              value={form.author}
              placeholder="Nama penulis"
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="publisher">Penerbit</label>
            <input
              id="publisher"
              className="input-field"
              value={form.publisher}
              placeholder="Nama penerbit"
              onChange={(e) => setForm({ ...form, publisher: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label htmlFor="year">Tahun Terbit</label>
            <input
              id="year"
              type="number"
              className="input-field"
              value={form.year}
              onChange={(e) =>
                setForm({ ...form, year: Number(e.target.value) })
              }
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="stock">Jumlah Stok</label>
            <input
              id="stock"
              type="number"
              className="input-field"
              value={form.stock}
              onChange={(e) =>
                setForm({ ...form, stock: Number(e.target.value) })
              }
              required
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Proses..." : "Simpan ke Database"}
          </button>
        </form>
      </div>

      <div className="table-card">
        <table className="books-table">
          <thead>
            <tr>
              <th>Judul</th>
              <th>Penulis</th>
              <th>Penerbit</th> {/* <-- Header Baru */}
              <th>Stok</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((b) => (
                <tr key={b.id}>
                  <td>
                    <strong>{b.title}</strong>
                  </td>
                  <td>{b.author}</td>
                  <td>{b.publisher || "-"}</td>{" "}
                  {/* <-- Data Baru (dengan fallback '-' jika kosong) */}
                  <td>{b.stock} unit</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => b.id && handleDelete(b.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  {" "}
                  {/* <-- colSpan diubah jadi 5 */}
                  Data Kosong
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
