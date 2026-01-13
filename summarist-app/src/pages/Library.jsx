import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/init";
// Optional: reuse a simplified version of your book UI or similar
import { Link } from "react-router-dom";

export default function Library() {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLibrary() {
      if (!user) {
        setBooks([]);
        setLoading(false);
        return;
      }
      
      try {
        const q = query(
          collection(db, "library"),
          where("uid", "==", user.uid)
        ); //"Get all documents from the library collection where the uid matches the current user's uid"

        const snapshot = await getDocs(q);//getDocs runs your query against Firestore, returns a QuerySnapshot
        const data = snapshot.docs.map((doc) => ({
          id: doc.id, 
          ...doc.data()
        })); 
        //Snapshot includes all matching documents and metadata; snapshot == "result set"
        //snapshot.docs == array of Firestore document objects
        //doc.id is Firestore's document ID || doc.data() is the stored fields inside the doc(like author, title, etc.)
        //...doc.data() spreads those fields into your new object

        setBooks(data); //This puts that array into a React state
      } catch (error) {
        console.error("Error fetching library:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLibrary();
  }, [user]);

  return (
    <div id="books__body">
      <main id="books__main">
        <section>
          <div className="books__container">
            <div className="row">
              <div className="book__wrapper">
                <div className="books__header">
                  <h2 className="books__header--title">Saved Books</h2>
                  <div className="books__header--line"></div>
                </div>
                
                <div className="recommended__books">
                    {/* Reuse recommended__books class or similar for grid layout */}
                    
                    {loading && <div className="skeleton-loading">Loading...</div>}

                    {!loading && books.length === 0 && (
                        <div className="no-books">
                            <p>You haven't saved any books yet.</p>
                        </div>
                    )}

                    {books.map((book) => (
                         <div className="book--wrapper" key={book.id}>
                            <Link to={`/book/${book.bookId}`} className="book__link">
                            <figure className="book__image--wrapper">
                                <img className="book__image" src={book.imageLink} alt="" />
                            </figure>
                            <div className="book__title">{book.title}</div>
                            <div className="book__author">{book.author}</div>
                            <div className="book__sub-title">{book.subTitle}</div>
                            <div className="book__ratings">
                                <div className="book__rating--avg">{book.averageRating}</div>
                                <div className="book__rating--total">({book.totalRating} ratings)</div>
                            </div>
                            <div className="book__duration">
                                <span className="material-symbols-rounded">schedule</span>
                                <div className="book__duration--text">{book.durationText}</div>
                            </div>
                            </Link>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
