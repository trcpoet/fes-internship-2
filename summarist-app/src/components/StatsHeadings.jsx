// src/components/StatsHeadings.jsx
export const FIRST_HEADINGS = [
    "Enhance your knowledge",
    "Achieve greater success",
    "Improve your health",
    "Develop better parenting skills",
    "Increase happiness",
    "Be the best version of yourself!",
];

export const SECOND_HEADINGS = [
    "Expand your learning",
    "Accomplish your goals",
    "Strengthen your vitality",
    "Become a better caregiver",
    "Improve your mood",
    "Maximize your abilities",
];

export default function StatsHeadings({
                                          variant = "first",          // "first" | "second"
                                          headings,                   // optional: custom list
                                          activeIndex = 0,            // 0-based index for green highlight
                                          className = "",
                                      }) {
    const list =
        headings ??
        (variant === "second" ? SECOND_HEADINGS : FIRST_HEADINGS);

    return (
        <div className={`statistics__content--header ${className}`}>
            {list.map((text, i) => (
                <div
                    key={text}
                    className={
                        "statistics__heading" +
                        (i === activeIndex ? " statistics__heading--active" : "")
                    }
                >
                    {text}
                </div>
            ))}
        </div>
    );
}
