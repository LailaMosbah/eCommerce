
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "antd";

// Assets
import heroImage from "@assets/homepage.png";

// Styles
import styles from "./styles/home.module.css";

const { Title, Text, Paragraph } = Typography;

const statistics = [
    { value: "200+", label: "International Brands" },
    { value: "2,000+", label: "High Quality Products" },
    { value: "30,000+", label: "Happy Customers" },
];

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className={styles.home}>
            <section className={styles["home__hero"]}>

                {/* Hero Content */}
                <div className={styles["home__content"]}>
                    <Text className={styles["home__eyebrow"]}>
                        DISCOVER YOUR STYLE
                    </Text>

                    <Title
                        level={1}
                        className={styles["home__title"]}
                    >
                        Find clothes that match
                        <br />
                        <span>your unique style</span>
                    </Title>

                    <Paragraph className={styles["home__description"]}>
                        Browse through our diverse range of meticulously
                        crafted garments, designed to bring out your
                        individuality and make you feel confident every day.
                    </Paragraph>
                </div>

                {/* Centered Hero Image */}
                <figure className={styles["home__image-wrapper"]}>
                    <div className={styles["home__image-decoration"]} />

                    <img
                        src={heroImage}
                        alt="Discover our latest fashion collection"
                        className={styles["home__image"]}
                        fetchPriority="high"
                    />
                </figure>

                {/* Call To Action */}
                <div className={styles["home__actions"]}>
                    <Button
                        type="primary"
                        size="large"
                        className={styles["home__button"]}
                        onClick={() => navigate("/categories")}
                    >
                        Shop Now
                        <span aria-hidden="true"> →</span>
                    </Button>

                    <Text className={styles["home__hint"]}>
                        Find your look. Express yourself.
                    </Text>
                </div>

                {/* Statistics */}
                <div className={styles["home__statistics"]}>
                    {statistics.map((item) => (
                        <div
                            key={item.label}
                            className={styles["home__stat"]}
                        >
                            <Title
                                level={2}
                                className={styles["home__stat-value"]}
                            >
                                {item.value}
                            </Title>

                            <Text className={styles["home__stat-label"]}>
                                {item.label}
                            </Text>
                        </div>
                    ))}
                </div>

            </section>
        </div>
    );
}
