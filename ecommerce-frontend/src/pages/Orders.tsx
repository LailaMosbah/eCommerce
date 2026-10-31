
//Hook
import useOrders from "@hooks/useOrders";

// Components
import { Loading } from "@components/feedback";
import { ProductInfo } from "@components/eCommerce";

// Ant design
import { Table, Modal, Button } from "antd";


// Main Function 
const Orders = () => {
    const {
        loading,
        error,
        orderList,
        showModal,
        selectedProduct,
        viewDetailsHandler,
        closeModalHandler,
    } = useOrders();

    const columns = [
        {
            title: "Order Number",
            dataIndex: "id",
            key: "id",
            render: (id: number) => `#${id}`,
        },
        {
            title: "Items",
            key: "items",
            render: (_: unknown, record: (typeof orderList)[number]) => (
                <>
                    {record.items.length} item(s)
                    {" / "}
                    <Button
                        type="link"
                        onClick={() => viewDetailsHandler(record.id)}
                        style={{ padding: 0, textDecoration: "underline" }}
                    >
                        Product Details
                    </Button>
                </>
            ),
        },
        {
            title: "Total Price",
            dataIndex: "subtotal",
            key: "subtotal",
            render: (subtotal: number) => subtotal.toFixed(2),
        },
    ];

    return (
        <>
            <Modal
                title="Products Details"
                open={showModal}
                onCancel={closeModalHandler}
                footer={null}
            >
                {selectedProduct.map((el) => (
                    <ProductInfo
                        key={el.id}
                        title={el.title}
                        img={el.img}
                        price={el.price}
                        quantity={el.quantity}
                        direction="column"
                        style={{ marginBottom: "10px" }}
                    />
                ))}
            </Modal>

            <h1>My Orders</h1>

            <Loading status={loading} error={error} type="table">
                <Table
                    columns={columns}
                    dataSource={orderList}
                    rowKey="id"
                    pagination={false}
                />
            </Loading>
        </>
    );
};

export default Orders;
