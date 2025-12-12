import React, { useState, useEffect } from 'react';

const TIPS = [
    {
        icon: '💡',
        title: 'Rent Relief',
        text: 'You can claim 20% of your rent tax-free (up to ₦500k).'
    },
    {
        icon: '📉',
        title: 'Small Biz',
        text: 'Earn under ₦50m? Your Company Tax is 0%.'
    },
    {
        icon: '📅',
        title: 'Deadline',
        text: 'Personal Income Tax returns are due March 31st.'
    }
];

/**
 * TaxTips Component
 * Displays rotating tax tips to educate users
 */
const TaxTips = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-cycle every 5 seconds, pause on hover
    useEffect(() => {
        if (isHovered) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % TIPS.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isHovered]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % TIPS.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + TIPS.length) % TIPS.length);
    };

    const currentTip = TIPS[currentIndex];

    return (
        <div
            className="w-full max-w-sm mx-auto mb-6 animate-fade-in"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-3 relative overflow-hidden transition-all duration-300 hover:shadow-md">

                {/* Decorative background element */}
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-16 h-16 bg-primary/5 rounded-full blur-xl"></div>

                <div className="flex items-center justify-between gap-3 relative z-10">

                    {/* Prev Button */}
                    <button
                        onClick={handlePrev}
                        className="p-1 rounded-full hover:bg-white/50 text-gray-500 hover:text-primary transition-colors focus:outline-none"
                        aria-label="Previous tip"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Tip Content */}
                    <div className="flex-1 text-center transition-opacity duration-300">
                        <div className="text-xl mb-1">{currentTip.icon}</div>
                        <h3 className="font-bold text-gray-800 text-xs uppercase tracking-wide mb-1">
                            {currentTip.title}
                        </h3>
                        <p className="text-gray-600 font-medium text-xs leading-tight">
                            {currentTip.text}
                        </p>
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={handleNext}
                        className="p-2 rounded-full hover:bg-white/50 text-gray-500 hover:text-primary transition-colors focus:outline-none"
                        aria-label="Next tip"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Progress Indicators */}
                <div className="flex justify-center gap-2 mt-4">
                    {TIPS.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-primary w-4' : 'bg-gray-300'
                                }`}
                            aria-label={`Go to tip ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TaxTips;
