import React, { useState } from 'react';
import TaxTips from './components/TaxTips';
import TaxCalculator from './components/TaxCalculator';
import PadiChat from './components/PadiChat';
import Footer from './components/Footer';

function App() {
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <header className="text-center mb-12 animate-fade-in">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gradient mb-3">
                        TaxPadi
                    </h1>
                </header>

                {/* Tax Tips Section */}
                <TaxTips />

                {/* Main Calculator */}
                <main>
                    <TaxCalculator />
                </main>

                <Footer />
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
                    aria-label="Open Padi Chat Assistant"
                >
                    <svg className="w-8 h-8 group-hover:scale-110 transition-transform"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    {/* Tooltip */}
                    <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-text text-white text-xs rounded-lg
                                  opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Ask Padi 💬
                    </div>
                </button>
            )}

            {/* Padi Chat Assistant */}
            <PadiChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </div>
    );
}

export default App;
