import { useEffect, useState } from "react";
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../../services/bookApi";
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
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const initialForm: Book = {
    title: "",
    author: "",
    publisher: "",
    year: new Date().getFullYear(),
    stock: 0,
  };

  const [form, setForm] = useState<Book>(initialForm);
  const [editId, setEditId] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getBooks();
      // Pastikan mengambil res.data.data jika Laravel kamu menggunakan resource/pagination
      const data = Array.isArray(res.data) ? res.data : res.data.data || [];
      setBooks(data);
    } catch (err: any) {
      console.error("Gagal mengambil data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi sederhana di Frontend
    if (!form.title || !form.author) {
      alert("Judul dan Penulis wajib diisi!");
      return;
    }

    try {
      setSubmitting(true);
      if (editId) {
        await updateBook(editId, form);
        alert("Buku berhasil diperbarui!");
      } else {
        await createBook(form);
        alert("Buku berhasil ditambahkan!");
      }

      setForm(initialForm);
      setEditId(null);
      fetchData();
    } catch (err: any) {
      // Menampilkan detail error dari server (Laravel)
      const errorMsg =
        err.response?.data?.message || "Terjadi kesalahan pada server";
      alert("Gagal menyimpan: " + errorMsg);
      console.error("Detail Error:", err.response?.data);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (b: Book) => {
    setEditId(b.id!);
    setForm({
      title: b.title,
      author: b.author,
      publisher: b.publisher,
      year: b.year,
      stock: b.stock,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
      try {
        await deleteBook(id);
        fetchData();
      } catch (err) {
        alert("Gagal menghapus buku");
      }
    }
  };

  return (
    <div className="books-container">
      <h1 className="books-title">Library Management</h1>

      <div className="card">
        <h3>{editId ? "📝 Edit Buku" : "➕ Tambah Buku Baru"}</h3>
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="input-group">
            <label htmlFor="title">Book Title</label>
            <input
              id="title"
              className="input-field"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Contoh: Laskar Pelangi"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="author">Author</label>
            <input
              id="author"
              className="input-field"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              placeholder="Nama penulis"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="publisher">Publisher</label>
            <input
              id="publisher"
              className="input-field"
              value={form.publisher}
              onChange={(e) => setForm({ ...form, publisher: e.target.value })}
              placeholder="Nama penerbit"
            />
          </div>

          <div className="input-group">
            <label htmlFor="year">Year</label>
            <input
              id="year"
              type="number"
              className="input-field"
              value={form.year}
              onChange={(e) =>
                setForm({ ...form, year: Number(e.target.value) })
              }
            />
          </div>

          <div className="input-group">
            <label htmlFor="stock">Stock</label>
            <input
              id="stock"
              type="number"
              className="input-field"
              value={form.stock}
              onChange={(e) =>
                setForm({ ...form, stock: Number(e.target.value) })
              }
            />
          </div>

          <div style={{ gridColumn: "1/-1", marginTop: "10px" }}>
            <button type="submit" disabled={submitting} className="btn-primary">
              {submitting
                ? "⏳ Menyimpan..."
                : editId
                  ? "Update Buku"
                  : "Simpan Buku"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setForm(initialForm);
                }}
                className="btn-secondary"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="table-card">
        {loading ? (
          <p style={{ padding: "20px", textAlign: "center" }}>
            Memuat data buku...
          </p>
        ) : (
          <table className="books-table">
            <thead>
              <tr>
                <th className="th-field">Title</th>
                <th className="th-field">Author</th>
                <th className="th-field">Stock</th>
                <th className="th-field" style={{ textAlign: "center" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? (
                books.map((b) => (
                  <tr key={b.id}>
                    <td className="td-field">{b.title}</td>
                    <td className="td-field">{b.author}</td>
                    <td className="td-field">{b.stock}</td>
                    <td className="td-field" style={{ textAlign: "center" }}>
                      <button
                        onClick={() => handleEdit(b)}
                        className="btn-edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => b.id && handleDelete(b.id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    Tidak ada data buku.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
