import React, { useState } from 'react';
import TaxTips from './components/TaxTips';
import TaxCalculator from './components/TaxCalculator';
import VatCalculator from './components/VatCalculator';
import CapitalGainsCalculator from './components/CapitalGainsCalculator';
import GeeChat from './components/GeeChat';
import Footer from './components/Footer';
import Terms from './components/Terms';
import Privacy from './components/Privacy';

import logo from './assets/logo.png';

function App() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('tax');
    const [currentView, setCurrentView] = useState('home');
    const [theme, setTheme] = useState('light');

    // Handle Theme Change
    React.useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    if (currentView === 'terms') {
        return <Terms onBack={() => setCurrentView('home')} theme={theme} />;
    }

    if (currentView === 'privacy') {
        return <Privacy onBack={() => setCurrentView('home')} theme={theme} />;
    }

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
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

            {/* Floating Action Button (FAB) */}
            {!isChatOpen && (
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
            )}

            {/* Padi Chat Assistant */}
            <GeeChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </div>
    );
}

export default App;
