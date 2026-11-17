import { Link } from "react-router-dom";
import type { Category as CategoryType } from "../../../types";
import styles from "./Category.module.css";

interface CategoryProps {
    category: CategoryType;
}

export default function Category({ category }: CategoryProps) {
    const { title, prefix, img } = category;

    return (
        <article className={styles.card}>
            <Link to={`/categories/products/${prefix}`} aria-label={title}>
                <div className={styles.card__media}>
                    <img
                        className={styles.card__image}
                        draggable={false}
                        alt={title}
                        src={img}
                        loading="lazy"
                    />
                    <span className={styles.card__chip}>Explore →</span>
                </div>

                <div className={styles.card__body}>
                    <h3 className={styles.card__title}>{title}</h3>
                    <p className={styles.card__description}>Browse collection</p>
                </div>
            </Link>
        </article>
    );
}