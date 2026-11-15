import { useNavigate } from "react-router-dom";
import { Button, Typography } from "antd";

// Assets
import aboutImage from "@assets/aboutuspage.png";

// Styles
import styles from "./styles/about.module.css";

const { Title, Text, Paragraph } = Typography;

const values = [
    {
        icon: "✦",
        title: "Crafted with Care",
        description:
            "Every garment is meticulously designed and quality-checked to ensure it feels as good as it looks.",
    },
    {
        icon: "◎",
        title: "Style for Everyone",
        description:
            "We believe fashion should be inclusive. Our collections celebrate every body, every story, every style.",
    },
    {
        icon: "⟡",
        title: "Sustainable Future",
        description:
            "We partner with ethical brands and prioritize sustainable practices in everything we do.",
    },
];

const milestones = [
    { year: "2018", label: "Founded", detail: "Started with a small boutique and a big dream." },
    { year: "2020", label: "100+ Brands", detail: "Expanded our curated collection to 100+ international brands." },
    { year: "2022", label: "10k Customers", detail: "Welcomed our 10,000th happy customer." },
    { year: "2024", label: "Global Reach", detail: "Now shipping to over 20 countries worldwide." },
];

export default function About() {
    const navigate = useNavigate();

    return (
        <div className={styles.about}>
            {/* Hero */}
            <section className={styles["about__hero"]}>
                <div className={styles["about__hero-content"]}>
                    <Text className={styles["about__eyebrow"]}>OUR STORY</Text>

                    <Title level={1} className={styles["about__title"]}>
                        More than fashion.
                        <br />
                        <span>It's a feeling.</span>
                    </Title>

                    <Paragraph className={styles["about__description"]}>
                        We started with a simple belief: clothing should empower
                        you to express who you truly are. Today, we curate
                        collections from the world's most talented designers,
                        bringing you pieces that tell your story — confidently,
                        authentically, and beautifully.
                    </Paragraph>
                </div>

                <figure className={styles["about__image-wrapper"]}>
                    <div className={styles["about__image-decoration"]} />
                    <img
                        src={aboutImage}
                        alt="Our team curating the latest fashion collection"
                        className={styles["about__image"]}
                        fetchPriority="high"
                    />
                </figure>
            </section>

            {/* Values */}
            <section className={styles["about__values"]}>
                <div className={styles["about__section-header"]}>
                    <Text className={styles["about__eyebrow"]}>WHAT WE STAND FOR</Text>
                    <Title level={2} className={styles["about__section-title"]}>
                        Our Values
                    </Title>
                </div>

                <div className={styles["about__values-grid"]}>
                    {values.map((item, index) => (
                        <article
                            key={item.title}
                            className={styles["about__value-card"]}
                            style={{ animationDelay: `${index * 0.15}s` }}
                        >
                            <span className={styles["about__value-icon"]} aria-hidden="true">
                                {item.icon}
                            </span>
                            <Title level={3} className={styles["about__value-title"]}>
                                {item.title}
                            </Title>
                            <Paragraph className={styles["about__value-text"]}>
                                {item.description}
                            </Paragraph>
                        </article>
                    ))}
                </div>
            </section>

            {/* Timeline */}
            <section className={styles["about__timeline-section"]}>
                <div className={styles["about__section-header"]}>
                    <Text className={styles["about__eyebrow"]}>OUR JOURNEY</Text>
                    <Title level={2} className={styles["about__section-title"]}>
                        Milestones
                    </Title>
                </div>

                <div className={styles["about__timeline"]}>
                    {milestones.map((item, index) => (
                        <div
                            key={item.year}
                            className={styles["about__timeline-item"]}
                            style={{ animationDelay: `${index * 0.12}s` }}
                        >
                            <span className={styles["about__timeline-dot"]} />
                            <Text className={styles["about__timeline-year"]}>{item.year}</Text>
                            <Title level={4} className={styles["about__timeline-label"]}>
                                {item.label}
                            </Title>
                            <Paragraph className={styles["about__timeline-detail"]}>
                                {item.detail}
                            </Paragraph>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className={styles["about__cta"]}>
                <Title level={2} className={styles["about__cta-title"]}>
                    Ready to find your look?
                </Title>
                <Paragraph className={styles["about__cta-text"]}>
                    Browse our collection and discover pieces that feel like they were made for you.
                </Paragraph>
                <Button
                    type="primary"
                    size="large"
                    className={styles["about__cta-button"]}
                    onClick={() => navigate("/categories")}
                >
                    Shop Now
                    <span aria-hidden="true"> →</span>
                </Button>
            </section>
        </div>
    );
}