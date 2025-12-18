import React from "react";

function DownloadIcon(props) {
    return (
        <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            {...props}
        >
            <path d="M11.219 3.375 8 7.399 4.781 3.375A1.002 1.002 0 0 0 3 4v15c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V4a1.002 1.002 0 0 0-1.781-.625L16 7.399l-3.219-4.024c-.381-.474-1.181-.474-1.562 0zM5 19v-2h14.001v2H5zm10.219-9.375c.381.475 1.182.475 1.563 0L19 6.851 19.001 15H5V6.851l2.219 2.774c.381.475 1.182.475 1.563 0L12 5.601l3.219 4.024z" />
        </svg>
    );
}

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

function ChatIcon(props) {
    return (
        <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            {...props}
        >
            <g>
                <path fill="none" d="M0 0H24V24H0z" />
                <path d="M21 3v2c0 9.627-5.373 14-12 14H5.243C5.08 19.912 5 20.907 5 22H3c0-1.363.116-2.6.346-3.732C3.116 16.974 3 15.218 3 13 3 7.477 7.477 3 13 3c2 0 4 1 8 0zm-8 2c-4.418 0-8 3.582-8 8 0 .362.003.711.01 1.046 1.254-1.978 3.091-3.541 5.494-4.914l.992 1.736C8.641 12.5 6.747 14.354 5.776 17H9c6.015 0 9.871-3.973 9.997-11.612-1.372.133-2.647.048-4.22-.188C13.627 5.027 13.401 5 13 5z" />
            </g>
        </svg>
    );
}

function NumbersCard({ icon, title, subTitle, iconClassName = "numbers__icon" }) {
    return (
        <div className="numbers">
            <div className={iconClassName}>{icon}</div>
            <div className="numbers__title">{title}</div>
            <div className="numbers__sub--title">{subTitle}</div>
        </div>
    );
}

export default function Numbers() {
    return (
        <section id="numbers">
            <div className="container">
                <div className="row">
                    <div className="section__title">Start growing with Summarist now</div>

                    <div className="numbers__wrapper">
                        <NumbersCard
                            icon={<DownloadIcon />}
                            title="3 Million"
                            subTitle="Downloads on all platforms"
                        />

                        <NumbersCard
                            iconClassName="numbers__icon numbers__star--icon"
                            icon={Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} />)}
                            title="4.5 Stars"
                            subTitle="Average ratings on iOS and Google Play"
                        />


                        <NumbersCard
                            icon={<ChatIcon />}
                            title="97%"
                            subTitle="Of Summarist members create a better reading habit"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
