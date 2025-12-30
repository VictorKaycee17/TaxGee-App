import React, { useState, useRef } from 'react';
import { XMarkIcon, ArrowUpTrayIcon, DocumentIcon, PhotoIcon } from '@heroicons/react/24/outline';

const UploadModal = ({ open, onClose, onNavigate }) => {
    const [docType, setDocType] = useState('receipt');
    const [file, setFile] = useState(null);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState('');
    const [uploadComplete, setUploadComplete] = useState(false);
    const fileInputRef = useRef(null);

    const documentTypes = [
        { id: 'receipt', label: 'Receipt' },
        { id: 'invoice', label: 'Invoice' },
        { id: 'other', label: 'Other' }
    ];

    const categories = [
        'Office Supplies', 'Travel', 'Food & Entertainment', 'Professional Services',
        'Bank Charges', 'Utilities', 'Other'
    ];

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        validateAndSetFile(selectedFile);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        validateAndSetFile(droppedFile);
    };

    const validateAndSetFile = (selectedFile) => {
        setError('');
        if (!selectedFile) return;

        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        if (!allowedTypes.includes(selectedFile.type)) {
            setError('Only PDF, JPG, PNG files are allowed');
            return;
        }

        if (selectedFile.size > 10 * 1024 * 1024) {
            setError('File must be less than 10MB');
            return;
        }

        setFile(selectedFile);
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file');
            return;
        }

        setUploading(true);
        setUploadProgress(0);

        // Simulate upload progress
        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 10;
            });
        }, 150);

        setTimeout(() => {
            clearInterval(interval);
            setUploadProgress(100);
            setUploading(false);
            setUploadComplete(true);
            console.log('Upload complete:', { file: file.name, type: docType, category });
        }, 1800);
    };

    const handleNavigate = (destination) => {
        onClose();
        if (onNavigate) {
            onNavigate(destination);
        }
    };

    const resetForm = () => {
        setFile(null);
        setCategory('');
        setDescription('');
        setUploadComplete(false);
        setUploadProgress(0);
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Upload Documents</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5 space-y-5">
                    {uploadComplete ? (
                        /* Success State */
                        <div className="text-center py-6">
                            <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                                <span className="text-3xl">✓</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Upload Complete!</h3>
                            <p className="text-sm text-slate-600 mb-6">Your {docType} has been uploaded successfully.</p>
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => handleNavigate(docType === 'invoice' ? 'vendorBills' : 'receipts')}
                                    className="w-full px-4 py-2.5 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-all"
                                >
                                    Go to {docType === 'invoice' ? 'Vendor Bills' : 'Receipts'}
                                </button>
                                <button
                                    onClick={resetForm}
                                    className="w-full px-4 py-2.5 text-teal-600 font-bold rounded-xl hover:bg-teal-50 transition-all"
                                >
                                    Upload Another
                                </button>
                                <button
                                    onClick={onClose}
                                    className="w-full px-4 py-2.5 text-slate-500 font-medium rounded-xl hover:bg-slate-50 transition-all"
                                >
                                    Return to Dashboard
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Document Type */}
                            <div>
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Document Type</h3>
                                <div className="flex gap-2">
                                    {documentTypes.map(type => (
                                        <button
                                            key={type.id}
                                            onClick={() => setDocType(type.id)}
                                            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${docType === type.id
                                                    ? 'bg-teal-500 text-white'
                                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                }`}
                                        >
                                            {type.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* File Upload Area */}
                            <div>
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Upload File</h3>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    onDrop={handleDrop}
                                    onDragOver={(e) => e.preventDefault()}
                                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${file ? 'border-teal-300 bg-teal-50' : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    {file ? (
                                        <div className="flex items-center justify-center gap-3">
                                            {file.type === 'application/pdf'
                                                ? <DocumentIcon className="w-8 h-8 text-teal-600" />
                                                : <PhotoIcon className="w-8 h-8 text-teal-600" />
                                            }
                                            <div className="text-left">
                                                <p className="text-sm font-medium text-slate-900 truncate max-w-[200px]">{file.name}</p>
                                                <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <ArrowUpTrayIcon className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                                            <p className="text-sm text-slate-600 mb-1">Drag & drop or click to browse</p>
                                            <p className="text-xs text-slate-400">PDF, JPG, PNG (max 10MB)</p>
                                        </>
                                    )}
                                </div>
                                {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
                            </div>

                            {/* Category */}
                            <div>
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Category (Optional)</h3>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                >
                                    <option value="">Select category</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Progress Bar */}
                            {uploading && (
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-600">Uploading...</span>
                                        <span className="font-medium text-teal-600">{uploadProgress}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-teal-500 transition-all duration-300"
                                            style={{ width: `${uploadProgress}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Footer */}
                {!uploadComplete && (
                    <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleUpload}
                            disabled={!file || uploading}
                            className="px-6 py-2.5 bg-teal-600 text-white text-sm font-bold rounded-xl hover:bg-teal-700 transition-all shadow-lg shadow-teal-500/20 disabled:opacity-50"
                        >
                            {uploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadModal;
