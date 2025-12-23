import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getGeeResponse } from '../utils/geeKnowledgeBase';
import { trackEvent } from '../utils/analytics';

/**
 * Gee AI Chat Assistant Component
 * Provides interactive tax assistance through a chat interface
 */
const GeeChat = ({ isOpen, onClose }) => {
    // Track chat open
    useEffect(() => {
        if (isOpen) {
            trackEvent('chat_opened');
        }
    }, [isOpen]);

    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'padi',
            text: '👋 Hello! I\'m Gee, your Nigerian tax assistant. I can help you understand tax bands, reliefs, deductions, and more. What would you like to know?',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        // Add user message
        const userMessage = {
            id: Date.now(),
            sender: 'user',
            text: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Track user question
        trackEvent('chat_query', {
            query_length: inputValue.length,
            has_keywords: /(tax|rate|deduction|relief|pension)/i.test(inputValue)
        });

        // Simulate thinking delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Get Gee's response
        const geeResponseText = getGeeResponse(inputValue);

        const geeMessage = {
            id: Date.now() + 1,
            sender: 'padi', // Keeping sender as 'padi' for styling consistency or update styling? The styling checked sender === 'padi'. I should check if I need to update this.
            text: geeResponseText,
            timestamp: new Date()
        };

        setIsTyping(false);
        setMessages(prev => [...prev, geeMessage]);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 pointer-events-none">
            <div className="w-full max-w-md h-[600px] bg-white rounded-2xl shadow-2xl 
                    flex flex-col pointer-events-auto animate-slide-up border-2 border-primary/20">

                {/* Header */}
                <div className="gradient-primary text-white p-4 rounded-t-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                            <span className="text-2xl">🤖</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Gee</h3>
                            <p className="text-xs opacity-90">Tax Assistant</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full 
                     flex items-center justify-center transition-all"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background-light">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                                {message.sender === 'padi' && (
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-semibold text-primary">Gee</span>
                                    </div>
                                )}
                                <div
                                    className={`rounded-2xl p-3 ${message.sender === 'user'
                                        ? 'bg-primary text-white rounded-br-sm'
                                        : 'bg-white text-text rounded-bl-sm shadow-md border border-gray-100'
                                        }`}
                                >
                                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                                    <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-text-light'
                                        }`}>
                                        {message.timestamp.toLocaleTimeString('en-NG', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-white text-text rounded-2xl rounded-bl-sm p-3 shadow-md border border-gray-100">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-200 rounded-b-2xl">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask about tax bands, reliefs, VAT..."
                            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl 
                       focus:outline-none focus:border-primary transition-colors
                       text-sm"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!inputValue.trim()}
                            className="bg-primary hover:bg-primary-dark text-white px-6 py-3 
                       rounded-xl font-semibold transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-xs text-text-light mt-2 text-center">
                        Powered by Nigeria Tax Act 2025
                    </p>
                </div>
            </div>
        </div>
    );
};

GeeChat.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default GeeChat;
