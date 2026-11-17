import useCategories from "@hooks/useCategories";
import { Category } from "@components/eCommerce";
import Loading from "@components/feedback/loading/Loading";
import { GridList } from "@components/common";
import styles from "./styles/categories.module.css"

export default function Categories() {
    const { records, loading, error } = useCategories();

    return (
        <section className={styles.page}>
            <header className={styles.page__header}>
                <h1 className={styles.page__title}>
                    <span className={styles.page__titleHighlight}>Categories</span>
                </h1>
                <p className={styles.page__subtitle}>
                    Discover our curated collection — find exactly what you love.
                </p>
            </header>

            <div className={styles.page__grid}>
                <Loading status={loading} error={error} type="category">
                    <GridList
                        records={records}
                        renderItem={(record) => (
                            <Category key={record.id} category={record} />
                        )}
                        emptyMessage="No categories found."
                    />
                </Loading>
            </div>
        </section>
    );
}