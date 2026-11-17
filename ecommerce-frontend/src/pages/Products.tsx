import { useProducts } from "@hooks/useProducts";
import { Product } from "@components/eCommerce";
import Loading from "@components/feedback/loading/Loading";
import { GridList } from "@components/common";
import styles from "./styles/products.module.css";

export default function Products() {
    const { productsFullInfo, loading, error } = useProducts();

    return (
        <section className={styles.page}>
            <header className={styles.page__header}>
                <h1 className={styles.page__title}>
                    <span className={styles.page__titleHighlight}>Products</span>
                </h1>
                <p className={styles.page__subtitle}>
                    Browse our hand-picked selection — quality you can feel.
                </p>
            </header>

            <div className={styles.page__grid}>
                <Loading status={loading} error={error} type="product">
                    <GridList
                        records={productsFullInfo}
                        renderItem={(record) => (
                            <Product key={record.id} product={record} />
                        )}
                        emptyMessage="No products found."
                    />
                </Loading>
            </div>
        </section>
    );
}