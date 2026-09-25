import { useEffect } from 'react'

// Redux
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getWishlistProducts, cleanUpWishlistProductsFullInfo } from "../features/wishlist/wishlistSlice";

//Components
import { Product } from "@components/eCommerce"
import Loading from "@components/feedback/loading/Loading";
import { GridList } from "@components/common";


// Main Component Wishlist
function Wishlist() {

    const dispatch = useAppDispatch();

    const { loading, error } = useAppSelector((state) => state.wishlist)
    const productsFullInfo = useAppSelector((state) => state.wishlist.productsFullInfo)

    useEffect(() => {
        dispatch(getWishlistProducts());
        return () => {
            dispatch(cleanUpWishlistProductsFullInfo());
        }
    }, [dispatch]);


    const productsInWishlistFullInfo = productsFullInfo.map((el) => ({
        ...el,
        quantity: el.quantity || 0,
        isLiked: true
    }))
    return (
        <>

            <Loading status={loading} error={error}>
                <h1>Wishlist</h1>
                <GridList
                    records={productsInWishlistFullInfo}
                    renderItem={(record) => <Product key={record.id} product={record} />} />
            </Loading>
        </>
    )
}

export default Wishlist
