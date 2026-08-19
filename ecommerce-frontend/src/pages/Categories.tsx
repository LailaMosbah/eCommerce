import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { getCategories } from "@features/categories/categoriesSlice";
// Commponents
import { Category } from "@components/eCommerce"
import Loading from "@components/feedback/loading/Loading";
import { GridList } from "@components/common";

export default function Categories() {
    const dispatch = useAppDispatch();
    const { records, loading, error } = useAppSelector((state) => state.categories);

    // Dispatch مرة واحدة فقط
    useEffect(() => {
        if (records.length === 0 && loading === "idle")
            dispatch(getCategories());

    }, [dispatch, records.length, loading]);



    return (
        <div>
            <Loading status={loading} error={error}>
                <h1>Categories</h1>
                <GridList
                    records={records}
                    renderItem={(record) => <Category key={record.id} category={record} />} />
            </Loading>
        </div>
    )
}
