// FILE: src/components/Features.jsx
import React from "react";
import StatsHeadings from "./StatsHeadings";

/* --- 3-up feature cards data --- */
const features = [
    {
        title: "Read or listen",
        subtitle: "Save time by getting the core ideas from the best books.",
        icon: (
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M854.6 288.7c6 6 9.4 14.1 9.4 22.6V928c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32h424.7c8.5 0 16.7 3.4 22.7 9.4l215.2 215.3zM790.2 326L602 137.8V326h188.2zM320 482a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h384a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8H320zm0 136a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h184a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8H320z" />
            </svg>
        ),
    },
    {
        title: "Find your next read",
        subtitle: "Explore book lists and personalized recommendations.",
        icon: (
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M348 676.1C250 619.4 184 513.4 184 392c0-181.1 146.9-328 328-328s328 146.9 328 328c0 121.4-66 227.4-164 284.1V792c0 17.7-14.3 32-32 32H380c-17.7 0-32-14.3-32-32V676.1zM392 888h240c4.4 0 8 3.6 8 8v32c0 17.7-14.3 32-32 32H416c-17.7 0-32-14.3-32-32v-32c0-4.4 3.6-8 8-8z" />
            </svg>
        ),
    },
    {
        title: "Briefcasts",
        subtitle: "Gain valuable insights from briefcasts",
        icon: (
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M512 624c93.9 0 170-75.2 170-168V232c0-92.8-76.1-168-170-168s-170 75.2-170 168v224c0 92.8 76.1 168 170 168zm330-170c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 140.3-113.7 254-254 254S258 594.3 258 454c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 168.7 126.6 307.9 290 327.6V884H326.7c-13.7 0-24.7 14.3-24.7 32v36c0 4.4 2.8 8 6.2 8h407.6c3.4 0 6.2-3.6 6.2-8v-36c0-17.7-11-32-24.7-32H548V782.1c165.3-18 294-158 294-328.1z" />
            </svg>
        ),
    },
];

export default function Features() {
    return (
        <>
            <section id="features">
                <div className="container">
                    <div className="row">
                        <div className="section__title">Understand books in few minutes</div>

                        {/* 3-up features grid */}
                        <div className="features__wrapper">
                            {features.map((f, i) => (
                                <div className="features" key={i}>
                                    <div className="features__icon" aria-hidden="true">
                                        {f.icon}
                                    </div>
                                    <div className="features__title">{f.title}</div>
                                    <div className="features__sub--title">{f.subtitle}</div>
                                </div>
                            ))}
                        </div>

                        {/* 1st statistics row: FIRST headings (left) + details (right) */}
                        <div className="statistics__wrapper">
                            <StatsHeadings variant="first" activeIndex={2} className= "statistics__content--header--loop" />
                            <div className="statistics__content--details">
                                <div className="statistics__data">
                                    <div className="statistics__data--number">93%</div>
                                    <div className="statistics__data--title">
                                        of Summarist members <b>significantly increase</b> reading frequency.
                                    </div>
                                </div>
                                <div className="statistics__data">
                                    <div className="statistics__data--number">96%</div>
                                    <div className="statistics__data--title">
                                        of Summarist members <b>establish better</b> habits.
                                    </div>
                                </div>
                                <div className="statistics__data">
                                    <div className="statistics__data--number">90%</div>
                                    <div className="statistics__data--title">
                                        have made <b>significant positive</b> change to their lives.
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2nd statistics row: details (left) + SECOND headings (right, right-aligned) */}
                        <div className="statistics__wrapper">
                            <div className="statistics__content--details statistics__content--details-second">
                                <div className="statistics__data">
                                    <div className="statistics__data--number">91%</div>
                                    <div className="statistics__data--title">
                                        of Summarist members <b>report feeling more productive</b> after incorporating the
                                        service into their daily routine.
                                    </div>
                                </div>
                                <div className="statistics__data">
                                    <div className="statistics__data--number">94%</div>
                                    <div className="statistics__data--title">
                                        of Summarist members have <b>noticed an improvement</b> in their overall comprehension
                                        and retention of information.
                                    </div>
                                </div>
                                <div className="statistics__data">
                                    <div className="statistics__data--number">88%</div>
                                    <div className="statistics__data--title">
                                        of Summarist members <b>feel more informed</b> about current events and industry trends
                                        since using the platform.
                                    </div>
                                </div>
                            </div>

                            <StatsHeadings
                                variant="second"
                                activeIndex={2}
                                className="statistics__content--header-second statistics__content--header--loop"
                            />
                        </div>
                        {/* --- end statistics blocks --- */}
                    </div>
                </div>
            </section>
        </>
    );
}