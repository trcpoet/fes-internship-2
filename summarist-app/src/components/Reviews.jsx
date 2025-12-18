// FILE: src/components/Reviews.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";

const REVIEWS = [
    {
        name: "Hanna M.",
        body: (
            <>
                This app has been a <b>game-changer</b> for me! It's saved me so much
                time and effort in reading and comprehending books. Highly recommend it
                to all book lovers.
            </>
        ),
    },
    {
        name: "David B.",
        body: (
            <>
                I love this app! It provides <b>concise and accurate summaries</b> of
                books in a way that is easy to understand. It's also very user-friendly
                and intuitive.
            </>
        ),
    },
    {
        name: "Nathan S.",
        body: (
            <>
                This app is a great way to get the main takeaways from a book without
                having to read the entire thing.{" "}
                <b>The summaries are well-written and informative.</b> Definitely worth
                downloading.
            </>
        ),
    },
    {
        name: "Ryan R.",
        body: (
            <>
                If you're a busy person who <b>loves reading but doesn't have the time</b>{" "}
                to read every book in full, this app is for you! The summaries are
                thorough and provide a great overview of the book's content.
            </>
        ),
    },
];

function StarIcon(props) {
    return (
        <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            {...props}
        >
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
        </svg>
    );
}

export default function Reviews() {
    const { openAuth } = useAuth(); // same login modal pattern used in Home.jsx :contentReference[oaicite:1]{index=1}

    return (
        <section id="reviews">
            <div className="row">
                <div className="container">
                    <div className="section__title">What our members say</div>

                    <div className="reviews__wrapper">
                        {REVIEWS.map((r) => (
                            <div className="review" key={r.name}>
                                <div className="review__header">
                                    <div className="review__name">{r.name}</div>

                                    <div className="review__stars" aria-label="5 out of 5 stars">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <StarIcon key={i} />
                                        ))}
                                    </div>
                                </div>

                                <div className="review__body">{r.body}</div>
                            </div>
                        ))}
                    </div>

                    <div className="reviews__btn--wrapper">
                        <button
                            className="btn home__cta--btn"
                            onClick={() => openAuth("login")}
                            aria-label="Open Login"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
