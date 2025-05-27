export default function SearchInput({ searchByMovie }) {
  return (
    <div className="mb-4">
      <input
        onChange={(e) => searchByMovie(e.target.value)}
        type="text"
        placeholder="🔍 Search for a movie..."
        className="form-control bg-dark text-light border-0 rounded-4 p-3 shadow"
        style={{
          fontSize: "1.1rem",
          outline: "none",
        }}
      />
    </div>
  );
}
