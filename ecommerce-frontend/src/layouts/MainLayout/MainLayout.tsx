import { Outlet } from "react-router-dom"
import AppFooter from "../../components/common/Footer/AppFooter"
import AppHeader from "../../components/common/Header/AppHeader"

export default function MainLayout() {
    return (
        <>
            <div className="container">
                <AppHeader />
                <main className="main-content">
                    <Outlet />
                </main>
                <AppFooter />
            </div>

        </>
    )
}
