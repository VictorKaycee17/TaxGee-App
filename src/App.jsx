import React, { useState } from 'react';
import TaxTips from './components/TaxTips';
import TaxCalculator from './components/TaxCalculator';
import VatCalculator from './components/VatCalculator';
import CapitalGainsCalculator from './components/CapitalGainsCalculator';
import GeeChat from './components/GeeChat';
import Footer from './components/Footer';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import ProToggle from './components/ProToggle';
import ProVersionSelector from './components/ProVersionSelector';
import AuthWidget from './components/AuthWidget';
import AppLayout from './layouts/AppLayout';
import Dashboard from './pages/Dashboard';
import Invoicing from './pages/Invoicing';
import SalesTax from './pages/SalesTax';
import PolicyEngine from './pages/PolicyEngine';
import Calendar from './pages/Calendar';
import Payroll from './pages/Payroll';
import Audit from './pages/Audit';
import DocumentReview from './pages/DocumentReview';
import Receipts from './pages/Receipts';
import FilingHub from './pages/FilingHub';
import POSSales from './pages/POSSales';
import VendorBills from './pages/VendorBills';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import IndividualDashboardV2 from './pages/individual/IndividualDashboardV2';
import FileReturnWizard from './pages/individual/filing/FileReturnWizard';
import IndividualLayout from './layouts/IndividualLayout'; // Import New Mobile Layout

import logo from './assets/logo.png';

function App() {
    // State with Persistence
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('tax');
    const [currentView, setCurrentView] = useState('home');
    const [theme, setTheme] = useState(() => localStorage.getItem('taxpadi_theme') || 'light');

    // Per user request: Default to Free Version on fresh load, but persist on refresh
    const [isPro, setIsPro] = useState(() => {
        const saved = localStorage.getItem('taxpadi_isPro');
        return saved ? JSON.parse(saved) : false;
    });

    const [isProLoggedIn, setIsProLoggedIn] = useState(false);

    // New: Pro Mode Selection ('individual' | 'company' | null)
    const [proMode, setProMode] = useState(() => {
        return localStorage.getItem('taxpadi_proMode') || null;
    });

    const [activeProPage, setActiveProPage] = useState(() => {
        return localStorage.getItem('taxpadi_activeProPage') || 'dashboard';
    });

    // Persist State Changes
    React.useEffect(() => {
        localStorage.setItem('taxpadi_isPro', JSON.stringify(isPro));
        // RESET Logic: If user switches back to Free, clear their Pro selection (so they can choose again)
        if (!isPro) {
            setProMode(null);
        }
    }, [isPro]);

    React.useEffect(() => {
        if (proMode) {
            localStorage.setItem('taxpadi_proMode', proMode);
        } else {
            localStorage.removeItem('taxpadi_proMode');
        }
    }, [proMode]);

    React.useEffect(() => {
        localStorage.setItem('taxpadi_activeProPage', activeProPage);
        // Scroll to top on page change
        window.scrollTo(0, 0);
    }, [activeProPage]);

    // Handle Theme Change
    React.useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('taxpadi_theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    // Handle Pro Mode Reset (for testing or switching)
    const handleSwitchProMode = () => {
        setProMode(null);
        setActiveProPage('dashboard');
    };

    if (currentView === 'terms') {
        return <Terms onBack={() => setCurrentView('home')} theme={theme} />;
    }

    if (currentView === 'privacy') {
        return <Privacy onBack={() => setCurrentView('home')} theme={theme} />;
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            {/* Global Pro Toggle */}
            <ProToggle isPro={isPro} onToggle={setIsPro} />

            {isPro ? (
                <div className="animate-fade-in">
                    {!proMode ? (
                        <ProVersionSelector onSelect={setProMode} />
                    ) : proMode === 'individual' ? (
                        /* Individual Pro Layout (Mobile First v2) */
                        <IndividualLayout
                            activePage={activeProPage}
                            onNavigate={setActiveProPage}
                        >
                            {/* We will handle routing here later, for now just Dashboard */}
                            {activeProPage === 'dashboard' && <IndividualDashboardV2 />}
                            {/* Placeholders for other tabs */}
                            {activeProPage === 'filing' && <FileReturnWizard onBack={() => setActiveProPage('dashboard')} />}
                            {activeProPage === 'payment' && <div className="p-6">Payment Page (Coming Soon)</div>}
                            {activeProPage === 'settings' && <div className="p-6">Settings Page (Coming Soon)</div>}
                        </IndividualLayout>
                    ) : (
                        /* Company Pro Layout */
                        <AppLayout
                            activePage={activeProPage}
                            onNavigate={setActiveProPage}
                            mode="company"
                        >
                            {activeProPage === 'dashboard' && <Dashboard onNavigate={setActiveProPage} />}
                            {activeProPage === 'invoicing' && <Invoicing />}
                            {activeProPage === 'salestax' && <SalesTax />}
                            {activeProPage === 'policy' && <PolicyEngine />}
                            {activeProPage === 'calendar' && <Calendar />}
                            {activeProPage === 'payroll' && <Payroll />}
                            {activeProPage === 'audit' && <Audit />}
                            {activeProPage === 'review' && <DocumentReview />}
                            {activeProPage === 'receipts' && <Receipts />}
                            {activeProPage === 'filingHub' && <FilingHub />}
                            {activeProPage === 'posSales' && <POSSales />}
                            {activeProPage === 'vendorBills' && <VendorBills />}
                            {activeProPage === 'settings' && <Settings />}
                            {activeProPage === 'profile' && <Profile onGoToSettings={() => setActiveProPage('settings')} />}
                        </AppLayout>
                    )}
                </div>
            ) : (
                <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                    {/* Free Version Header */}
                    <header className="text-center mb-6 animate-fade-in flex flex-row items-center justify-center gap-4">
                        <img src={logo} alt="TaxGee Logo" className="w-16 h-16" />
                        <h1 className="text-4xl sm:text-5xl font-bold text-gradient mb-0">
                            TaxGee
                        </h1>
                    </header>

                    {/* Tool Switcher */}
                    <div className="flex justify-center mb-8">
                        <div className="bg-white/50 backdrop-blur-sm p-1 rounded-full border border-gray-200 shadow-sm inline-flex">
                            <button
                                onClick={() => setActiveTab('tax')}
                                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${activeTab === 'tax'
                                    ? 'bg-primary text-white shadow-md'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Income Tax
                            </button>
                            <button
                                onClick={() => setActiveTab('vat')}
                                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${activeTab === 'vat'
                                    ? 'bg-purple-600 text-white shadow-md'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                VAT Calculator
                            </button>
                            <button
                                onClick={() => setActiveTab('cgt')}
                                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${activeTab === 'cgt'
                                    ? 'bg-emerald-600 text-white shadow-md'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Capital Gains
                            </button>
                        </div>
                    </div>

                    {/* Main Calculator Area */}
                    <main>
                        {activeTab === 'tax' && <TaxCalculator />}
                        {activeTab === 'vat' && <VatCalculator />}
                        {activeTab === 'cgt' && <CapitalGainsCalculator />}
                    </main>

                    {/* Tax Tips Section */}
                    <TaxTips />

                    <Footer
                        onOpenTerms={() => setCurrentView('terms')}
                        onOpenPrivacy={() => setCurrentView('privacy')}
                        theme={theme}
                        toggleTheme={toggleTheme}
                    />
                </div>
            )}

            {/* Floating Action Button (FAB) */}
            {
                !isChatOpen && (
                    <button
                        onClick={() => setIsChatOpen(true)}
                        className="fixed bottom-6 right-6 z-40
                             w-16 h-16 bg-primary hover:bg-primary-dark
                             text-white rounded-full shadow-2xl
                             flex items-center justify-center
                             transition-all duration-200 transform hover:scale-110
                             focus:outline-none focus:ring-4 focus:ring-primary/50
                             group"
                        aria-label="Open Gee Chat Assistant"
                    >
                        <svg className="w-8 h-8 group-hover:scale-110 transition-transform"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        {/* Tooltip */}
                        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-text text-white text-xs rounded-lg
                                  opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Ask Gee 💬
                        </div>
                    </button>
                )
            }

            {/* Padi Chat Assistant */}
            <GeeChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </div >
    );
}

export default App;
