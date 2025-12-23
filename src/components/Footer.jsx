import React from 'react';

/**
 * Footer Component
 * Displays copyright info and feedback link
 */
const Footer = ({ onOpenTerms, onOpenPrivacy, theme, toggleTheme }) => {
    const currentYear = new Date().getFullYear();
    const email = 'hello@taxgee.com';
    const subject = encodeURIComponent('TaxGee Feedback');
    const body = encodeURIComponent('Hi Gee Team, I noticed...');

    return (
        <footer className="mt-12 py-6 border-t border-gray-100 text-center text-text-light text-sm animate-fade-in">
            <p className="mb-3">
                Built for Nigerian professionals and businesses
            </p>

            <div className="flex items-center justify-center gap-4 text-xs">
                <span>&copy; {currentYear} TaxGee</span>
                <span className="text-gray-300">|</span>
                <button
                    onClick={onOpenTerms}
                    className="text-gray-500 hover:text-primary transition-colors duration-200"
                >
                    Terms of Use
                </button>
                <span className="text-gray-300">|</span>
                <button
                    onClick={onOpenPrivacy}
                    className="text-gray-500 hover:text-primary transition-colors duration-200"
                >
                    Privacy Policy
                </button>
                <span className="text-gray-300">|</span>
                <a
                    href={`mailto:${email}?subject=${subject}&body=${body}`}
                    className="text-primary hover:text-primary-dark transition-colors duration-200 font-medium flex items-center gap-1"
                >
                    Feedback & Support
                </a>
                <span className="text-gray-300">|</span>
                <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-text dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all font-medium"
                    aria-label="Toggle Dark Mode"
                >
                    {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
                </button>
            </div>

            <p className="text-[10px] mt-4 text-gray-400">
                Tax calculations are estimates based on the Nigeria Tax Act 2025.
                <br />Please consult with a tax professional for official advice.
            </p>
        </footer>
    );
};

export default Footer;
