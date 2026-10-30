import { Outlet } from "react-router-dom"
import AppFooter from "../../components/common/Footer/AppFooter"
import AppHeader from "../../components/common/Header/AppHeader"

import styles from "./styles.module.css"
const { container, wrapper } = styles;

export default function MainLayout() {
    return (
        <>
            <div className={container}>
                <AppHeader />
                <main className={wrapper}>
                    <Outlet />
                </main>
                <AppFooter />
            </div>

        </>
    )
}
