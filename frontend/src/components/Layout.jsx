import Header from "./Header"
import { Outlet } from "react-router";

function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-soothingbg">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;