# INDIVIDUAL TAX DASHBOARD - MOBILE-FIRST FINTECH APP

**Version:** 2.0 (Redesigned for Mobile-First)  
**Product:** TaxGee Pro  
**Platform:** iOS/Android Mobile-First  
**Design Inspiration:** OPay, Moniepoint, Modern Banking Apps  
**Date:** December 30, 2025  
**Status:** Implementation Guide - Fintech Edition

---

## DESIGN PHILOSOPHY

**Mobile-First. Fintech-Grade. Zero Clutter.**

This is NOT a management dashboard. This is a fintech app. Think OPay. Think Moniepoint. Think simple, fast, purposeful interactions. No sidebars. No overwhelming information architecture. Every screen shows exactly what you need, right now.

---

## CORE PRINCIPLES

1. **One Action Per Screen** - Each screen has ONE primary purpose
2. **Thumb Zone Optimization** - All controls within thumb reach (bottom 60% of screen)
3. **Progressive Disclosure** - Show summary, tap to reveal detail
4. **Zero Friction** - Minimum taps to any action (≤3 taps max)
5. **Clear Status** - Color-coded alerts (green=good, yellow=caution, red=action needed)
6. **Micro-animations** - Smooth transitions that feel responsive without slowing
7. **Fast-loading** - Works on slow connections (2G-aware)
8. **Spacious Layout** - Generous padding, readable fonts, breathing room

---

# MAIN DASHBOARD

## Screen Layout

```
┌─────────────────────────────┐
│  ← TaxGee  [Profile Icon]  │  ← Minimal header
├─────────────────────────────┤
│                             │
│  Hi, John                   │  ← Personalized greeting
│  TIN: TIN-123456            │  ← Essential info
│                             │
├─────────────────────────────┤
│                             │
│  ╔════════════════════════╗ │
│  ║  TAX BALANCE DUE       ║ │  ← Primary card
│  ║  ₦1,623,000           ║ │
│  ║  Due by 31 Mar 2026   ║ │
│  ║  ⚠️ 92 days remaining ║ │
│  ╚════════════════════════╝ │
│                             │  ← Large, tappable
├─────────────────────────────┤
│  [File Return]  [Pay Tax]   │  ← Quick actions
│  [View Details] [Add Income]│  (2x2 grid, large buttons)
├─────────────────────────────┤
│                             │
│  Income      ₦31,000,000   │  ← Status chips
│  Tax Owed    ₦5,540,600    │
│  WHT Paid    ₦2,500,000    │
│                             │
├─────────────────────────────┤
│  Recent Activity            │  ← Scrollable list
│  ────────────────────────   │
│  • Income synced 2h ago    │
│  • WHT recorded 5 Dec      │
│  • Settings updated 3 Dec  │
│                             │
└─────────────────────────────┘
```

---

## Card Hierarchy

### PRIMARY CARD - Tax Balance Due
- **Size:** Full width, minimum 120px height
- **Color:** Conditional
  - 🔴 Red background: Amount due > 0 & < 30 days to deadline
  - 🟡 Yellow background: Amount due > 0 & 30-90 days
  - 🟢 Green background: Amount paid / No balance
- **Tap Target:** Full card is tappable → Opens payment flow
- **Content:**
  - Large amount (₦1,623,000)
  - Due date (31 Mar 2026)
  - Days remaining
  - Status emoji + text

### SECONDARY CHIPS (Below Primary Card)
- **Layout:** 3 horizontal chips, scrollable
- **Content:**
  - Income: ₦31,000,000
  - Tax Owed: ₦5,540,600
  - WHT Paid: ₦2,500,000
- **Interaction:** Tap to expand that section

---

## Quick Action Buttons

```
[File Return]        [Pay Tax]

[View Details]       [Add Income]
```

- **Size:** 2x2 grid, responsive to screen width
- **Minimum tap size:** 44x44px (iOS) / 48x48px (Android)
- **Primary actions:** File Return, Pay Tax (bolder colors)
- **Secondary actions:** View Details, Add Income (muted colors)
- **No text below icons** - Icon + label on same button
- **Micro-feedback:** Button darkens on tap, haptic feedback on press

---

## Recent Activity Section

```
Recent Activity

• Income synced 2h ago
• WHT recorded 5 Dec
• Settings updated 3 Dec

[View All Activity]
```

- **Display:** Last 3 items
- **Scrollable:** Full activity log accessible
- **Timestamps:** Relative (2h ago) not absolute
- **Tap Item:** View detail of that transaction/action
- **Swipe Right:** Quick action shortcuts (archive, undo if enabled)

---

# FILE RETURN FLOW

**Complexity:** Hidden. Shows one step at a time.

## Step 1: Return Type Selection

```
┌─────────────────────────────┐
│ ← File Return               │  ← Back button
│                             │
│  Which return are you       │
│  filing?                    │
│                             │
├─────────────────────────────┤
│                             │
│ ⭕ PAYE Return              │
│   Employer files for you    │
│                             │
│ ⭕ Direct Assessment         │
│   You file personally       │
│   (Self-employed, etc.)    │
│                             │
│ ⭕ Combined Return           │
│   Both salary + business    │
│                             │
├─────────────────────────────┤
│        [Continue]           │  ← Full-width button
│        [Save & Exit]        │  ← Secondary action
│                             │
└─────────────────────────────┘
```

**Design Notes:**
- Radio buttons (large, easy to tap)
- Help text under each option (not overwhelming)
- [Continue] only enabled after selection
- Progress: "1 of 5" at top (subtle)

---

## Step 2: Income Declaration (Tabbed Interface)

```
┌─────────────────────────────┐
│ ← Income Declaration  2 of 5 │
│                             │
│ [Employment] [Business]     │
│ [Investment]                │
├─────────────────────────────┤
│                             │
│ Employment Income           │  ← Currently selected tab
│                             │
│ Employer                    │
│ [ABC Corp Ltd]              │  ← Pre-filled if available
│                             │
│ Monthly Salary              │
│ [₦2,000,000]                │
│                             │
│ Total Employment            │  ← Auto-sum at top
│ ₦24,500,000                 │
│                             │
│ + Add Allowance             │  ← Expandable section
│ + Add Bonus                 │
│                             │
├─────────────────────────────┤
│        [Continue]           │
│                             │
└─────────────────────────────┘
```

**Design Notes:**
- **Tabs at top** - Swipe or tap to switch
- **Collapsible sections** - "Add Allowance" expands inline
- **Smart defaults** - Pre-fills from payroll if connected
- **Running total** - Shows as user inputs
- **Auto-calculations** - Monthly × 12 for annual

---

## Step 3: Reliefs & Deductions

```
┌─────────────────────────────┐
│ ← Tax Relief        3 of 5   │
│                             │
│ CRA (Your Deduction)        │
│ ₦6,174,000                  │
│ ℹ️ [How is this calculated?]│
│                             │
│ ☑️ Apply Full CRA           │
│ ○ Customize CRA             │
│                             │
├─────────────────────────────┤
│                             │
│ Pension Contribution        │
│ ₦130,000                    │
│ (Auto-detected from payroll)│
│                             │
│ [+ Add Voluntary Pension]   │
│                             │
├─────────────────────────────┤
│ 💡 Tax Saving Tips          │  ← Smart nudge
│                             │
│ Add ₦200K to pension        │
│ Save ₦48,000 in taxes       │
│                             │
│ [Apply Suggestion] [Skip]   │
│                             │
├─────────────────────────────┤
│        [Continue]           │
│                             │
└─────────────────────────────┘
```

**Design Notes:**
- **Smart defaults** - CRA auto-calculated, just confirm
- **Info icons** - Tap for explanation (not explaining upfront)
- **Suggestions** - Optional, not forced
- **Visual affordance** - Highlighted suggestion box
- **One decision per question** - Not overwhelming

---

## Step 4: Review & Calculate

```
┌─────────────────────────────┐
│ ← Tax Calculation   4 of 5   │
│                             │
│ Based on your income...     │  ← Context
│                             │
│ ╔═════════════════════════╗ │
│ ║ Your Tax Liability      ║ │
│ ║ ₦5,540,600             ║ │
│ ║ (17.87% effective rate) ║ │
│ ╚═════════════════════════╝ │
│                             │  ← Large, prominent
├─────────────────────────────┤
│                             │
│ Tax Breakdown               │  ← Expandable
│ [▼ Show Details]            │
│                             │
│ How much you've paid (WHT)  │
│ ₦2,500,000                  │
│                             │
│ ════════════════════════    │
│ Amount you still owe        │
│ ₦3,040,600                  │
│                             │
│ Due by 31 March 2026        │
│                             │
├─────────────────────────────┤
│        [Continue]           │
│                             │
└─────────────────────────────┘
```

**Design Notes:**
- **Single number focus** - Your tax liability
- **Breakdown optional** - "Show Details" is collapsible
- **Clear math** - Paid - Owed in plain language
- **Action-oriented** - Shows due date and what's due

---

## Step 5: File & Pay

```
┌─────────────────────────────┐
│ ← Ready to File     5 of 5   │
│                             │
│ ✓ All information complete  │
│                             │
│ Confirm & File              │
│                             │
│ ☑️ I confirm this is        │  ← Checkbox
│    accurate                 │
│                             │
├─────────────────────────────┤
│                             │
│ After filing:               │  ← Transparency
│                             │
│ • Get DIN (receipt ID)      │
│ • Amount due: ₦3,040,600   │
│ • Due date: 31 Mar 2026     │
│                             │
├─────────────────────────────┤
│                             │
│  [File to FIRS Now]         │  ← Primary CTA
│                             │
│  [Save as Draft]            │  ← Secondary
│                             │
└─────────────────────────────┘
```

**Design Notes:**
- **Minimal review** - Trust the previous steps
- **One checkbox** - Confirmation, not multiple conditions
- **Clear expectations** - Show what happens next
- **Two paths** - File now or save draft

---

## Success Screen

```
┌─────────────────────────────┐
│                             │
│         ✅                  │  ← Big checkmark
│                             │
│  Return Filed Successfully! │
│                             │
│  DIN-2025-0001              │  ← Copy-able
│                             │
├─────────────────────────────┤
│                             │
│  Tax Due: ₦3,040,600        │
│  Due by: 31 Mar 2026        │
│  Status: Submitted to FIRS  │
│                             │
├─────────────────────────────┤
│                             │
│  What's Next?               │
│                             │
│  [Pay Tax Now]              │
│  [Download Receipt]         │
│  [Back to Dashboard]        │
│                             │
│  ────────────────────────   │
│                             │
│  Need help?                 │
│  [Email Support]            │
│                             │
└─────────────────────────────┘
```

**Design Notes:**
- **Celebration moment** - Big checkmark, clear success
- **Copy DIN** - Tap to copy to clipboard
- **Next steps** - Three most common actions
- **Support link** - Subtle, at bottom

---

# PAY TAX FLOW

## Amount Screen

```
┌─────────────────────────────┐
│ ← Pay Tax                   │
│                             │
│ Amount Due                  │
│ ₦3,040,600                  │
│                             │
│ DIN: DIN-2025-0001          │
│ Due: 31 Mar 2026            │
│                             │
├─────────────────────────────┤
│                             │
│ How do you want to pay?     │
│                             │
├─────────────────────────────┤
│                             │
│ 💳 Paystack Card            │
│    Instant | Card fee       │  ← Primary option
│    You pay: ₦3,045,881      │
│                             │
│ 🏦 Bank Transfer            │
│    1-3 days | No fee        │  ← Secondary option
│    You pay: ₦3,040,600      │
│                             │
│ 🏢 FIRS Office              │
│    Cash/Check | No fee      │  ← Tertiary option
│    You pay: ₦3,040,600      │
│                             │
│ ────────────────────────    │
│ [View Other Methods]        │  ← Expandable
│                             │
├─────────────────────────────┤
│                             │
│  [Pay with Paystack]        │  ← Defaults to first
│                             │
└─────────────────────────────┘
```

**Design Notes:**
- **One selection per screen**
- **Show final amount** - Including fees if applicable
- **Recommendation** - Fastest/easiest option highlighted
- **Details** - Timeline and fee shown per method
- **Default** - First option pre-selected for speed

---

## Payment Confirmation

```
┌─────────────────────────────┐
│ ← Confirm Payment           │
│                             │
│ You're about to pay         │
│                             │
│ ₦3,040,600                  │
│ from ABC Bank               │
│ to Federal Inland Revenue   │
│ Service                     │
│                             │
├─────────────────────────────┤
│                             │
│ For:                        │
│ Tax Return DIN-2025-0001    │
│                             │
│ Via: Paystack (Credit Card) │
│                             │
├─────────────────────────────┤
│                             │
│ ☑️ I authorize this payment │
│                             │
├─────────────────────────────┤
│                             │
│  [Complete Payment]         │
│                             │
│  [Back]                     │
│                             │
└─────────────────────────────┘
```

**Design Notes:**
- **Clear confirmation** - No ambiguity
- **Show source & destination**
- **Single checkbox** - One confirmation
- **One-tap payment** - [Complete Payment] triggers gateway

---

# INCOME TRACKING

## Add Income Screen

```
┌─────────────────────────────┐
│ ← Add Income                │
│                             │
│ What type of income?        │
│                             │
│ 🏢 [Employment]             │  ← Cards, not radio
│    Salary from your job     │
│                             │
│ 💼 [Self-Employment]        │
│    Your business income     │
│                             │
│ 📈 [Investment]             │
│    Dividends, interest      │
│                             │
│ 🏠 [Rental]                 │
│    Property income          │
│                             │
└─────────────────────────────┘
```

**Design Notes:**
- **Card-based selection** - Not radio buttons
- **Icons + label** - Visual clarity
- **Direct navigation** - Tap card → income form
- **Contextual help** - Description under title

---

## Income Entry Form

```
┌─────────────────────────────┐
│ ← Employment Income         │
│                             │
│ Employer                    │
│ [ABC Corp Ltd]              │
│                             │
│ Monthly Salary              │
│ ₦_ _ _ _ , _ _ _            │ ← Formatted input
│                             │
│ Allowances (optional)       │
│ ₦_ _ _ _ , _ _ _            │
│ ├─ Housing                  │  ← Expandable
│ ├─ Transport                │
│ └─ Leave                    │
│                             │
│ Annual Bonus (optional)     │
│ ₦_ _ _ _ , _ _ _            │
│                             │
├─────────────────────────────┤
│                             │
│ Total Annual Income         │  ← Auto-calculated
│ ₦24,500,000                 │
│                             │
│ (Calculated: Monthly × 12   │
│  + Allowances + Bonus)      │
│                             │
├─────────────────────────────┤
│                             │
│  [Save Income]              │
│  [Clear]                    │
│                             │
└─────────────────────────────┘
```

**Design Notes:**
- **Formatted input** - Thousands separators shown as user types
- **Optional fields** - Grayed out, expandable
- **Running total** - Shows auto-calculation
- **Clear formula** - Show how total is calculated
- **Smart affordances** - [Save] only enabled when valid

---

# SETTINGS & PROFILE

## Minimal Settings Screen

```
┌─────────────────────────────┐
│ ← Settings                  │
│                             │
│ Profile                     │
│ John Doe                    │
│ john@example.com            │  ← Tap to edit
│                             │
│ TIN                         │
│ TIN-123456                  │
│ ✓ Verified                  │
│                             │
├─────────────────────────────┤
│                             │
│ Tax Preferences             │
│                             │
│ Default Return Type         │  ← Picker
│ Direct Assessment ▼         │
│                             │
│ Auto-file Reminders         │  ← Toggle
│ [Toggle ON]                 │
│                             │
│ Days before filing          │
│ 14 days ▼                   │
│                             │
├─────────────────────────────┤
│                             │
│ Payment Methods             │
│                             │
│ Default Payment             │  ← Picker
│ Paystack ▼                  │
│                             │
│ Saved Cards                 │
│ [+ Add Card]                │
│                             │
├─────────────────────────────┤
│                             │
│ [Help & Support]            │
│ [Privacy Policy]            │
│ [Log Out]                   │
│                             │
└─────────────────────────────┘
```

**Design Notes:**
- **Only essentials** - Other settings hidden in "Advanced" toggle
- **Clear sections** - Profile, Preferences, Payment, Legal
- **Toggles for on/off** - Not checkboxes
- **Pickers for selection** - Not dropdowns
- **Tap to edit** - Profile info is just tappable

---

# NAVIGATION

## Bottom Tab Bar (Like OPay/Moniepoint)

```
┌──────────────────────────────┐
│                              │  ← Scrollable content
│         MAIN CONTENT          │
│                              │
│                              │
│                              │
└──────────────────────────────┘
┌──────────────────────────────┐
│ 🏠      📋      💰      ⚙️    │  ← Tab bar
│ Home    Filing  Payment Settings
│ (Active)                      │
└──────────────────────────────┘
```

**Tabs:**
1. **Home** - Dashboard (default)
2. **Filing** - Return status & history
3. **Payment** - Payment tracking
4. **Settings** - Profile & preferences

**Design Notes:**
- **Icons only** - Labels on tap
- **Consistent 4 tabs** - Never more than 4
- **Bottom positioned** - Easy thumb access
- **Active indicator** - Tab color changes
- **Haptic feedback** - Tap feedback on mobile

---

# COLORS & STATUS

## Status Indicators

- 🔴 **Red** - Action required NOW (payment due < 7 days)
- 🟡 **Yellow** - Due soon (payment due 7-30 days)
- 🟢 **Green** - All good (paid, filed, no action needed)
- 🔵 **Blue** - Information (submitted, awaiting FIRS response)
- ⚪ **Gray** - Archived, old, not active

## Color Usage

```
Primary Action (File/Pay):   #2563EB (Blue)
Success Feedback:           #10B981 (Green)
Caution/Alert:             #F59E0B (Amber)
Error/Action Required:     #EF4444 (Red)
Background:                #FFFFFF or #F9FAFB
Text Primary:              #111827 (Dark Gray)
Text Secondary:            #6B7280 (Medium Gray)
Borders:                   #E5E7EB (Light Gray)
```

---

# TYPOGRAPHY

```
Headlines:      Inter Semibold, 20-24px
Subheadings:    Inter Medium, 16-18px
Body Text:      Inter Regular, 14-16px
Captions:       Inter Regular, 12-13px
Numbers (Amount):Inter Bold, 28-32px

Line Height:    1.5 (body), 1.2 (headlines)
Letter Spacing: -0.01em (headlines)
```

---

# SPACING & LAYOUT

```
Safe Insets:    16px left/right (mobile), 20px (tablet)
Card Padding:   16px internal
Button Height:  48px (minimum thumb target)
Icon Size:      24x24px (standard), 32x32px (large)
Border Radius:  8px (standard), 12px (large cards)
Dividers:       1px solid #E5E7EB

Grid:           8pt baseline grid
Gaps:           8px, 12px, 16px, 24px (multiples of 8)
```

---

# ANIMATIONS & TRANSITIONS

**Keep it light. Keep it fast.**

```
Fade In/Out:    200ms
Slide (cards):  250ms ease-out
Button Press:   150ms scale(0.98)
Loading:        Smooth circular spinner
Page Trans:     Slide from right (forward), left (back)
Success:        Confetti (1 second, light)

Avoid:          Bounce, spring, delays > 300ms
```

---

# LOADING & ERROR STATES

## Loading

```
┌─────────────────────────────┐
│                             │
│         ⏳                  │
│      Loading...             │
│                             │
│   [Calculating tax...]      │
│                             │
└─────────────────────────────┘
```

- **Circular spinner** - Smooth rotation
- **Context text** - What's happening
- **Can cancel** - [Back] button available
- **No timeout messages** - If it's slow, network is slow

---

## Error States

```
┌─────────────────────────────┐
│                             │
│         ⚠️                  │
│                             │
│   Something went wrong      │
│                             │
│   We couldn't connect to    │
│   FIRS right now. Try       │
│   again in a moment.        │
│                             │
├─────────────────────────────┤
│                             │
│  [Retry]                    │  ← Primary action
│  [Save & Try Later]         │  ← Secondary
│                             │
└─────────────────────────────┘
```

**Design Notes:**
- **Clear problem** - Not technical jargon
- **Actionable solution** - What to do next
- **Retry button** - First option
- **Fallback option** - Save and exit gracefully

---

# API INTEGRATION (Same Endpoints)

No changes to backend API structure. Mobile UI simply consumes the same endpoints more efficiently:

```
GET /api/personal/income
GET /api/personal/reliefs
GET /api/personal/wht
GET /api/personal/tax-calculation
POST /api/personal/income-tax/file
POST /api/personal/tax-payment
GET /api/personal/tax-estimate
GET /api/personal/tax-clearance
```

---

# PERFORMANCE TARGETS (Mobile)

- **Page load:** < 2 seconds on 3G
- **Calculation:** < 1 second
- **Filing submission:** < 10 seconds
- **Payment gateway:** < 5 seconds (Paystack)
- **Animation duration:** 200-300ms max
- **No janky scrolling** - 60fps always
- **Offline mode:** Show cached data, sync when online

---

# IMPLEMENTATION PRIORITIES

## Phase 1 (MVP - 4 weeks)
- Dashboard with balance card
- File Return (simplified 5-step wizard)
- Pay Tax (card only)
- Basic settings

## Phase 2 (2 weeks later)
- Income tracking UI
- Payment methods (add bank transfer, FIRS office)
- Tax estimate tool
- Settings expansion

## Phase 3 (Ongoing)
- Advanced analytics
- Accountant sharing
- Notifications/calendar
- Tax planning tools

---

# DESIGN SYSTEM TOKENS

```typescript
// Spacing
const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32
}

// Typography
const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 32
}

// Colors
const colors = {
  primary: '#2563EB',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  bg: '#FFFFFF',
  surface: '#F9FAFB',
  text: '#111827',
  textSecondary: '#6B7280'
}

// Components
const borderRadius = {
  sm: 6,
  md: 8,
  lg: 12
}
```

---

# KEY DIFFERENCES FROM MANAGEMENT APP VERSION

| Aspect | Old Version | New Version |
|--------|------------|-------------|
| **Layout** | Desktop-first with sidebars | Mobile-first, bottom tabs |
| **Information** | Detailed summaries everywhere | One primary number per screen |
| **Navigation** | Header + sidebar menus | Bottom tab bar |
| **Actions** | Many options visible | Progressive disclosure |
| **Forms** | Long pages with many fields | Step-by-step wizard |
| **Visual** | Dense, informational | Spacious, actionable |
| **Tone** | Professional/Corporate | Friendly/Consumer |

---

# MOBILE-SPECIFIC CONSIDERATIONS

## iOS
- Safe area insets for notch
- Large title bar (collapsing) on scroll
- Haptic feedback on button press
- Biometric auth (Face ID/Touch ID)
- Bottom sheet for modals

## Android
- System back button integration
- Material Design 3 compliance
- Status bar color theming
- Gesture navigation support
- Haptic engine integration

## Network
- Works on 3G/slow connections
- Offline mode (show last synced data)
- Progressive loading (show skeleton)
- Automatic retry on network recovery

---

# NEXT STEPS

1. **Design System:** Create Figma file with all components
2. **Prototypes:** Build interactive prototype for user testing
3. **User Testing:** Test with 10-15 real users (Nigerians with phones)
4. **Implementation:** Build in React Native or Flutter
5. **Beta:** Release to 100 beta testers
6. **Feedback:** Iterate on real usage patterns

---

**This is a fintech app. Make it feel like one.**

Speed. Clarity. Purpose. Trust.

---

**Document Version:** 2.0 (Mobile-First Redesign)  
**Status:** Ready for Design & Development  
**Date:** December 30, 2025  
**Product:** TaxGee Pro - Mobile Edition  
**Target Platform:** iOS 14+ / Android 11+
