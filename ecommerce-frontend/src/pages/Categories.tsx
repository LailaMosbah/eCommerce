//Hooks
import useCategories from "@hooks/useCategories";
// Commponents
import { Category } from "@components/eCommerce"
import Loading from "@components/feedback/loading/Loading";
import { GridList } from "@components/common";

export default function Categories() {
    const { records, loading, error } = useCategories();

    return (
        <div>
            <Loading status={loading} error={error} type="category">
                <h1>Categories</h1>
                <GridList
                    records={records}
                    renderItem={(record) => <Category key={record.id} category={record} />} />
            </Loading>
        </div>
    )
}
