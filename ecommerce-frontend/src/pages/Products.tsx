import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@app/hooks"
import { getProductsByCategory } from "@features/product/productsThunks"
import { productsCleanUp } from "@features/product/productsSlice"
//Components
import { Product } from "@components/eCommerce"
import Loading from "@components/feedback/loading/Loading";
import { GridList } from "@components/common";


// Products page component
export default function Products() {
    const dispatch = useAppDispatch()
    const { prefix } = useParams()
    const { records, loading, error } = useAppSelector((state) => state.products)
    const cartItems = useAppSelector((state) => state.cart.items)
    const productsFullInfo = records.map((el) => ({ ...el, quantity: cartItems[el.id] || 0 }))

    useEffect(() => {
        const promise = dispatch(getProductsByCategory(prefix || ""))
        return () => {
            dispatch(productsCleanUp())
            promise.abort()
        }
    }, [dispatch, prefix])


    return (
        <div>
            <Loading status={loading} error={error}>
                <h1>products</h1>
                <GridList
                    records={productsFullInfo}
                    renderItem={(record) => <Product key={record.id} product={record} />} />
            </Loading>
        </div>
    )
}
