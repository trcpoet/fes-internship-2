import React from "react";

const footerColumns = [
    {
        title: "Actions",
        links: ["Summarist Magazine", "Cancel Subscription", "Help", "Contact us"],
    },
    {
        title: "Useful Links",
        links: ["Pricing", "Summarist Business", "Gift Cards", "Authors & Publishers"],
    },
    {
        title: "Company",
        links: ["About", "Careers", "Partners", "Code of Conduct"],
    },
    {
        title: "Other",
        links: ["Sitemap", "Legal Notice", "Terms of Service", "Privacy Policies"],
    },
];

export default function Footer() {
    return (
        <section id="footer">
            <div className="container">
                <div className="row">
                    <div className="footer__top--wrapper">
                        {footerColumns.map((col) => (
                            <div className="footer__block" key={col.title}>
                                <div className="footer__link--title">{col.title}</div>

                                <div>
                                    {col.links.map((label) => (
                                        <div className="footer__link--wrapper" key={label}>
                                            {/* not clickable (cursor: not-allowed), matches your CSS */}
                                            <a className="footer__link" aria-disabled="true">
                                                {label}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="footer__copyright--wrapper">
                        <div className="footer__copyright">Copyright © 2023 Summarist.</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
