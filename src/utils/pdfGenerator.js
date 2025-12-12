/**
 * TaxPadi - PDF Generator Utility
 * Feature 3: Document Generator
 * Generates professional tax assessment PDF documents
 */

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Generate Tax Assessment PDF
 * Creates a comprehensive tax assessment document with TaxPadi branding
 * 
 * @param {object} userData - User information
 * @param {string} userData.name - User's name (optional)
 * @param {string} userData.userType - 'individual' or 'company'
 * @param {object} taxData - Tax calculation results
 * @returns {void} Downloads PDF file
 */
export function generateTaxPDF(userData = {}, taxData) {
    // Create new PDF document
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Color scheme - TaxPadi green
    const primaryGreen = [0, 184, 148]; // #00B894
    const darkGreen = [0, 143, 110];    // #008F6E
    const textDark = [45, 52, 54];      // #2D3436
    const lightGray = [248, 249, 250];  // #F8F9FA

    // Current date
    const currentDate = new Date().toLocaleDateString('en-NG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    let yPosition = 20;

    // ============================================
    // HEADER SECTION
    // ============================================

    // TaxPadi Logo/Title
    doc.setFillColor(...primaryGreen);
    doc.rect(0, 0, pageWidth, 35, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('TaxPadi', 15, 20);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Nigerian Tax Calculator', 15, 27);

    // Document title on right
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('TAX ASSESSMENT', pageWidth - 15, 20, { align: 'right' });
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Nigeria Tax Act 2025', pageWidth - 15, 26, { align: 'right' });

    yPosition = 45;

    // ============================================
    // DOCUMENT INFO SECTION
    // ============================================

    doc.setTextColor(...textDark);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');

    // Date
    doc.text(`Assessment Date: ${currentDate}`, 15, yPosition);
    yPosition += 5;

    // User Type
    const userTypeLabel = userData.userType === 'company' ? 'Company' : 'Individual';
    doc.text(`Taxpayer Type: ${userTypeLabel}`, 15, yPosition);
    yPosition += 5;

    // Name if provided
    if (userData.name) {
        doc.text(`Name: ${userData.name}`, 15, yPosition);
        yPosition += 5;
    }

    yPosition += 5;

    // ============================================
    // ASSESSMENT SUMMARY BOX
    // ============================================

    doc.setFillColor(...lightGray);
    doc.rect(15, yPosition, pageWidth - 30, 25, 'F');

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...darkGreen);
    doc.text('TOTAL TAX LIABILITY', 20, yPosition + 8);

    doc.setFontSize(16);
    doc.setTextColor(...primaryGreen);
    const totalTax = taxData.tax?.total || taxData.totalTax || 0;
    doc.text(`₦${totalTax.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 20, yPosition + 18);

    // Effective rate on right
    if (taxData.effectiveTaxRate !== undefined) {
        doc.setFontSize(9);
        doc.setTextColor(...textDark);
        doc.text('Effective Tax Rate:', pageWidth - 20, yPosition + 8, { align: 'right' });
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...primaryGreen);
        doc.text(`${taxData.effectiveTaxRate.toFixed(2)}%`, pageWidth - 20, yPosition + 18, { align: 'right' });
    }

    yPosition += 35;

    // ============================================
    // DETAILED CALCULATION TABLE
    // ============================================

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...textDark);
    doc.text('CALCULATION BREAKDOWN', 15, yPosition);
    yPosition += 8;

    // Build table data based on user type
    const tableData = [];

    if (userData.userType === 'company') {
        // Company Tax Table
        tableData.push(['Annual Turnover', `₦${taxData.turnover?.toLocaleString('en-NG', { minimumFractionDigits: 2 }) || '0.00'}`]);
        tableData.push(['Company Classification', taxData.companyType || 'N/A']);
        tableData.push(['Applicable Tax Rate', `${((taxData.applicableRate || 0) * 100).toFixed(0)}%`]);
        tableData.push(['Company Tax Payable', `₦${(taxData.totalTax || 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}`]);

    } else {
        // Individual Tax Table
        tableData.push([{ content: 'INCOME', colSpan: 2, styles: { fontStyle: 'bold', fillColor: lightGray } }]);
        tableData.push(['Gross Annual Income', `₦${(taxData.grossIncome || 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}`]);

        tableData.push([{ content: 'DEDUCTIONS', colSpan: 2, styles: { fontStyle: 'bold', fillColor: lightGray } }]);
        tableData.push(['Pension Contribution', `₦${(taxData.deductions?.pension || 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}`]);
        tableData.push(['National Housing Fund (NHF)', `₦${(taxData.deductions?.nhf || 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}`]);
        tableData.push(['National Health Insurance (NHIS)', `₦${(taxData.deductions?.nhis || 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}`]);
        tableData.push(['Total Deductions', `₦${(taxData.deductions?.total || 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}`]);

        tableData.push([{ content: 'RELIEFS & ALLOWANCES', colSpan: 2, styles: { fontStyle: 'bold', fillColor: lightGray } }]);

        // Include Rent Relief only if it exists and is > 0
        if (taxData.reliefs?.rentRelief && taxData.reliefs.rentRelief > 0) {
            tableData.push(['Rent Relief Claimed (20%, max ₦500k)', `₦${taxData.reliefs.rentRelief.toLocaleString('en-NG', { minimumFractionDigits: 2 })}`]);
        }

        tableData.push(['Total Reliefs', `₦${(taxData.reliefs?.total || 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}`]);

        tableData.push([{ content: 'TAXABLE INCOME', colSpan: 2, styles: { fontStyle: 'bold', fillColor: lightGray } }]);
        tableData.push(['Chargeable Income', `₦${(taxData.chargeableIncome || 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}`]);
    }

    // Generate table
    autoTable(doc, {
        startY: yPosition,
        head: [['Description', 'Amount']],
        body: tableData,
        theme: 'striped',
        headStyles: {
            fillColor: primaryGreen,
            textColor: [255, 255, 255],
            fontSize: 10,
            fontStyle: 'bold'
        },
        styles: {
            fontSize: 9,
            cellPadding: 4,
            textColor: textDark
        },
        columnStyles: {
            0: { cellWidth: 120 },
            1: { cellWidth: 60, halign: 'right', fontStyle: 'bold' }
        },
        margin: { left: 15, right: 15 }
    });

    yPosition = doc.lastAutoTable.finalY + 10;

    // ============================================
    // TAX BANDS BREAKDOWN (Individual Only)
    // ============================================

    if (userData.userType !== 'company' && taxData.tax?.breakdown && taxData.tax.breakdown.length > 0) {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...textDark);
        doc.text('TAX BANDS APPLIED', 15, yPosition);
        yPosition += 8;

        const taxBandsData = taxData.tax.breakdown.map(band => [
            band.range,
            band.rate,
            `₦${band.taxableAmount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}`,
            `₦${band.tax.toLocaleString('en-NG', { minimumFractionDigits: 2 })}`
        ]);

        autoTable(doc, {
            startY: yPosition,
            head: [['Income Range', 'Rate', 'Taxable Amount', 'Tax']],
            body: taxBandsData,
            theme: 'striped',
            headStyles: {
                fillColor: darkGreen,
                textColor: [255, 255, 255],
                fontSize: 9,
                fontStyle: 'bold'
            },
            styles: {
                fontSize: 8,
                cellPadding: 3,
                textColor: textDark
            },
            columnStyles: {
                1: { halign: 'center' },
                2: { halign: 'right' },
                3: { halign: 'right', fontStyle: 'bold' }
            },
            margin: { left: 15, right: 15 }
        });

        yPosition = doc.lastAutoTable.finalY + 5;

        // Total Tax Row
        doc.setFillColor(...primaryGreen);
        doc.rect(15, yPosition, pageWidth - 30, 10, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('TOTAL TAX PAYABLE', 20, yPosition + 7);
        doc.text(`₦${totalTax.toLocaleString('en-NG', { minimumFractionDigits: 2 })}`, pageWidth - 20, yPosition + 7, { align: 'right' });

        yPosition += 15;
    }

    // ============================================
    // FOOTER / DISCLAIMER
    // ============================================

    const footerY = pageHeight - 30;

    doc.setFillColor(...lightGray);
    doc.rect(0, footerY - 5, pageWidth, 40, 'F');

    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(...textDark);

    const disclaimer = 'This tax assessment is an estimate based on the information provided and the Nigeria Tax Act 2025.';
    const disclaimer2 = 'Please consult with a qualified tax professional for official tax advice and filing.';

    doc.text(disclaimer, pageWidth / 2, footerY + 3, { align: 'center', maxWidth: pageWidth - 30 });
    doc.text(disclaimer2, pageWidth / 2, footerY + 9, { align: 'center', maxWidth: pageWidth - 30 });

    // Generated by TaxPadi
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...darkGreen);
    doc.text('Generated by TaxPadi • taxpadi.com', pageWidth / 2, footerY + 18, { align: 'center' });

    // ============================================
    // SAVE PDF
    // ============================================

    const fileName = userData.userType === 'company'
        ? 'TaxPadi_Company_Tax_Assessment.pdf'
        : 'TaxPadi_Tax_Assessment.pdf';

    doc.save(fileName);
}

/**
 * Format currency for PDF display
 * @param {number} amount 
 * @returns {string}
 */
function formatCurrency(amount) {
    return `₦${amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
