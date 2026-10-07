//Hooks
import useWishlist from "@hooks/useWishlist";

//Components
import { Product } from "@components/eCommerce"
import Loading from "@components/feedback/loading/Loading";
import { GridList } from "@components/common";


// Main Component Wishlist
function Wishlist() {
    const { productsInWishlistFullInfo, loading, error } = useWishlist();

    return (
        <>

            <Loading status={loading} error={error} type="product">
                <h1>Wishlist</h1>
                <GridList
                    records={productsInWishlistFullInfo}
                    renderItem={(record) => <Product key={record.id} product={record} />} />
            </Loading>
        </>
    )
}

export default Wishlist
