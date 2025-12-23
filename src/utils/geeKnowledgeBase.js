/**
 * Padi Knowledge Base Helper
 * Simulates AI responses by intelligently searching through Padi_KnowledgeBase.md
 */

// Knowledge base content (embedded for quick access)
const KNOWLEDGE_BASE = `
# Gee - Nigerian Tax Assistant

## Personal Income Tax (PIT)

**Tax Bands (Progressive Tax):**
- First ₦800,000: Tax Free (0%)
- Next ₦2.2 Million: 15%
- Next ₦9.0 Million: 18%
- Next ₦13.0 Million: 21%
- Next ₦25.0 Million: 23%
- Above ₦50.0 Million: 25%

**Reliefs & Deductions:**
- Rent Relief: 20% of annual rent, maximum ₦500,000
- Pension: Contributions (usually 8%) are tax-free
- NHF: Contributions (2.5%) are tax-free
- Health Insurance: NHIS or private premiums are tax-deductible

**Minimum Wage Rule:**
If you earn the National Minimum Wage or less, you are completely exempt from income tax.

## Business Tax (CIT)

**Small Companies (₦50M or less turnover):**
- Tax Rate: 0%
- Must still file returns for Tax Clearance Certificate

**Medium/Large Companies (above ₦50M):**
- Tax Rate: 30% of assessable profits
- Development Levy: 4% on assessable profits

## Value Added Tax (VAT)

**Standard Rate:** 7.5%

**Exempt Items:**
- Basic food items
- Medical and pharmaceutical products
- Educational books and materials
- Baby products
- Fertilizers and locally produced animal feeds

## Definitions

**TIN:** Tax Identification Number - Mandatory for all bank accounts and government services
**Chargeable Income:** Gross Income minus Exemptions and Reliefs
**Assessment Year:** January 1 to December 31
`;

/**
 * Question patterns and their responses
 */
const RESPONSE_PATTERNS = [
    {
        keywords: ['tax band', 'rate', 'percentage', 'how much tax', 'tax rate'],
        response: `Nigeria uses a progressive tax system with 6 bands:

• First ₦800,000: 0% (Tax Free! 🎉)
• Next ₦2.2M: 15%
• Next ₦9M: 18%
• Next ₦13M: 21%
• Next ₦25M: 23%
• Above ₦50M: 25%

Your tax is calculated by applying each rate to the portion of your income in that band.`
    },
    {
        keywords: ['rent', 'rent relief', 'housing'],
        response: `You can claim Rent Relief under the 2025 Tax Act!

✅ How it works:
• Claim 20% of your annual rent
• Maximum cap: ₦500,000

Example: If your annual rent is ₦3,000,000:
• 20% = ₦600,000
• But you can only claim ₦500,000 (the cap)

This reduces your taxable income!`
    },
    {
        keywords: ['pension', 'nhf', 'nhis', 'deduction', 'deduct'],
        response: `Yes! These deductions reduce your taxable income:

💰 **Tax-Deductible Contributions:**
• Pension: Usually 8% of your salary
• NHF (National Housing Fund): 2.5% of basic salary
• NHIS: Health insurance premiums

All of these are subtracted from your gross income before calculating tax.`
    },
    {
        keywords: ['small business', 'company', '50 million', 'turnover', 'cit'],
        response: `Great news for small businesses!

🏢 **Small Company (Turnover ≤ ₦50M):**
• Tax Rate: 0% 🎉
• You pay NO Companies Income Tax!

🏭 **Large Company (Turnover > ₦50M):**
• Tax Rate: 30% of assessable profits
• Development Levy: 4%

Note: Even at 0%, you must still file returns to get your Tax Clearance Certificate.`
    },
    {
        keywords: ['vat', 'value added', '7.5', 'sales tax'],
        response: `VAT (Value Added Tax) in Nigeria:

📊 **Standard Rate:** 7.5%

🚫 **Exempt Items (No VAT):**
• Basic food items
• Medical/pharmaceutical products
• Educational books and materials
• Baby products
• Fertilizers
• Locally produced animal feeds`
    },
    {
        keywords: ['minimum wage', 'exempt', 'poor', 'low income'],
        response: `If you earn the National Minimum Wage or less, you are COMPLETELY EXEMPT from paying income tax! 🎉

You still should file returns for record purposes, but you won't owe any tax.

Plus, with the new ₦800,000 tax-free threshold, many low-income earners pay zero or minimal tax.`
    },
    {
        keywords: ['tin', 'tax identification', 'number'],
        response: `TIN (Tax Identification Number):

📋 It's a mandatory number for:
• Opening bank accounts
• Government services
• Business registration
• Tax filing

You can get it from FIRS (Federal Inland Revenue Service) or your State tax office.`
    },
    {
        keywords: ['calculate', 'how', 'computation', 'formula'],
        response: `Here's how your tax is calculated:

1️⃣ Start with Gross Income
2️⃣ Subtract Deductions (Pension, NHF, NHIS)
3️⃣ Subtract Reliefs (Rent Relief, etc.)
4️⃣ = Chargeable Income
5️⃣ Apply progressive tax bands
6️⃣ = Total Tax

The TaxGee calculator does all this automatically! Just enter your details and click Calculate Tax. 😊`
    },
    {
        keywords: ['cra', 'consolidated relief', 'allowance'],
        response: `Good question! Under the NEW Nigeria Tax Act 2025, the old Consolidated Relief Allowance (CRA) has been replaced.

❌ Old: CRA (₦200k + 20% of gross)
✅ New: 
• ₦800,000 tax-free threshold
• Specific reliefs like Rent Relief
• Higher exemption bands

The new system is actually more generous for most taxpayers!`
    },
    {
        keywords: ['file', 'filing', 'return', 'deadline', 'when'],
        response: `Tax filing in Nigeria:

📅 **Assessment Year:** January 1 - December 31

📝 **Filing Deadlines:**
• Individual: Usually 6 months after year-end
• Companies: Usually 6 months after year-end

💡 Tip: Use the TaxGee calendar download feature to get all important dates with reminders!`
    }
];

/**
 * Get AI response from Gee
 * Simulates AI by pattern matching against knowledge base
 */
export function getGeeResponse(userMessage) {
    const messageLower = userMessage.toLowerCase();

    // Check greeting
    if (messageLower.match(/^(hi|hello|hey|good)/)) {
        return `Hello! 👋 I'm Gee, your friendly Nigerian tax assistant!

I can help you understand:
• Tax bands and rates
• Deductions and reliefs
• Small business tax
• VAT rules
• How tax is calculated

What would you like to know about Nigerian tax?`;
    }

    // Check thank you
    if (messageLower.match(/(thank|thanks|appreciate)/)) {
        return `You're welcome! 😊 Feel free to ask if you have more questions about Nigerian tax. I'm here to help!`;
    }

    // Search for matching pattern
    for (const pattern of RESPONSE_PATTERNS) {
        if (pattern.keywords.some(keyword => messageLower.includes(keyword))) {
            return pattern.response;
        }
    }

    // Default response if no pattern matches
    return `I'm Gee, your tax assistant! 🤔

I can help you with:
• Tax bands and calculation
• Rent relief and deductions
• Small business tax (0% for turnover ≤ ₦50M!)
• VAT information
• TIN and filing requirements

Could you rephrase your question? Or try asking about any of the topics above!`;
}
