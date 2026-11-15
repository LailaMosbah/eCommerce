// React and React Router 
import { Outlet } from "react-router-dom"

// Components
import AppFooter from "../../components/common/Footer/AppFooter"
import AppHeader from "../../components/common/Header/AppHeader"

// Ant Design and Styles
import { Layout } from "antd";
const { Content } = Layout;

import styles from "./styles.module.css"
const { container, wrapper } = styles;

export default function MainLayout() {
    return (
        <>
            <Content
                style={{ padding: '0 48px' }} className={container}>
                <AppHeader />
                <main className={wrapper}>
                    <Outlet />
                </main>
                <AppFooter />
            </Content>

        </>
    )
}
