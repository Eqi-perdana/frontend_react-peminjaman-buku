import { useEffect, useState } from "react";
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../../services/bookApi";

interface Books {
  id?: number;
  title: string;
  author: string;
  publisher: string;
  year: number;
  stock: number;
}

export default function Books() {
  const [books, setBooks] = useState<Books[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState<Books>({
    title: "",
    author: "",
    publisher: "",
    year: new Date().getFullYear(),
    stock: 0,
  });

  const [editId, setEditId] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getBooks();
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (editId) {
        await updateBook(editId, form);
      } else {
        await createBook(form);
      }

      setForm({
        title: "",
        author: "",
        publisher: "",
        year: new Date().getFullYear(),
        stock: 0,
      });

      setEditId(null);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (b: Books) => {
    setForm(b);
    setEditId(b.id!);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus buku?")) return;
    await deleteBook(id);
    fetchData();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📚 Data Buku</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          placeholder="Judul Buku"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          style={styles.input}
          placeholder="Penulis"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />

        <input
          style={styles.input}
          placeholder="Penerbit"
          value={form.publisher}
          onChange={(e) => setForm({ ...form, publisher: e.target.value })}
        />

        <input
          style={styles.input}
          type="number"
          placeholder="Tahun"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
        />

        <input
          style={styles.input}
          type="number"
          placeholder="Stok"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
        />

        <button style={styles.button}>{editId ? "Update" : "Tambah"}</button>
      </form>

      {/* TABLE */}
      <div style={styles.tableWrapper}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>No</th>
                <th>Judul</th>
                <th>Penulis</th>
                <th>Penerbit</th>
                <th>Tahun</th>
                <th>Stok</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {books.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center" }}>
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                books.map((b, i) => (
                  <tr key={b.id}>
                    <td>{i + 1}</td>
                    <td>{b.title}</td>
                    <td>{b.author}</td>
                    <td>{b.publisher}</td>
                    <td>{b.year}</td>
                    <td>{b.stock}</td>
                    <td>
                      <button
                        style={styles.editBtn}
                        onClick={() => handleEdit(b)}
                      >
                        Edit
                      </button>
                      <button
                        style={styles.deleteBtn}
                        onClick={() => handleDelete(b.id!)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

/* STYLE */
const styles: any = {
  container: {
    padding: "30px",
    background: "#f1f5f9",
    minHeight: "100vh",
  },
  title: {
    marginBottom: "20px",
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  tableWrapper: {
    background: "#fff",
    borderRadius: "10px",
    padding: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  editBtn: {
    background: "#22c55e",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    marginRight: "5px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
