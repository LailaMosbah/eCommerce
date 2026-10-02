
//Hooks
import { useProducts } from "@hooks/useProducts";
//Components
import { Product } from "@components/eCommerce"
import Loading from "@components/feedback/loading/Loading";
import { GridList } from "@components/common";


// Products page component
export default function Products() {
    const { productsFullInfo, loading, error } = useProducts();

    return (
        <div>
            <Loading status={loading} error={error}>
                <h1>products</h1>
                {/* <Heading title={`${params.prefix?.toUpperCase()} Products`}/> */}
                <GridList
                    records={productsFullInfo}
                    renderItem={(record) => <Product key={record.id} product={record} />} />
            </Loading>
        </div>
    )
}
