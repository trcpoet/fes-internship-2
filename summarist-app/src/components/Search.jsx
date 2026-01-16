import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAudioDuration } from "../hooks/useAudioDuration";
import { formatDuration } from "../utils/formatDuration";

// Skeleton Component
function SearchSkeleton() {
  return (
    <div className="search__book--link" style={{ pointerEvents: "none" }}>
      <div className="book__image--wrapper" style={{ height: "80px", width: "80px", minWidth: "80px", background: "#e1e7ea" }}></div>
      <div style={{ width: "100%", marginLeft: "24px" }}>
        <div style={{ height: "16px", width: "70%", background: "#e1e7ea", marginBottom: "8px", borderRadius: "4px" }}></div>
        <div style={{ height: "14px", width: "40%", background: "#e1e7ea", marginBottom: "8px", borderRadius: "4px" }}></div>
        <div style={{ height: "14px", width: "20%", background: "#e1e7ea", borderRadius: "4px" }}></div>
      </div>
    </div>
  );
}

function SearchResultItem({ book, onClick }) {
  const seconds = useAudioDuration(book.audioLink);

  return (
    <Link 
      to={`/book/${book.id}`} 
      className="search__book--link"
      onClick={onClick}
    >
      <figure
        className="book__image--wrapper"
        style={{ height: "80px", width: "80px", minWidth: "80px" }}
      >
        <img
          className="book__image"
          src={book.imageLink}
          alt={book.title}
          style={{ display: "block" }}
        />
      </figure>
      <div>
        <div className="search__book--title">{book.title}</div>
        <div className="search__book--author">{book.author}</div>
        <div className="search__book--duration">
          <div className="recommended__book--details">
            <div className="recommended__book--details-icon">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                <path d="M13 7h-2v6h6v-2h-4z"></path>
              </svg>
            </div>
            <div className="recommended__book--details-text">
              {formatDuration(seconds)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allBooks, setAllBooks] = useState([]);

  // Fetch all books on mount
  useEffect(() => {
    async function fetchBooks() {
      try {
        const [recRes, sugRes] = await Promise.all([
          fetch(
            "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
          ),
          fetch(
            "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
          ),
        ]);

        const recData = await recRes.json();
        const sugData = await sugRes.json();

        const combined = [
          ...(Array.isArray(recData) ? recData : []),
          ...(Array.isArray(sugData) ? sugData : []),
        ];
        
        // Remove duplicates
        const unique = Array.from(new Map(combined.map(b => [b.id, b])).values());
        setAllBooks(unique);
      } catch (error) {
        console.error("Failed to fetch search data", error);
      }
    }
    fetchBooks();
  }, []);

  // Debounce logic
  useEffect(() => {
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      const lowerQ = query.toLowerCase();
      const filtered = allBooks.filter(
        (b) =>
          (b.title?.toLowerCase() || "").includes(lowerQ) ||
          (b.author?.toLowerCase() || "").includes(lowerQ)
      );
      setResults(filtered);
      setLoading(false);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [query, allBooks]);

  return (
    <div className="search__content">
      <div className="search">
        <div className="search__input--wrapper">
          <input
            className="search__input"
            placeholder="Search for books"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="search__icon" style={{display: "flex", alignItems: "center"}}>
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 1 0 14 15.5l.27.28h.79L20 21.5 21.5 20l-6-6zM9.5 14A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Results Dropdown */}
      {query && (
        <div className="search__books--wrapper">
          {loading ? (
             <>
               <SearchSkeleton />
               <SearchSkeleton />
               <SearchSkeleton />
             </>
          ) : results.length > 0 ? (
            results.map((book) => (
              <SearchResultItem 
                key={book.id} 
                book={book} 
                onClick={() => setQuery("")} 
              />
            ))
          ) : (
            <div className="no-books">No results found.</div>
          )}
        </div>
      )}
    </div>
  );
}
