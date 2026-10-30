// React
import { NavLink, Outlet, useLocation } from "react-router-dom";

// Ant desing
import { Row, Col, Menu } from "antd";


const ProfileLayout = () => {
    const location = useLocation();

    // تحديد العنصر المفعل بناءً على المسار الحالي
    // (هنا نفترض أن المسار الأساسي هو حساب المستخدم والآخر هو orders)
    const getSelectedKey = () => {
        if (location.pathname.endsWith("/orders")) {
            return ["orders"];
        }
        return ["account"];
    };

    return (
        <Row gutter={16}>
            <Col xs={24} md={6}>
                <Menu
                    mode="inline"
                    selectedKeys={getSelectedKey()}
                    items={[
                        {
                            key: "account",
                            label: <NavLink to="" end>Account Info</NavLink>,
                        },
                        {
                            key: "orders",
                            label: <NavLink to="orders">Orders</NavLink>,
                        },
                    ]}
                />
            </Col>
            <Col xs={24} md={18}>
                <Outlet />
            </Col>
        </Row>
    );
};

export default ProfileLayout;