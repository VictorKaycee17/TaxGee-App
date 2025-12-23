import React from 'react';

const Privacy = ({ onBack, theme }) => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8 animate-fade-in transition-colors duration-300">
            <div className="max-w-3xl mx-auto">
                <button
                    onClick={onBack}
                    className="mb-8 flex items-center text-gray-600 hover:text-primary transition-colors duration-200 font-medium"
                >
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    Back to Calculator
                </button>

                <div className="bg-white dark:bg-black shadow-lg rounded-2xl p-8 sm:p-12 border dark:border-primary/20">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
                    <p className="text-gray-500 mb-8">Effective Date: January 1, 2026</p>

                    <div className="prose prose-slate max-w-none text-gray-800 dark:text-gray-300">
                        <p className="mb-6">
                            At TaxGee, we believe your financial data belongs to you. This Privacy Policy explains how
                            we handle your information when you use our web application, mobile PWA, and AI assistant.
                        </p>
                        <p className="mb-6">
                            By using TaxGee, you agree to the practices described in this policy.
                        </p>

                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. The Core Promise: Your Data Stays with You</h2>
                        <ul className="list-disc pl-5 space-y-2 mb-6">
                            <li>
                                <strong>For our Calculator and Planner features, we do not store your personal financial data on our servers.</strong>
                            </li>
                            <li>
                                When you enter your Salary, Rent, Pension, or TIN, that data is processed entirely inside your web browser or mobile device.
                            </li>
                            <li>
                                We save this data to your device's Local Storage so you don't have to type it again next time.
                            </li>
                            <li>
                                If you clear your browser cache or uninstall the app, this data is permanently deleted. We cannot recover it because we never had it.
                            </li>
                        </ul>

                        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Information We Do Collect (Anonymous Analytics)</h2>
                        <p className="mb-4">
                            To improve the app, we use third-party analytics tools (Vercel Analytics and PostHog) to collect anonymous usage data. This includes:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mb-6">
                            <li><strong>Device Information:</strong> Browser type, device model, and screen size.</li>
                            <li><strong>Usage Patterns:</strong> Which buttons you click (e.g., "Calculate Tax", "Download PDF") and which pages you visit.</li>
                            <li><strong>Aggregate Metrics:</strong> We track "How many people calculated tax today," but we do not link this to your identity.</li>
                        </ul>

                        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. AI Chat & Third-Party Processing</h2>
                        <p className="mb-2">When you chat with Gee (via Web, WhatsApp, or Voice):</p>
                        <ul className="list-disc pl-5 space-y-2 mb-6">
                            <li>Your messages are sent to our AI providers (e.g., OpenAI, Vapi.ai) solely to generate a response.</li>
                            <li>These providers are bound by strict data processing agreements.</li>
                            <li>We do not use your conversations to train public AI models.</li>
                            <li>
                                <strong>WhatsApp Users:</strong> If you use our WhatsApp feature, your phone number is processed by Twilio to deliver the message.
                                We do not use this number for marketing unless you explicitly opt-in.
                            </li>
                        </ul>

                        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Document Generation</h2>
                        <p className="mb-2">When you generate a Tax Assessment PDF:</p>
                        <ul className="list-disc pl-5 space-y-2 mb-6">
                            <li>The PDF is created locally on your device using JavaScript libraries.</li>
                            <li>The file is downloaded directly to your phone/computer. We do not keep a copy of this file.</li>
                        </ul>

                        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Data Security</h2>
                        <p className="mb-6">
                            Although we do not store your financial data, we secure the transmission of our app using standard SSL/TLS encryption (HTTPS).
                            This ensures that no one can intercept the data while you are using the site.
                        </p>

                        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. Your Rights</h2>
                        <p className="mb-4">Under the Nigeria Data Protection Regulation (NDPR), you have the right to:</p>
                        <ul className="list-disc pl-5 space-y-2 mb-6">
                            <li>
                                <strong>Delete Your Data:</strong> Since data is stored locally, you can exercise this right instantly by clicking the
                                "Clear Data" button in the app or clearing your browser cache.
                            </li>
                            <li><strong>Know How Data is Used:</strong> This policy serves as that notification.</li>
                        </ul>

                        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">7. Changes to This Policy</h2>
                        <p className="mb-6">
                            We are growing fast. As we add features like Auto-Deductions or User Accounts, we will update this policy to reflect
                            how we handle cloud storage. We will notify you of significant changes via the app.
                        </p>

                        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">8. Contact Us</h2>
                        <p className="mb-6">
                            If you have questions about this policy or our privacy practices, please contact us at: Email: <a href="mailto:hello@taxgee.com" className="text-primary hover:underline">hello@taxgee.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
