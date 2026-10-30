// React
import { useEffect } from "react"

// Reduix 
import { useAppDispatch, useAppSelector } from "@app/hooks"
import { actGetOrders } from "@features/orders/ordersThunk"


function Orders() {
    const dispath = useAppDispatch()


    useEffect(() => {

    }, [])
    return (
        <>
            <h1>My Orders</h1>

        </>
    )
}

export default Orders
