import React from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';

const AppLayout = ({ children, activePage, onNavigate, mode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
            {/* Sidebar with mobile toggle state */}
            <Sidebar
                activePage={activePage}
                onNavigate={(page) => {
                    onNavigate(page);
                    closeSidebar();
                }}
                isOpen={isSidebarOpen}
                onClose={closeSidebar}
                mode={mode} // Pass mode (default handled in component)
            />

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-20 lg:hidden"
                    onClick={closeSidebar}
                />
            )}

            <div className="lg:pl-[260px] transition-all duration-300">
                <TopBar onMenuClick={toggleSidebar} onNavigate={onNavigate} />
                <main className="min-h-[calc(100vh-64px)]">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
