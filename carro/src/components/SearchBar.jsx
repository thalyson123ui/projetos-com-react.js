import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Pesquise por modelo (ex: Ferrari, Gol, Civic)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: 10, width: 300 }}
      />
      <button type="submit" style={{ padding: 10, marginLeft: 10 }}>
        Buscar
      </button>
    </form>
  );
}
