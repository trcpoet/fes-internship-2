// src/pages/ForYou.jsx
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAudioDuration } from "../hooks/useAudioDuration";
import { formatDuration } from "../utils/formatDuration";

function BookCard({ book, showPremiumPill }) {
  const showPill = showPremiumPill && book.subscriptionRequired;
  const seconds = useAudioDuration(book.audioLink);

  return (
    <Link to={`/book/${book.id}`} style={{ textDecoration: "none" }}>
      <div className="book-card" role="button" aria-label={`Open ${book.title}`}>
        <div className="book-card__pill-row">
          {showPill ? <div className="premium-badge">Premium</div> : <span />}
        </div>

        <figure className="book-card__image--wrapper">
          <img className="book-card__image" src={book.imageLink} alt={book.title} />
        </figure>

        <div className="book-card__title" title={book.title}>
          {book.title}
        </div>
        <div className="book-card__author" title={book.author}>
          {book.author}
        </div>
        <div className="book-card__subtitle" title={book.subTitle}>
          {book.subTitle}
        </div>

        <div className="book-card__duration">
          ⏱ {formatDuration(seconds)} ⭐{" "}
          {Number.isFinite(+book.averageRating) ? (+book.averageRating).toFixed(1) : "—"}
        </div>
      </div>
    </Link>
  );
}

function BookCarousel({ books, ariaLabel, showPremiumPill }) {
  const ref = useRef(null);

  const page = (dir) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="carousel" aria-label={ariaLabel}>
      <button className="carousel__btn carousel__btn--prev" onClick={() => page(-1)} aria-label="Previous">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="m15.41 7.41-1.41-1.41L8.59 11l5.41 5.99 1.41-1.41L11.41 11z" />
        </svg>
      </button>

      <div ref={ref} className="carousel__track">
        {books.map((b) => (
          <div key={b.id} className="carousel__item">
            <BookCard book={b} showPremiumPill={showPremiumPill} />
          </div>
        ))}
      </div>

      <button className="carousel__btn carousel__btn--next" onClick={() => page(1)} aria-label="Next">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="m8.59 16.59 1.41 1.41L15.41 12 10 6.01 8.59 7.41 12.59 12z" />
        </svg>
      </button>
    </div>
  );
}

// Skeleton / Loading state
function Skeleton({ className = "" }) {
  return <div className={`skeleton ${className}`} />;
}

function SelectedBookSkeleton() {
  return (
    <div className="selected__book selected__book--skeleton" aria-hidden="true">
      <div className="selected__book--sub-title">
        <Skeleton className="sk-line sk-line--lg" />
        <Skeleton className="sk-line" />
        <Skeleton className="sk-line sk-line--sm" />
      </div>

      <div className="selected__book--line" />

      <div className="selected__book--content">
        <div className="book__image--wrapper">
          <Skeleton className="sk-img" />
        </div>

        <div className="selected__book--text">
          <Skeleton className="sk-line sk-line--md" />
          <Skeleton className="sk-line sk-line--sm" />
          <div className="selected__book--duration-wrapper">
            <Skeleton className="sk-pill" />
            <Skeleton className="sk-pill sk-pill--short" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CarouselSkeleton({ count = 5 }) {
  return (
    <div className="carousel" aria-hidden="true">
      <button className="carousel__btn carousel__btn--prev" disabled aria-label="Previous" />
      <div className="carousel__track">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="carousel__item">
            <div className="book-card">
              <Skeleton className="sk-book-img" />
              <Skeleton className="sk-line sk-line--md" />
              <Skeleton className="sk-line sk-line--sm" />
              <Skeleton className="sk-line sk-line--sm" />
              <Skeleton className="sk-line sk-line--xs" />
            </div>
          </div>
        ))}
      </div>
      <button className="carousel__btn carousel__btn--next" disabled aria-label="Next" />
    </div>
  );
}

export default function ForYou() {
  const { user } = useAuth();
  const showPremiumPill = !user || user?.plan === 'basic';

  const [selectedBook, setSelectedBook] = useState(null);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [suggestedBooks, setSuggestedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const selectedSeconds = useAudioDuration(selectedBook?.audioLink);

  async function fetchBooks() {
    try {
      setError("");
      setLoading(true);

      const [selectedRes, recommendedRes, suggestedRes] = await Promise.all([
        fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"),
        fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"),
        fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"),
      ]);

      if (!selectedRes.ok || !recommendedRes.ok || !suggestedRes.ok) {
        throw new Error("Fetch failed");
      }

      const [selectedData, recommendedData, suggestedData] = await Promise.all([
        selectedRes.json(),
        recommendedRes.json(),
        suggestedRes.json(),
      ]);

      const selected = Array.isArray(selectedData) ? selectedData[0] : selectedData;

      setSelectedBook(selected ?? null);
      setRecommendedBooks(Array.isArray(recommendedData) ? recommendedData : []);
      setSuggestedBooks(Array.isArray(suggestedData) ? suggestedData : []);
    } catch (e) {
      console.error(e);
      setError("Something went wrong while loading books.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="row">
        <div className="container">
          <div className="for-you__title">Selected just for you</div>
          <SelectedBookSkeleton />

          <section className="for-you__recommended">
            <div className="for-you__recommended--title">Recommended For You</div>
            <div className="for-you__recommended--sub-title">We think you’ll like these</div>
            <CarouselSkeleton count={5} />
          </section>

          <section className="for-you__recommended">
            <div className="for-you__recommended--title">Suggested Books</div>
            <div className="for-you__recommended--sub-title">Browse those books</div>
            <CarouselSkeleton count={5} />
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="container">
        {!!error && (
          <div style={{ background: "#ffecec", color: "#7f1d1d", padding: 12, borderRadius: 4, marginBottom: 16 }}>
            {error}
          </div>
        )}

        <div className="for-you__title">Selected just for you</div>

        {selectedBook ? (
          <Link to={`/book/${selectedBook.id}`} className="selected__book" aria-label={`Open ${selectedBook.title}`}>
            <div className="selected__book--sub-title">{selectedBook.subTitle}</div>
            <div className="selected__book--line" />
            <div className="selected__book--content">
              <figure className="book__image--wrapper">
                <img className="book__image" src={selectedBook.imageLink} alt={selectedBook.title} />
              </figure>
              <div className="selected__book--text">
                <div className="selected__book--title">{selectedBook.title}</div>
                <div className="selected__book--author">{selectedBook.author}</div>

                <div className="selected__book--duration-wrapper">
                  <div className="selected__book--icon" aria-hidden="true">
                    <svg stroke="currentColor" fill="currentColor" viewBox="0 0 16 16" width="18" height="18">
                      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                    </svg>
                  </div>
                  <div className="duration-text">{formatDuration(selectedSeconds)}</div>
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <div style={{ color: "#6b757b", marginBottom: 24 }}>No selection available.</div>
        )}

        <section className="for-you__recommended">
          <div className="for-you__recommended--title">Recommended For You</div>
          <div className="for-you__recommended--sub-title">We think you’ll like these</div>
          {recommendedBooks.length ? (
            <BookCarousel books={recommendedBooks} ariaLabel="Recommended books carousel" showPremiumPill={showPremiumPill} />
          ) : (
            <div style={{ color: "#6b757b" }}>No recommendations right now.</div>
          )}
        </section>

        <section className="for-you__recommended">
          <div className="for-you__recommended--title">Suggested Books</div>
          <div className="for-you__recommended--sub-title">Browse those books</div>
          {suggestedBooks.length ? (
            <BookCarousel books={suggestedBooks} ariaLabel="Suggested books carousel" showPremiumPill={showPremiumPill} />
          ) : (
            <div style={{ color: "#6b757b" }}>No suggestions yet.</div>
          )}
        </section>
      </div>
    </div>
  );
}
