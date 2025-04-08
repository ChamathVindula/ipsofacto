import Header from "./Header"

function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-soothingbg">{children}</main>
        </div>
    );
}

export default Layout;