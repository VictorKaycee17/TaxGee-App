# INDIVIDUAL TAX DASHBOARD - PAGE FLOWS & INTERCONNECTIONS

**Version:** 1.0  
**Product:** TaxGee Personal  
**Application Type:** Individual Income Tax Management  
**Date:** December 30, 2025  
**Status:** Implementation Guide

---

## TABLE OF CONTENTS

### PART A: INCOME TRACKER PAGE
1. [Page Overview](#part-a-page-overview)
2. [Header Action Buttons](#part-a-header-buttons)
3. [Filter Controls](#part-a-filters)
4. [Income Table](#part-a-income-table)
5. [Side Cards](#part-a-side-cards)

### PART B: EXPENSES & DEDUCTIBLES PAGE
6. [Page Overview](#part-b-page-overview)
7. [Header Action Buttons](#part-b-header-buttons)
8. [Filter Controls](#part-b-filters)
9. [Expense Table](#part-b-expense-table)
10. [Category Breakdown](#part-b-categories)

### PART C: TAX POSITION PAGE
11. [Page Overview](#part-c-page-overview)
12. [Tax Summary Cards](#part-c-summary-cards)
13. [Calculation Breakdown](#part-c-calculations)
14. [Action Buttons](#part-c-actions)

### PART D: FILING & RETURNS
15. [Page Overview](#part-d-page-overview)
16. [Return Wizard](#part-d-wizard)
17. [Filing Status & History](#part-d-history)

### PART E: INTEGRATION
18. [Data Flow](#part-e-data-flow)
19. [Page Interconnections](#part-e-interconnections)
20. [State Management](#part-e-state-management)
21. [API Endpoints](#part-e-api-endpoints)
22. [Error Handling](#part-e-error-handling)
23. [Implementation Checklist](#part-e-checklist)

---

---

# PART A: INCOME TRACKER PAGE

---

## PART A: PAGE OVERVIEW

### Purpose

The **Income Tracker Page** is where individuals log and manage all income sources throughout the year, track tax already paid (PAYE/WHT), and see YTD income totals.

### Key Features

- Add income from multiple sources (salary, freelance, rent, dividends, etc.)
- Manual entry, CSV import, or bank auto-tagging
- Track PAYE/WHT already deducted by employer
- Filter and search by income source and period
- Income breakdown by type (salary, business, investment, other)
- Monthly and YTD summary views

### Page Layout

```
┌────────────────────────────────────────────────────────────────┐
│ [Logo] TaxGee    [Search]  [🔔 Notify]  [Gee-AI]  [👤 Profile] │ ← Top Bar
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ ┌──── Income Tracker Header ──────────────────────────────────┐ │
│ │ Income Tracker                                             │ │
│ │ Track all income sources and tax deductions                │ │
│ │                                                            │ │
│ │ [+ Add Income ▼] [Import CSV] [🔍 Search] [Analytics]   │ │
│ │ [Export] [⚙️ Settings]                                    │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                │
│ ┌──── Summary Stats ──────────────────────────────────────────┐ │
│ │ YTD Income: ₦6,240,000  │  PAYE Paid: ₦936,000            │ │
│ │ Monthly Avg: ₦520,000   │  Remaining (unfiled): ₦936,000  │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                │
│ ┌──── Filter Bar ──────────────────────────────────────────────┐ │
│ │ Period: [YTD ▼]  Source: [All ▼]  Month: [All ▼]         │ │
│ │ [Apply Filters] [Clear]                                     │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                │
│ ┌──── Income Table ───────────────────────────────────────────┐ │
│ │ Date | Source | Description | Amount | PAYE | Net | Edit  │ │
│ │ 12/25 | Salary | Oct 2025 | ₦520K | ₦78K | ₦442K | ✎     │ │
│ │ 12/10 | Freelance | Web Dev Project | ₦250K | ₦12.5K | ✎ │ │
│ │ 11/30 | Salary | Sept 2025 | ₦520K | ₦78K | ₦442K | ✎   │ │
│ │ 11/15 | Rental Income | Apartment | ₦150K | - | ✎         │ │
│ │ ...                                                         │ │
│ │ [Pagination]                                               │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                │
│ ┌──────────────────┐  ┌──────────────────┐                   │
│ │ Income by Source │  │ YTD Comparison   │                   │
│ │ Salary: ₦5.04M   │  │ 2025: ₦6.24M     │                   │
│ │ Freelance: ₦780K │  │ 2024: ₦5.80M     │                   │
│ │ Rental: ₦450K    │  │ Growth: +7.6%    │                   │
│ │ (pie chart)      │  │ (bar chart)      │                   │
│ └──────────────────┘  └──────────────────┘                   │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## PART A: HEADER BUTTONS

### A.1 Add Income Button (Dropdown)

**Component:** `AddIncomeButton`  
**Type:** Primary Button with Dropdown  
**Location:** Page header, left side  
**Icon:** + (plus)  
**Label:** "+ Add Income ▼"

#### Button Specification

```typescript
interface AddIncomeButtonProps {
  onClick: () => void;
  disabled?: boolean;
}
```

#### Flow: User Clicks [+ Add Income ▼]

```
1. User clicks [+ Add Income ▼]
   ↓
2. Dropdown menu appears with options:
   ├─ ✍️ Manual Entry
   │  └─ "Type in income details"
   ├─ 📄 Upload Payslip
   │  └─ "Upload salary slip PDF/image"
   └─ 📋 CSV Import
      └─ "Bulk import income records"
   ↓
3A. USER SELECTS: Manual Entry
   ├─ Navigate to /income-tracker/new?type=manual
   │  OR open modal: "Add Income"
   │
   ├─ Form displays:
   │  ├─ INCOME DETAILS
   │  │  ├─ Income Type: [Salary ▼]
   │  │  │  ├─ Salary (from employment)
   │  │  │  ├─ Freelance/Contract
   │  │  │  ├─ Rental Income
   │  │  │  ├─ Business Income
   │  │  │  ├─ Dividends
   │  │  │  ├─ Interest
   │  │  │  └─ Other
   │  │  │
   │  │  ├─ Source/Employer: [________________]
   │  │  ├─ Description: [________________]
   │  │  ├─ Income Date: [Date picker]
   │  │  └─ Period (if recurring): [Month ▼]
   │  │
   │  ├─ AMOUNTS
   │  │  ├─ Gross Income: [₦__________]
   │  │  ├─ Tax Already Paid (PAYE/WHT): [₦__________]
   │  │  │  ├─ Auto-filled if type = Salary
   │  │  │  └─ Can be 0 for some income types
   │  │  ├─ Net Income: [₦__________] (read-only: Gross - Tax Paid)
   │  │  └─ Year: [2025 ▼]
   │  │
   │  ├─ CLASSIFICATION
   │  │  ├─ Is this taxable income? [Yes/No]
   │  │  ├─ Applicable relief: [None ▼]
   │  │  │  ├─ None
   │  │  │  ├─ Investment Income Relief
   │  │  │  └─ Other
   │  │  └─ Supporting document: [Upload ▼]
   │  │
   │  └─ [Save & Continue] [Save & New] [Cancel]
   │
   └─ On submit:
      ├─ POST /api/income-tracker/income
         {
           incomeType: "salary",
           source: "Company ABC Ltd",
           description: "October 2025 salary",
           grossAmount: 520000,
           taxPaid: 78000,
           netAmount: 442000,
           incomeDate: "2025-10-31",
           isRecurring: true,
           month: "October",
           isTaxable: true,
           year: 2025
         }
      ├─ Response: {incomeId, status: "recorded"}
      ├─ Toast: "✓ Income added"
      ├─ Redirect: /income-tracker (list refreshes)
      └─ New income appears in table

   ↓
3B. USER SELECTS: Upload Payslip
   ├─ Navigate to /income-tracker/upload?type=payslip
   │
   ├─ Upload wizard displays:
   │  ├─ STEP 1: FILE UPLOAD
   │  │  ├─ Drop zone: "Drag payslip PDF/image here"
   │  │  ├─ Click to browse: [Choose File]
   │  │  ├─ Accepted: PDF, JPG, PNG
   │  │  ├─ Max size: 10MB
   │  │  └─ Progress bar during upload
   │  │
   │  └─ [Next] [Cancel]
   │
   ├─ STEP 2: OCR EXTRACTION & REVIEW
   │  ├─ Backend processes:
   │  │  ├─ Extract text via OCR
   │  │  ├─ Identify employer, salary amounts
   │  │  ├─ Extract PAYE deducted
   │  │  ├─ Identify pay period
   │  │  └─ Calculate net amount
   │  │
   │  ├─ Display editable form:
   │  │  ├─ Employer: [Extracted: ABC Company | Editable]
   │  │  ├─ Gross Salary: [Extracted: ₦520,000 | Editable]
   │  │  ├─ PAYE Deducted: [Extracted: ₦78,000 | Editable]
   │  │  ├─ Pay Period: [Extracted: Oct 2025 | Editable]
   │  │  ├─ Confidence: 92%
   │  │  └─ [Edit] buttons for low-confidence fields
   │  │
   │  └─ [Next] [Previous]
   │
   ├─ STEP 3: CONFIRMATION
   │  ├─ Net amount calculated: ₦442,000
   │  ├─ Is this recurring monthly? [Yes/No]
   │  ├─ Mark for recurring entry: [Toggle]
   │  │  └─ Will auto-create entry same day each month
   │  │
   │  └─ [Previous] [Save Income]
   │
   └─ On submit:
      ├─ POST /api/income-tracker/income
         {
           incomeType: "salary",
           source: "ABC Company",
           grossAmount: 520000,
           taxPaid: 78000,
           netAmount: 442000,
           payPeriod: "Oct 2025",
           isRecurring: true,
           payslipFileUrl: "s3://...",
           ocrData: {...extracted values},
           confidence: 92
         }
      ├─ Response: {incomeId, status: "recorded"}
      ├─ Toast: "✓ Income from payslip added"
      ├─ Redirect: /income-tracker
      └─ If recurring: Set up monthly auto-entry

   ↓
3C. USER SELECTS: CSV Import
   ├─ Navigate to /income-tracker/import?type=csv
   │
   ├─ CSV upload wizard displays:
   │  ├─ STEP 1: FILE UPLOAD & PREVIEW
   │  │  ├─ Drop zone: "Drag CSV file here"
   │  │  ├─ Click: [Choose File]
   │  │  ├─ Accepted: CSV only
   │  │  ├─ Template available: [Download Template]
   │  │  └─ Progress bar
   │  │
   │  ├─ Preview table (first 5 rows):
   │  │  ├─ Date | Type | Source | Amount | Tax | Period
   │  │  ├─ 2025-10-31 | Salary | ABC Co | 520000 | 78000 | Oct
   │  │  ├─ 2025-10-15 | Freelance | Client X | 250000 | 12500 | Oct
   │  │  └─ ...
   │  │
   │  └─ [Next] [Cancel]
   │
   ├─ STEP 2: COLUMN MAPPING
   │  ├─ Match CSV columns to system fields:
   │  │  ├─ Column A → [Date ▼]
   │  │  ├─ Column B → [Income Type ▼]
   │  │  ├─ Column C → [Source ▼]
   │  │  ├─ Column D → [Gross Amount ▼]
   │  │  ├─ Column E → [Tax Paid ▼]
   │  │  └─ Column F → [Period ▼]
   │  │
   │  └─ [Next] [Previous]
   │
   ├─ STEP 3: VALIDATION & REVIEW
   │  ├─ Validate all rows:
   │  │  ├─ Check for duplicates
   │  │  ├─ Validate dates
   │  │  ├─ Validate amounts are numbers
   │  │  └─ Show: "12 rows valid, 0 warnings, 0 errors"
   │  │
   │  ├─ Table of all rows with status:
   │  │  ├─ ✓ Row 1: Salary | ABC Co | ₦520,000
   │  │  ├─ ✓ Row 2: Freelance | Client X | ₦250,000
   │  │  └─ ... (all 12 rows)
   │  │
   │  └─ [Previous] [Import All]
   │
   └─ On submit:
      ├─ POST /api/income-tracker/import
         {
           rows: [
             {date, type, source, grossAmount, taxPaid, period},
             ...
           ],
           mapping: {column_mapping...},
           year: 2025
         }
      ├─ Backend processes:
      │  ├─ Validate all rows
      │  ├─ Calculate net amounts
      │  ├─ Check for duplicates
      │  └─ Return: {created: 12, updated: 0, skipped: 0, errors: []}
      ├─ Response page: "✓ Imported 12 income records"
      ├─ Toast: "✓ 12 income records imported successfully"
      └─ Redirect: /income-tracker (with new entries highlighted)
```

#### Integration Points

- **API endpoints:**
  - POST /api/income-tracker/income (manual)
  - POST /api/income-tracker/upload (payslip)
  - POST /api/income-tracker/import (CSV)
- **Data sources:** Employer database, bank feeds (optional), OCR service
- **Recurring:** Auto-create monthly entries if configured
- **Audit:** Log all income entries

#### Success Criteria

✅ All three entry methods work  
✅ Manual entry form validates  
✅ Payslip upload processes OCR correctly  
✅ CSV import handles bulk data  
✅ PAYE/WHT auto-calculated  
✅ Net amount calculated correctly  
✅ Income appears in table after creation  
✅ Recurring entries can be set  

---

### A.2 Import CSV Button

**Component:** `ImportCSVButton`  
**Type:** Secondary Button  
**Location:** Page header, left-center  
**Icon:** 📋 (document)  
**Label:** "Import CSV"

#### Button Specification

```typescript
interface ImportCSVButtonProps {
  onClick: () => void;
  disabled?: boolean;
}
```

#### Flow: User Clicks [Import CSV]

```
1. User clicks [Import CSV]
   ↓
2. Same as "Add Income" → "CSV Import" path above
   └─ Opens CSV import wizard at Step 1
   ↓
3. User completes import
   ├─ All rows processed
   ├─ Income entries created
   └─ Returns to income tracker list
```

---

### A.3 Search Button

**Component:** `IncomeSearchInput`  
**Type:** Text Input with Search Icon  
**Location:** Page header, center  
**Icon:** 🔍 (magnifying glass)  
**Placeholder:** "Search income..."

#### Button Specification

```typescript
interface IncomeSearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}
```

#### Flow: User Types in Search

```
1. User clicks on search input or starts typing
   ↓
2. Search box becomes active
   ├─ Shows placeholder: "Search by source, type, amount..."
   └─ Cursor ready for input
   ↓
3. User types (e.g., "ABC Company" or "Freelance")
   ↓
4. Real-time search (debounced):
   ├─ Debounce: 300ms
   ├─ Minimum: 2 characters
   ├─ Request: GET /api/income-tracker/search?q=ABC
   │
   └─ Response: {
     results: [
       {id, source, type, amount, date, period},
       ...
     ],
     totalCount: 5
   }
   ↓
5. Search results display:
   ├─ Inline dropdown shows matches:
   │  ├─ ABC Company - Salary - ₦520K - Oct 2025
   │  └─ (other results)
   │
   └─ User clicks result:
      ├─ Filter applied to table
      ├─ Table shows only matching income
      └─ Search input keeps text
   ↓
6. Clear search:
   ├─ User clicks [✕] in search input, OR
   ├─ User backspaces all text
   │
   └─ Table resets to all income
```

#### Success Criteria

✅ Real-time search works  
✅ Search results dropdown appears  
✅ Results accurate  
✅ Click result filters table  
✅ Clear search resets view  

---

### A.4 Analytics Button

**Component:** `AnalyticsButton`  
**Type:** Secondary Icon Button  
**Location:** Page header, right-center  
**Icon:** 📊 (bar chart)  
**Label:** "Analytics"

#### Flow: User Clicks [Analytics]

```
1. User clicks [Analytics]
   ↓
2. Navigate to /income-tracker/analytics
   OR open side panel with analytics
   ↓
3. Analytics dashboard shows:
   ├─ SUMMARY METRICS
   │  ├─ YTD Income: ₦6,240,000
   │  ├─ Monthly Average: ₦520,000
   │  ├─ Total PAYE Paid: ₦936,000
   │  ├─ Number of Income Sources: 4
   │  └─ Largest Single Income: ₦520,000
   │
   ├─ CHARTS
   │  ├─ Income by Source (pie chart)
   │  │  ├─ Salary: 80.8% (₦5.04M)
   │  │  ├─ Freelance: 12.5% (₦780K)
   │  ├─ Rental: 7.2% (₦450K)
   │  │  └─ Other: Income trends over months
   │  │
   │  ├─ Monthly Income Trend (line chart)
   │  │  ├─ January - December
   │  │  ├─ Shows monthly totals
   │  │  └─ Highlights peaks/valleys
   │  │
   │  ├─ Tax Paid Progress (progress bar)
   │  │  ├─ PAYE Paid: ₦936,000
   │  │  ├─ Estimated Annual Tax: ₦1,200,000
   │  │  ├─ % Paid: 78%
   │  │  └─ Remaining Due: ₦264,000
   │  │
   │  └─ Comparison with Previous Year (bars)
   │     ├─ 2025 YTD: ₦6.24M
   │     └─ 2024 Full Year: ₦5.80M
   │
   ├─ TIME PERIOD SELECTOR
   │  ├─ YTD (default)
   │  ├─ Last 12 Months
   │  ├─ This Year
   │  ├─ Last Year
   │  ├─ Custom range [date picker]
   │  └─ [Apply]
   │
   └─ ACTIONS
      ├─ [Export Analytics] - PDF/Excel
      ├─ [Schedule Report] - Email weekly/monthly
      └─ [Share] - Share with accountant
   ↓
4. User can interact:
   ├─ Change time period
   ├─ Export report
   ├─ Schedule auto-send
   └─ Return to income list
```

#### Success Criteria

✅ Analytics page loads quickly  
✅ All charts render  
✅ Time period filter works  
✅ Data accurate  
✅ Export available  

---

### A.5 Export Button

**Component:** `ExportButton`  
**Type:** Secondary Icon Button  
**Location:** Page header, right-center  
**Icon:** 📥 (download)  
**Label:** "Export"

#### Flow: User Clicks [Export]

```
1. User clicks [Export]
   ↓
2. Modal opens: "Export Income Records"
   ├─ EXPORT FORMAT
   │  ○ CSV (default)
   │  ○ Excel (.xlsx)
   │  ○ PDF Report
   │
   ├─ CONTENT SELECTION
   │  ☑ Income List
   │  ☑ Tax Summary
   │  ☑ Monthly Breakdown
   │
   ├─ PERIOD
   │  ○ Current filters (default)
   │  ○ This Year
   │  ○ Last Year
   │  ○ Custom: [date range]
   │
   └─ [Cancel] [Export]
   ↓
3. User selects options and clicks [Export]
   ↓
4. Backend processes:
   ├─ Gather filtered income
   ├─ Build selected reports
   ├─ Format data for output
   ├─ Generate file (CSV/Excel/PDF)
   └─ Return to frontend
   ↓
5. Frontend:
   ├─ Show progress bar
   ├─ On complete: Start file download
   ├─ File name: income-2025-12-30.csv
   ├─ Toast: "✓ File downloaded"
   └─ Close modal
```

#### Success Criteria

✅ Modal appears  
✅ Multiple format options  
✅ Content selection works  
✅ File generates correctly  
✅ Download starts automatically  

---

### A.6 Settings Button

**Component:** `SettingsButton`  
**Type:** Tertiary Icon Button  
**Location:** Page header, far right  
**Icon:** ⚙️ (gear)  
**Label:** "Settings" (on hover)

#### Flow: User Clicks [Settings]

```
1. User clicks [⚙️]
   ↓
2. Navigate to /income-tracker/settings
   ↓
3. Settings page displays:
   ├─ INCOME SOURCES
   │  ├─ List of saved income sources
   │  ├─ Add New Source: [+ New]
   │  ├─ Edit source: [Click source]
   │  └─ Delete source: [Confirm]
   │
   ├─ RECURRING INCOME
   │  ├─ Enable recurring entries: [On/Off toggle]
   │  ├─ Monthly recurring:
   │  │  ├─ ☑ Salary from ABC Co (₦520K, day 31)
   │  │  ├─ ☑ Freelance retainer (₦50K, day 15)
   │  │  └─ [Pause] [Edit] [Delete]
   │  │
   │  └─ [Add Recurring Entry]
   │
   ├─ TAX ASSUMPTIONS
   │  ├─ Annual Income Estimate: [₦6,240,000 ▼]
   │  │  └─ (Used for tax calculations)
   │  ├─ Expected Annual Tax: [₦936,000 ▼]
   │  │  └─ (Based on current year)
   │  ├─ Tax Relief Type: [Standard ▼]
   │  │  ├─ Standard (Individual Relief)
   │  │  ├─ Consolidated Relief
   │  │  └─ Custom (specify amount)
   │  │
   │  └─ [Recalculate]
   │
   ├─ BANK CONNECTION (Optional)
   │  ├─ Auto-tag income from bank: [On/Off toggle]
   │  ├─ Connected Bank: [Wema Bank ▼]
   │  ├─ Last Sync: Dec 30, 2025 2:15 PM
   │  └─ [Disconnect] [Sync Now]
   │
   ├─ PRIVACY & DATA
   │  ├─ Payslip storage: [Keep ▼] (Keep/Delete after entry)
   │  ├─ Export data: [Enable ▼]
   │  └─ Delete all income records: [Caution button]
   │
   └─ [Save Changes] [Cancel] [Restore Defaults]
   ↓
4. User makes changes and clicks [Save Changes]
   ↓
5. PATCH /api/income-tracker/settings
   {
     sources: [...],
     recurringEntries: [...],
     annualIncomeEstimate: 6240000,
     taxRelief: "standard",
     ...
   }
   ↓
6. Toast: "✓ Settings saved"
   └─ Return to income tracker
```

#### Success Criteria

✅ Settings page loads  
✅ Can add/edit sources  
✅ Recurring entries work  
✅ Tax assumptions configurable  
✅ Changes save correctly  

---

## PART A: FILTERS

### A.7 Period Filter

**Component:** `PeriodFilter`  
**Type:** Dropdown with options  
**Location:** Filter bar, left  
**Label:** "Period: [YTD ▼]"

#### Flow: User Clicks Period Filter

```
1. User clicks [Period: YTD ▼]
   ↓
2. Dropdown menu appears:
   ├─ YTD (default)
   ├─ This Year
   ├─ Last Year
   ├─ Last 12 Months
   ├─ Last 3 Months
   ├─ This Month
   ├─ Last Month
   ├─ Custom Range...
   └─ All Time
   ↓
3. User selects (e.g., "Last 3 Months"):
   ├─ Close dropdown
   ├─ Calculate date range
   └─ Trigger filter application
   ↓
4. Table updates with filtered income
   ├─ Row count: "Showing 8 of 12 income entries"
   └─ Display date range in filter label
```

---

### A.8 Source Filter

**Component:** `SourceFilter`  
**Type:** Multi-select Dropdown  
**Location:** Filter bar, center-left  
**Label:** "Source: [All ▼]"

#### Flow: User Clicks Source Filter

```
1. User clicks [Source: All ▼]
   ↓
2. Dropdown with income sources appears:
   ├─ Search box: [Search sources__________]
   ├─ [Select All] [Clear All]
   ├─ ☐ Salary (ABC Company)
   ├─ ☐ Freelance (Client X)
   ├─ ☐ Rental Income
   └─ ☐ Dividends
   ↓
3. User selects sources:
   ├─ Click source checkbox to select
   ├─ Multiple selections allowed
   └─ Selected count shows: "Source: 2 selected ▼"
   ↓
4. Trigger filter application:
   ├─ Table shows only selected sources
   └─ Row count updates
```

---

### A.9 Month Filter

**Component:** `MonthFilter`  
**Type:** Dropdown  
**Location:** Filter bar, center  
**Label:** "Month: [All ▼]"

#### Flow: User Clicks Month Filter

```
1. User clicks [Month: All ▼]
   ↓
2. Dropdown appears with months:
   ├─ All (default)
   ├─ January
   ├─ February
   ├─ ... (all 12 months)
   └─ None (non-monthly income)
   ↓
3. User selects (e.g., "October"):
   ├─ Close dropdown
   └─ Trigger filter application
```

---

### A.10 Apply Filters Button

**Component:** `ApplyFiltersButton`  
**Type:** Primary Button  
**Location:** Filter bar, right  
**Label:** "Apply Filters"

#### Flow: User Clicks [Apply Filters]

```
1. User has selected filter criteria
   ↓
2. User clicks [Apply Filters]
   ↓
3. All filters combined:
   ├─ GET /api/income-tracker/list
     ?period=q4_2025
     &sources=salary,freelance
     &month=all
   │
   └─ Return filtered income: 8 results
   ↓
4. Table updates:
   ├─ Show filtered results
   ├─ Row count: "Showing 8 of 12 income entries"
   └─ Display active filter chips
```

---

## PART A: INCOME TABLE

### A.11 View/Edit Icon

**Component:** `IncomeEditButton`  
**Type:** Icon Button (per row)  
**Location:** Income table, last column  
**Icon:** ✎ (pencil)

#### Flow: User Clicks [✎] on Income Row

```
1. User clicks [✎] on income row
   ↓
2. Income Details Modal opens (editable):
   ├─ INCOME HEADER
   │  ├─ Income Type: [Salary ▼]
   │  ├─ Source: [ABC Company________________]
   │  ├─ Income Date: [Date picker: Oct 31, 2025]
   │  └─ Period: [October ▼]
   │
   ├─ AMOUNTS
   │  ├─ Gross Amount: [₦520,000___________]
   │  ├─ Tax Already Paid (PAYE/WHT): [₦78,000___________]
   │  └─ Net Amount: [₦442,000] (auto-calculated)
   │
   ├─ DESCRIPTION
   │  └─ [October 2025 salary_________________]
   │
   ├─ CLASSIFICATION
   │  ├─ Is Taxable: [Yes/No toggle]
   │  ├─ Recurring: [Yes/No toggle]
   │  │  └─ If Yes: Apply to all future months? [Yes/No]
   │  └─ Relief Applied: [None ▼]
   │
   ├─ ATTACHMENTS
   │  ├─ Payslip: [payslip-oct-2025.pdf] [Delete]
   │  └─ [Upload New]
   │
   └─ ACTIONS
      ├─ [Save Changes]
      ├─ [Delete This Entry]
      └─ [Close]
   ↓
3. User can:
   ├─ Edit any field
   ├─ Update tax amounts
   ├─ Upload new documents
   ├─ Delete entry
   └─ When ready: [Save Changes]
   ↓
4. On save:
   ├─ PATCH /api/income-tracker/income/{id}
      {updates}
   ├─ Response: {success, income}
   ├─ Toast: "✓ Income updated"
   └─ Table refreshes with new data
```

---

### A.12 Pagination

**Component:** `IncomeTablePagination`  
**Type:** Pagination Control  
**Location:** Below income table  

#### Flow: User Clicks Pagination

```
1. Table shows: "Showing 1-10 of 12 income entries"
   └─ [< Previous] [1] [2] [Next >]
   ↓
2. User clicks [2] or [Next >]:
   ├─ GET /api/income-tracker/list
     ?page=2
     &pageSize=10
   │
   └─ Backend returns items 11-12
   ↓
3. Frontend updates:
   ├─ Table rows replaced
   ├─ Pagination shows current page
   └─ Count updates
```

---

## PART A: SIDE CARDS

### A.13 Income by Source Card

**Component:** `IncomeSourceCard`  
**Type:** Card / Widget with pie chart  
**Location:** Right sidebar  

#### Card Layout

```
┌────────────────────────────────┐
│ Income by Source               │
├────────────────────────────────┤
│                                │
│ Salary        ₦5,040,000 (80%) │
│ Freelance     ₦780,000  (12%)  │
│ Rental        ₦450,000  (7%)   │
│                                │
│ [View Breakdown]               │
│                                │
└────────────────────────────────┘
```

#### A.13.1 View Breakdown Button

**Component:** `ViewBreakdownButton`  
**Type:** Secondary Button  
**Location:** Income Source Card  
**Label:** "View Breakdown"

#### Flow: User Clicks [View Breakdown]

```
1. User clicks [View Breakdown]
   ↓
2. Navigate to detailed income breakdown:
   ├─ Full table by source with:
   │  ├─ Source Name
   │  ├─ Number of Entries
   │  ├─ Total Amount
   │  ├─ YTD Total
   │  └─ [View Details]
   │
   ├─ Charts:
   │  ├─ Pie chart (% breakdown)
   │  ├─ Bar chart (amounts)
   │  └─ Trend line (over time)
   │
   └─ Can filter/sort by amount, frequency, etc.
```

---

### A.14 YTD Comparison Card

**Component:** `YTDComparisonCard`  
**Type:** Card / Widget  
**Location:** Right sidebar, below Income by Source  

#### Card Layout

```
┌────────────────────────────────┐
│ YTD Comparison                 │
├────────────────────────────────┤
│                                │
│ 2025: ₦6,240,000               │
│ 2024: ₦5,800,000               │
│ Growth: +7.6%                  │
│                                │
│ Months Tracked: 10/12          │
│ Monthly Avg: ₦520,000          │
│                                │
│ [View Year-over-Year]          │
│                                │
└────────────────────────────────┘
```

---

---

# PART B: EXPENSES & DEDUCTIBLES PAGE

---

## PART B: PAGE OVERVIEW

### Purpose

The **Expenses & Deductibles Page** is where individuals track and categorize expenses, marking which are tax-deductible and which are personal. This feeds into the tax calculation.

### Key Features

- Add expenses from multiple sources (health, pension, rent, donations, etc.)
- Manual entry, receipt upload (OCR), CSV import
- Smart categorization with deductible classification
- Filter by category, date, deductibility status
- Receipt gallery and document management
- Deductible amount tracking

### Page Layout

```
┌────────────────────────────────────────────────────────────────┐
│ [Logo] TaxGee    [Search]  [🔔 Notify]  [Gee-AI]  [👤 Profile] │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ ┌──── Expenses & Deductibles Header ──────────────────────────┐ │
│ │ Expenses & Deductibles                                     │ │
│ │ Track expenses and tax deductions                          │ │
│ │                                                            │ │
│ │ [+ Add Expense ▼] [Upload Receipt] [🔍 Search]           │ │
│ │ [Analytics] [Export] [⚙️ Settings]                        │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                │
│ ┌──── Summary Stats ──────────────────────────────────────────┐ │
│ │ Total Expenses: ₦1,850,000  │  Deductible: ₦1,450,000    │ │
│ │ Personal (non-deductible): ₦400,000                       │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                │
│ ┌──── Filter Bar ──────────────────────────────────────────────┐ │
│ │ Category: [All ▼]  Deductible: [All ▼]  Period: [YTD ▼]  │ │
│ │ [Apply Filters] [Clear]                                     │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                │
│ ┌──── Expense Table ──────────────────────────────────────────┐ │
│ │ Date | Category | Description | Amount | Deductible | ✎    │ │
│ │ 12/25 | Health | Annual check-up | ₦50K | ✓ Yes | ✎       │ │
│ │ 12/20 | Pension | Contrib Dec 2025 | ₦100K | ✓ Yes | ✎    │ │
│ │ 12/15 | Donations | Charity | ₦25K | ✓ Yes | ✎            │ │
│ │ 12/10 | Personal | Vacation | ₦400K | ✕ No | ✎            │ │
│ │ ...                                                         │ │
│ │ [Pagination]                                               │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                │
│ ┌────────────────────────┐  ┌──────────────────┐             │
│ │ Deductibles by Category│  │ Receipt Status   │             │
│ │ Health: ₦250K          │  │ With proof: 28   │             │
│ │ Pension: ₦800K         │  │ Pending proof: 5 │             │
│ │ Donations: ₦150K       │  │ [Upload Missing] │             │
│ │ Other: ₦250K           │  │                  │             │
│ └────────────────────────┘  └──────────────────┘             │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## PART B: HEADER BUTTONS

### B.1 Add Expense Button (Dropdown)

**Component:** `AddExpenseButton`  
**Type:** Primary Button with Dropdown  
**Location:** Page header, left side  
**Icon:** + (plus)  
**Label:** "+ Add Expense ▼"

#### Flow: User Clicks [+ Add Expense ▼]

```
1. User clicks [+ Add Expense ▼]
   ↓
2. Dropdown menu appears with options:
   ├─ ✍️ Manual Entry
   ├─ 📄 Upload Receipt
   └─ 📋 CSV Import
   ↓
3A. USER SELECTS: Manual Entry
   ├─ Modal: "Add Expense"
   │
   ├─ Form displays:
   │  ├─ EXPENSE HEADER
   │  │  ├─ Category: [Select ▼]
   │  │  │  ├─ Health Insurance/Medical
   │  │  │  ├─ Pension Contribution
   │  │  │  ├─ Life Assurance
   │  │  │  ├─ Charitable Donations
   │  │  │  ├─ Business Expenses
   │  │  │  ├─ Education/Training
   │  │  │  ├─ Rent/Housing
   │  │  │  └─ Other
   │  │  │
   │  │  ├─ Description: [________________]
   │  │  ├─ Expense Date: [Date picker]
   │  │  └─ Amount: [₦__________]
   │  │
   │  ├─ DEDUCTIBLE STATUS
   │  │  ├─ Is this tax-deductible? [Yes/No]
   │  │  │  └─ Auto-set based on category
   │  │  │
   │  │  └─ Evidence/Proof: [None ▼]
   │  │     ├─ Receipt/Invoice
   │  │     ├─ Bank Statement
   │  │     ├─ Certificate/Confirmation
   │  │     └─ Other
   │  │
   │  └─ [Save] [Save & New] [Cancel]
   │
   └─ On submit:
      ├─ POST /api/expenses/expense
         {
           category: "health",
           description: "Annual medical check-up",
           amount: 50000,
           expenseDate: "2025-12-25",
           isDeductible: true,
           evidenceType: "receipt"
         }
      ├─ Response: {expenseId, status: "recorded"}
      ├─ Toast: "✓ Expense added"
      └─ New expense appears in table

   ↓
3B. USER SELECTS: Upload Receipt
   ├─ Modal: "Upload Receipt"
   │
   ├─ STEP 1: FILE UPLOAD
   │  ├─ Drop zone: "Drag receipt PDF/image here"
   │  ├─ Accepted: PDF, JPG, PNG
   │  └─ [Next]
   │
   ├─ STEP 2: OCR EXTRACTION & REVIEW
   │  ├─ Extracts:
   │  │  ├─ Vendor/payee name
   │  │  ├─ Amount
   │  │  ├─ Date
   │  │  └─ Category (guessed)
   │  │
   │  ├─ Display editable form
   │  └─ [Next]
   │
   ├─ STEP 3: CLASSIFICATION
   │  ├─ Confirm category
   │  ├─ Is deductible: [Yes/No]
   │  └─ [Save Expense]
   │
   └─ On submit:
      ├─ Expense created with OCR data
      ├─ Receipt stored in document manager
      └─ Toast: "✓ Expense from receipt added"

   ↓
3C. USER SELECTS: CSV Import
   ├─ Same 3-step wizard as income CSV import
   └─ Creates multiple expense records
```

---

### B.2 Upload Receipt Button

**Component:** `UploadReceiptButton`  
**Type:** Secondary Button  
**Location:** Page header, left-center  
**Icon:** 📄 (document)  
**Label:** "Upload Receipt"

#### Flow: User Clicks [Upload Receipt]

```
1. User clicks [Upload Receipt]
   ↓
2. Same as "Add Expense" → "Upload Receipt" path above
```

---

### B.3 Search Button

**Component:** `ExpenseSearchInput`  
**Type:** Text Input with Search Icon  
**Location:** Page header, center  
**Icon:** 🔍 (magnifying glass)  
**Placeholder:** "Search expenses..."

#### Flow: User Types in Search

```
1. User types search query (e.g., "Health" or "Pension")
   ↓
2. Real-time search filters expenses:
   ├─ Searches across category, description, amount
   └─ Results show in table
```

---

### B.4 Analytics Button

**Component:** `AnalyticsButton`  
**Type:** Secondary Icon Button  
**Location:** Page header, right-center  
**Icon:** 📊 (bar chart)  
**Label:** "Analytics"

#### Flow: User Clicks [Analytics]

```
1. User clicks [Analytics]
   ↓
2. Analytics dashboard shows:
   ├─ SUMMARY
   │  ├─ Total Expenses: ₦1,850,000
   │  ├─ Deductible: ₦1,450,000 (78%)
   │  ├─ Non-Deductible: ₦400,000 (22%)
   │  └─ Average Expense: ₦18,500
   │
   ├─ CHARTS
   │  ├─ Pie chart: Deductible vs Non-deductible
   │  ├─ Bar chart: Expenses by category
   │  └─ Line chart: Expenses over time
   │
   └─ ACTIONS
      ├─ [Export Analytics]
      └─ [Schedule Report]
```

---

### B.5 Export Button

**Component:** `ExportButton`  
**Type:** Secondary Icon Button  
**Location:** Page header, right-center  
**Icon:** 📥 (download)  
**Label:** "Export"

#### Flow: User Clicks [Export]

```
1. User clicks [Export]
   ↓
2. Modal: "Export Expenses"
   ├─ Format: CSV / Excel / PDF
   ├─ Content: List / Summary / Category Breakdown
   ├─ Period: Current filters / Custom
   └─ [Cancel] [Export]
   ↓
3. File generated and downloaded
```

---

### B.6 Settings Button

**Component:** `SettingsButton`  
**Type:** Tertiary Icon Button  
**Location:** Page header, far right  
**Icon:** ⚙️ (gear)  
**Label:** "Settings"

#### Flow: User Clicks [Settings]

```
1. User clicks [⚙️]
   ↓
2. Navigate to /expenses/settings
   ↓
3. Settings page displays:
   ├─ CATEGORY MANAGEMENT
   │  ├─ List of expense categories
   │  ├─ For each: Default deductible status
   │  ├─ [Add Category] [Edit] [Delete]
   │  └─ Reset to defaults
   │
   ├─ DEDUCTIBLE STATUS DEFAULTS
   │  ├─ Health Insurance: [Always Deductible toggle]
   │  ├─ Pension: [Always Deductible toggle]
   │  ├─ Donations: [Always Deductible toggle]
   │  └─ Personal Expenses: [Never Deductible toggle]
   │
   ├─ RECEIPT MANAGEMENT
   │  ├─ Auto-tag receipts: [On/Off]
   │  ├─ Receipt storage: [Keep ▼]
   │  └─ Require receipt for deductible: [On/Off]
   │
   └─ [Save Changes] [Cancel]
```

---

## PART B: FILTERS

### B.7 Category Filter

**Component:** `CategoryFilter`  
**Type:** Multi-select Dropdown  
**Location:** Filter bar, left  
**Label:** "Category: [All ▼]"

#### Flow: User Clicks Category Filter

```
1. User clicks [Category: All ▼]
   ↓
2. Dropdown lists categories with checkboxes:
   ├─ Health Insurance/Medical
   ├─ Pension Contribution
   ├─ Life Assurance
   ├─ Charitable Donations
   ├─ Business Expenses
   └─ ... (others)
   ↓
3. User selects categories:
   ├─ Multiple selections allowed
   └─ Selected count shows: "Category: 2 selected ▼"
   ↓
4. Filter applied to table
```

---

### B.8 Deductible Filter

**Component:** `DeductibleFilter`  
**Type:** Dropdown  
**Location:** Filter bar, center  
**Label:** "Deductible: [All ▼]"

#### Flow: User Clicks Deductible Filter

```
1. User clicks [Deductible: All ▼]
   ↓
2. Dropdown appears with options:
   ├─ All (default)
   ├─ Deductible Only
   ├─ Non-Deductible Only
   └─ Uncategorized
   ↓
3. User selects:
   ├─ Filter label updates
   └─ Table updates with filtered results
```

---

### B.9 Period Filter

**Component:** `PeriodFilter`  
**Type:** Dropdown  
**Location:** Filter bar, right  
**Label:** "Period: [YTD ▼]"

#### Flow: User Clicks Period Filter

```
1. User clicks [Period: YTD ▼]
   ↓
2. Dropdown appears with options:
   ├─ YTD (default)
   ├─ This Year
   ├─ Last Year
   ├─ Last 12 Months
   ├─ This Month
   ├─ Custom Range...
   └─ All Time
   ↓
3. User selects and filter applies
```

---

### B.10 Apply & Clear Filters

**Component:** `ApplyFiltersButton`, `ClearFiltersButton`  
**Type:** Primary / Link Button  
**Location:** Filter bar, right  
**Labels:** "Apply Filters" / "Clear"

---

## PART B: EXPENSE TABLE

### B.11 View/Edit Icon

**Component:** `ExpenseEditButton`  
**Type:** Icon Button (per row)  
**Location:** Expense table, last column  
**Icon:** ✎ (pencil)

#### Flow: User Clicks [✎]

```
1. User clicks [✎] on expense row
   ↓
2. Expense Details Modal opens (editable):
   ├─ Category, Description, Amount fields
   ├─ Deductible toggle
   ├─ Receipt/Evidence section
   ├─ [Save Changes]
   ├─ [Delete]
   └─ [Close]
```

---

### B.12 Pagination

**Component:** `ExpenseTablePagination`  
**Type:** Pagination Control  
**Location:** Below expense table  

```
Shows: "Showing 1-10 of 45 expenses"
[< Previous] [1] [2] [3] [4] [5] [Next >]
```

---

## PART B: CATEGORY BREAKDOWN CARDS

### B.13 Deductibles by Category Card

**Component:** `DeductiblesByCategoryCard`  
**Type:** Card / Widget with breakdown  
**Location:** Right sidebar  

#### Card Layout

```
┌────────────────────────────────┐
│ Deductibles by Category        │
├────────────────────────────────┤
│                                │
│ Health:     ₦250,000           │
│ Pension:    ₦800,000           │
│ Donations:  ₦150,000           │
│ Education:  ₦250,000           │
│                                │
│ Total: ₦1,450,000              │
│                                │
│ [View Details]                 │
│                                │
└────────────────────────────────┘
```

---

### B.14 Receipt Status Card

**Component:** `ReceiptStatusCard`  
**Type:** Card / Widget  
**Location:** Right sidebar, below Deductibles  

#### Card Layout

```
┌────────────────────────────────┐
│ Receipt Status                 │
├────────────────────────────────┤
│                                │
│ With Proof:        28 ✓        │
│ Pending Proof:     5 ⚠️        │
│ No Receipt Needed: 12          │
│                                │
│ [Upload Missing Proofs]        │
│                                │
└────────────────────────────────┘
```

#### A.14.1 Upload Missing Proofs Button

**Component:** `UploadMissingProofsButton`  
**Type:** Secondary Button  
**Location:** Receipt Status Card  
**Label:** "Upload Missing Proofs"

#### Flow: User Clicks [Upload Missing Proofs]

```
1. User clicks [Upload Missing Proofs]
   ↓
2. Navigate to /expenses/missing-receipts
   ↓
3. Page shows list of 5 expenses without proof:
   ├─ Table with expenses
   ├─ For each: [Upload Receipt] button
   ├─ Or [Mark as Non-Deductible]
   └─ Or [Request from Vendor]
   ↓
4. User uploads receipt for each:
   ├─ File upload dialog
   ├─ OCR processes receipt
   ├─ Expense marked "Proof Attached"
   └─ Status updates in table
```

---

---

# PART C: TAX POSITION PAGE

---

## PART C: PAGE OVERVIEW

### Purpose

The **Tax Position Page** is the personal income tax dashboard where individuals see their complete tax picture for the year: income, deductions, tax liability, and tax already paid.

### Key Features

- Real-time tax calculation
- Income vs. deductions summary
- Estimated annual tax liability
- Tax already paid (PAYE/WHT) tracking
- Projected refund/balance due
- Quick action to start return filing

### Page Layout

```
┌────────────────────────────────────────────────────────────────┐
│ [Logo] TaxGee    [Search]  [🔔 Notify]  [Gee-AI]  [👤 Profile] │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ ┌──── Tax Position Header ────────────────────────────────────┐ │
│ │ Tax Position - 2025                                        │ │
│ │ Your estimated tax liability and refund/balance due       │ │
│ │                                                            │ │
│ │ [Generate Full Return] [Export Summary] [⚙️ Settings]   │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                │
│ ┌──── Key Numbers ────────────────────────────────────────────┐ │
│ │                                                            │ │
│ │ Gross Income (YTD)           ₦6,240,000                 │ │
│ │ Less: Allowable Deductions  -₦1,450,000                 │ │
│ │ ─────────────────────────────────────────────────────   │ │
│ │ Taxable Income               ₦4,790,000                 │ │
│ │                                                            │ │
│ │ Estimated Annual Tax (18%)   ₦862,200                   │ │
│ │ Less: Tax Paid (PAYE/WHT)   -₦936,000                  │ │
│ │ ─────────────────────────────────────────────────────   │ │
│ │ PROJECTED STATUS: ✓ REFUND  ₦73,800                    │ │
│ │                                                            │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                │
│ ┌──── Detailed Breakdown ─────────────────────────────────────┐ │
│ │                                                            │ │
│ │ INCOME SUMMARY                                           │ │
│ │ ├─ Salary from Employment:     ₦5,040,000              │ │
│ │ ├─ Freelance/Self-Employment:  ₦780,000                │ │
│ │ ├─ Rental Income:               ₦450,000                │ │
│ │ └─ Dividend/Interest Income:    ₦-                      │ │
│ │                                                            │ │
│ │ DEDUCTIONS & RELIEFS                                     │ │
│ │ ├─ Health Insurance/Medical:   ₦250,000                │ │
│ │ ├─ Pension Contributions:       ₦800,000                │ │
│ │ ├─ Life Assurance:              ₦200,000                │ │
│ │ ├─ Charitable Donations:        ₦150,000                │ │
│ │ ├─ Personal Relief:             ₦450,000                │ │
│ │ └─ Other Reliefs:               ₦-                      │ │
│ │                                                            │ │
│ │ TAX CALCULATION                                           │ │
│ │ ├─ Standard Rate (18%):         ₦862,200                │ │
│ │ ├─ Surtax (if applicable):      ₦0                      │ │
│ │ └─ Total Tax Due:               ₦862,200                │ │
│ │                                                            │ │
│ │ TAX PAID SO FAR                                           │ │
│ │ ├─ PAYE from Salary:            ₦756,000                │ │
│ │ ├─ WHT on Freelance:            ₦39,000                 │ │
│ │ ├─ WHT on Interest/Dividends:   ₦141,000                │ │
│ │ └─ Other Tax Payments:          ₦0                      │ │
│ │                                                            │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                │
│ ┌──── Visual Summary (Charts) ────────────────────────────────┐ │
│ │                                                            │ │
│ │ [Pie: Income Sources] [Pie: Deductions]                 │ │
│ │ [Bar: Tax vs Income]  [Gauge: Tax Progress]             │ │
│ │                                                            │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                │
│ ┌──── Action Buttons ─────────────────────────────────────────┐ │
│ │                                                            │ │
│ │ [Generate Full Return] [Review Deductions] [Adjust]     │ │
│ │ [View Assumptions] [Add More Income] [Add Deductions]   │ │
│ │                                                            │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                │
│ ┌──── Next Steps ─────────────────────────────────────────────┐ │
│ │ Filing Deadline: 31 March 2026 (134 days remaining)       │ │
│ │                                                            │ │
│ │ Next Step: [File Your Return] ✓                          │ │
│ │                                                            │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## PART C: SUMMARY CARDS

### C.1 Gross Income Card

**Component:** `GrossIncomeCard`  
**Type:** Large stat card  
**Location:** Key Numbers section  

```
Gross Income (YTD)
₦6,240,000

Shows breakdown of income sources
Last updated: Dec 30, 2025
[View Detail]
```

---

### C.2 Taxable Income Card

**Component:** `TaxableIncomeCard`  
**Type:** Large stat card  
**Location:** Key Numbers section  

```
Taxable Income (after deductions)
₦4,790,000

Income: ₦6,240,000
Deductions: -₦1,450,000
Net: ₦4,790,000

[View Calculation]
```

---

### C.3 Tax Liability Card

**Component:** `TaxLiabilityCard`  
**Type:** Large stat card  
**Location:** Key Numbers section  

```
Estimated Annual Tax (18%)
₦862,200

Projections based on current YTD figures
[Adjust Rate] [View Breakdown]
```

---

### C.4 Tax Status Card (Refund/Balance)

**Component:** `TaxStatusCard`  
**Type:** Large stat card with color  
**Location:** Key Numbers section  

```
✓ PROJECTED REFUND

Tax Due: ₦862,200
Tax Paid: ₦936,000
─────────────────
Refund: ₦73,800

Color: Green (good news)
[Claim Refund Procedure]
```

---

## PART C: CALCULATIONS

### Detailed Breakdown Sections

These are expandable/collapsible sections showing all calculations:

1. **INCOME SUMMARY** - List all income sources
2. **DEDUCTIONS & RELIEFS** - Itemized deductions
3. **TAX CALCULATION** - Step-by-step tax math
4. **TAX PAID SO FAR** - All PAYE/WHT entries
5. **VISUAL SUMMARY** - Charts & gauges

---

## PART C: ACTION BUTTONS

### C.5 Generate Full Return Button

**Component:** `GenerateFullReturnButton`  
**Type:** Primary Button  
**Location:** Page header or Action Buttons section  
**Label:** "Generate Full Return"

#### Flow: User Clicks [Generate Full Return]

```
1. User clicks [Generate Full Return]
   ↓
2. Navigate to return generation wizard:
   └─ /personal-tax/filing/new
   ↓
3. Return wizard starts (similar to company filing but simplified)
   ├─ Review all data
   ├─ Confirm deductions
   ├─ Confirm tax position
   ├─ Upload supporting docs
   ├─ Generate return document
   └─ Option to file to FIRS or save as PDF
```

---

### C.6 Review Deductions Button

**Component:** `ReviewDeductionsButton`  
**Type:** Secondary Button  
**Location:** Action Buttons section  
**Label:** "Review Deductions"

#### Flow: User Clicks [Review Deductions]

```
1. User clicks [Review Deductions]
   ↓
2. Navigate to detailed deductions page:
   ├─ List all deducted expenses
   ├─ Show proof status
   ├─ Allow editing/corrections
   ├─ Recalculate tax on changes
   └─ Save updated deductions
```

---

### C.7 Adjust Button

**Component:** `AdjustButton`  
**Type:** Secondary Button  
**Location:** Action Buttons section  
**Label:** "Adjust"

#### Flow: User Clicks [Adjust]

```
1. User clicks [Adjust]
   ↓
2. Modal opens: "Adjust Tax Position"
   ├─ Change annual income estimate
   ├─ Change tax relief type
   ├─ Adjust deduction amounts
   ├─ Add/remove income sources
   ├─ Recalculate button
   └─ [Save Adjustments] [Cancel]
   ↓
3. Tax position recalculates with new assumptions
```

---

### C.8 View Assumptions Button

**Component:** `ViewAssumptionsButton`  
**Type:** Link Button  
**Location:** Action Buttons section  
**Label:** "View Assumptions"

#### Flow: User Clicks [View Assumptions]

```
1. User clicks [View Assumptions]
   ↓
2. Modal shows:
   ├─ Tax year: 2025
   ├─ Tax rate: 18%
   ├─ Tax relief type: Standard Individual Relief
   ├─ Filing status: Not yet filed
   ├─ Last updated: Dec 30, 2025
   └─ [Edit Assumptions] [Close]
```

---

### C.9 File Your Return Button

**Component:** `FileYourReturnButton`  
**Type:** Primary Button (big, green)  
**Location:** Next Steps section  
**Label:** "File Your Return ✓"

#### Flow: User Clicks [File Your Return]

```
1. User clicks [File Your Return ✓]
   ↓
2. Navigate to filing wizard
   └─ /personal-tax/filing/new
   ↓
3. Complete return filing process (covered in Part D)
```

---

---

# PART D: FILING & RETURNS

---

## PART D: PAGE OVERVIEW

### Purpose

The **Personal Tax Return Page** is where individuals prepare, review, and file their annual income tax return with the tax authority (FIRS).

### Key Features

- Guided return preparation wizard
- Auto-populated data from income/expenses
- Manual review and adjustment
- Upload supporting documents
- Submit to FIRS
- Track filing status and receive acknowledgement

---

## PART D: RETURN WIZARD

### Return Filing Flow (3 Steps)

#### STEP 1: Review Income & Deductions

```
1. Modal/Page: "Prepare Your Tax Return - Step 1"
   ├─ REVIEW INCOME
   │  ├─ Total Income (YTD): ₦6,240,000
   │  ├─ Breakdown by source (editable)
   │  ├─ Tax already paid: ₦936,000
   │  └─ [Edit Income Data]
   │
   ├─ REVIEW DEDUCTIONS
   │  ├─ Total Deductible Expenses: ₦1,450,000
   │  ├─ Breakdown by category (editable)
   │  └─ [Edit Deductions]
   │
   ├─ ADJUST IF NEEDED
   │  ├─ [Add Missing Income]
   │  ├─ [Add Missing Deductions]
   │  └─ [Remove Non-Deductible Items]
   │
   └─ [Previous] [Next] [Cancel]
```

#### STEP 2: Confirm Tax Calculation & Upload Documents

```
2. Modal/Page: "Prepare Your Tax Return - Step 2"
   ├─ TAX CALCULATION SUMMARY
   │  ├─ Gross Income: ₦6,240,000
   │  ├─ Deductions: -₦1,450,000
   │  ├─ Taxable Income: ₦4,790,000
   │  ├─ Tax at 18%: ₦862,200
   │  ├─ Less Tax Paid: -₦936,000
   │  └─ Balance/Refund: ₦73,800 (REFUND)
   │
   ├─ SUPPORTING DOCUMENTS
   │  ├─ ✓ Payslips (3 files)
   │  ├─ ✓ Medical Receipts (2 files)
   │  ├─ ✓ Pension Certificate (1 file)
   │  ├─ ✓ Donation Receipts (1 file)
   │  └─ [Add More Documents]
   │
   ├─ PERSONAL DECLARATION
   │  ├─ ☐ I declare that all information is true and correct
   │  ├─ ☐ I have attached all required supporting documents
   │  └─ ☐ I authorize this app to submit to FIRS
   │
   └─ [Previous] [Next] [Cancel]
```

#### STEP 3: Final Review & File

```
3. Modal/Page: "Prepare Your Tax Return - Step 3"
   ├─ RETURN SUMMARY
   │  ├─ Income: ₦6,240,000
   │  ├─ Deductions: ₦1,450,000
   │  ├─ Taxable Income: ₦4,790,000
   │  ├─ Tax Payable: ₦862,200
   │  ├─ Tax Already Paid: ₦936,000
   │  └─ Status: ✓ REFUND ₦73,800
   │
   ├─ FILING CONFIRMATION CHECKLIST
   │  ├─ ☐ Personal information correct
   │  ├─ ☐ All income sources included
   │  ├─ ☐ All deductions included
   │  ├─ ☐ All documents attached
   │  └─ ☐ Ready to submit to FIRS
   │
   ├─ SUBMISSION METHOD
   │  ├─ ○ Submit to FIRS Online
   │  ├─ ○ Save as PDF (file manually)
   │  └─ ○ Save as Draft (file later)
   │
   └─ [Previous] [Submit] [Save as Draft] [Cancel]
```

---

### Filing Submission & Status

```
After user clicks [Submit]:
│
├─ Backend validates all data
├─ Generates return document
├─ Submits to FIRS (if selected)
├─ Receives acknowledgement/ref #
├─ Updates return status to "Filed"
├─ Sends confirmation email to user
│
└─ Success Page:
   ├─ ✓ Return Filed Successfully!
   ├─ Reference Number: TXN-2025-12345
   ├─ Filing Date: Dec 30, 2025 3:15 PM
   ├─ Next: Claim refund OR file amended return
   ├─ [View Return] [Download PDF]
   ├─ [Print] [Share with Accountant]
   └─ [Back to Tax Position]
```

---

## PART D: FILING STATUS & HISTORY

### Return History Page

```
/personal-tax/filing/history

Shows:
├─ All filed returns (this year & previous)
├─ Status of each (filed, acknowledged, refund processed, etc.)
├─ Download PDFs
├─ View acknowledgement letters
├─ Amend previous returns if needed
└─ Timeline of key events (filing, payment, refund)
```

---

---

# PART E: INTEGRATION

---

## PART E: DATA FLOW

### Complete User Journey: Annual Tax Filing

```
START: User begins tracking income
│
├─ Jan-Nov: User adds income entries
│  ├─ Monthly salary entries (auto-recurring)
│  ├─ Occasional freelance income
│  ├─ Quarterly dividend payments
│  └─ System tracks PAYE/WHT deducted
│
├─ Jan-Dec: User adds expense entries
│  ├─ Health insurance payments
│  ├─ Pension contributions
│  ├─ Charitable donations
│  ├─ Educational expenses
│  └─ System marks as deductible/non-deductible
│
├─ View Tax Position Page (anytime):
│  ├─ System calculates: Gross - Deductions = Taxable
│  ├─ System calculates: Taxable × 18% = Tax Due
│  ├─ System compares: Tax Due vs Tax Already Paid
│  ├─ Shows: Refund or Balance Due
│  └─ User can adjust assumptions & recalculate
│
├─ Dec 30: User clicks [Generate Full Return]
│  ├─ Navigate to filing wizard
│  └─ Start Step 1: Review Income & Deductions
│
├─ STEP 1: Review & Adjust
│  ├─ All income populated from income entries
│  ├─ All deductions populated from expense entries
│  ├─ User can add/remove/adjust items
│  ├─ User can upload missing documents
│  └─ User clicks [Next]
│
├─ STEP 2: Confirm Calculation & Upload Docs
│  ├─ Final tax calculation displayed
│  ├─ All documents listed
│  ├─ User accepts declaration
│  └─ User clicks [Next]
│
├─ STEP 3: Final Review & File
│  ├─ Complete summary of return
│  ├─ Final confirmation checklist
│  ├─ User selects submission method
│  └─ User clicks [Submit]
│
├─ BACKEND PROCESSING
│  ├─ Validate all data
│  ├─ Generate return PDF
│  ├─ Submit to FIRS (if selected)
│  ├─ Receive acknowledgement/ref
│  ├─ Update return status
│  ├─ Send confirmation email
│  └─ Return to success page
│
└─ END: Return Filed Successfully
   ├─ Reference number received
   ├─ Can track refund status
   ├─ Can amend if needed
   └─ Ready for next tax year

```

---

## PART E: PAGE INTERCONNECTIONS

### Navigation Between Pages

```
INCOME TRACKER
    ├─→ Tax Position Page
    │   ├─ Income data auto-populates
    │   ├─ Tax calculation updates in real-time
    │   └─ Can adjust income assumptions
    │
    ├─→ Expenses Page (sidebar)
    │   └─ Add deductible expenses
    │
    └─→ Filing Page (when ready)
        ├─ [Generate Full Return] button
        └─ All income auto-populated

EXPENSES & DEDUCTIBLES
    ├─→ Tax Position Page
    │   ├─ Deduction data auto-populates
    │   ├─ Tax calculation updates in real-time
    │   └─ Deductible amounts shown
    │
    ├─→ Income Tracker (sidebar)
    │   └─ View/add income sources
    │
    └─→ Filing Page (when ready)
        ├─ [Generate Full Return] button
        └─ All deductions auto-populated

TAX POSITION PAGE
    ├─→ Income Tracker (sidebar)
    │   └─ View/adjust income entries
    │
    ├─→ Expenses & Deductibles (sidebar)
    │   └─ View/adjust deductible expenses
    │
    └─→ Filing Page
        ├─ [Generate Full Return] button
        ├─ [Review Deductions] button
        ├─ [Adjust] button
        └─ [File Your Return ✓] button

FILING & RETURNS PAGE
    ├─→ Tax Position Page
    │   └─ [Back] button to review before filing
    │
    ├─→ Income Tracker
    │   └─ Edit income if needed during wizard
    │
    ├─→ Expenses Page
    │   └─ Edit deductions if needed during wizard
    │
    └─→ History / Dashboard
        └─ View filed returns and status
```

---

## PART E: STATE MANAGEMENT

### Redux Store Structure

```
store/
├─ personal-income/
│  ├─ slice.ts (reducers)
│  ├─ selectors.ts (memoized)
│  └─ thunks.ts (async actions)
│     ├─ fetchIncome()
│     ├─ addIncome()
│     ├─ importIncome()
│     ├─ uploadPayslip()
│     └─ deleteIncome()
│
├─ personal-expenses/
│  ├─ slice.ts (reducers)
│  ├─ selectors.ts (memoized)
│  └─ thunks.ts (async actions)
│     ├─ fetchExpenses()
│     ├─ addExpense()
│     ├─ uploadReceipt()
│     ├─ importExpenses()
│     └─ deleteExpense()
│
├─ tax-position/
│  ├─ slice.ts (reducers)
│  ├─ selectors.ts (memoized)
│  └─ thunks.ts (async actions)
│     ├─ calculateTaxPosition()
│     ├─ adjustAssumptions()
│     └─ recalculate()
│
├─ personal-filing/
│  ├─ slice.ts (reducers)
│  ├─ selectors.ts (memoized)
│  └─ thunks.ts (async actions)
│     ├─ startReturn()
│     ├─ updateReturn()
│     ├─ submitReturn()
│     └─ fetchFilingHistory()
│
└─ shared/
   ├─ calculations/
   │  ├─ selectors.ts (tax math)
   │  └─ utilities.ts (formulas)
   └─ notifications/
      └─ slice.ts
```

### Income State

```typescript
interface PersonalIncomeState {
  // UI State
  activeTab: 'list' | 'analytics' | 'summary';
  modalOpen: 'none' | 'add' | 'edit' | 'import' | 'upload';
  
  // Filter & Search State
  filters: {
    period: 'ytd' | 'thisYear' | 'lastYear' | 'custom';
    dateRange?: {start: Date, end: Date};
    sources: string[];
    month?: string;
  };
  searchQuery: string;
  
  // Data State
  incomeEntries: IncomeEntry[];
  sources: IncomeSource[];
  
  // Pagination
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
  
  // Calculations
  summary: {
    ytdTotal: number;
    monthlyAverage: number;
    totalTaxPaid: number;
    bySource: {source: string, amount: number}[];
  };
  
  // Loading & Error
  loading: boolean;
  error: string | null;
  importProgress: number;
}

interface IncomeEntry {
  id: string;
  type: 'salary' | 'freelance' | 'rental' | 'dividend' | 'interest' | 'other';
  source: string;
  description: string;
  grossAmount: number;
  taxPaid: number;
  netAmount: number;
  incomeDate: Date;
  isRecurring?: boolean;
  month?: string;
  isTaxable: boolean;
  year: number;
  documentUrl?: string;
  createdAt: Date;
}
```

### Tax Position State

```typescript
interface TaxPositionState {
  // Calculation Results
  calculations: {
    // Input
    grossIncome: number;
    allowableDeductions: number;
    
    // Derived
    taxableIncome: number;
    taxRate: number; // 18% for Nigeria
    estimatedTax: number;
    
    // Tax Paid
    payeTaxPaid: number;
    whtTaxPaid: number;
    otherTaxPaid: number;
    totalTaxPaid: number;
    
    // Result
    balance: number; // positive = refund, negative = balance due
    status: 'refund' | 'balance_due' | 'neutral';
  };
  
  // Assumptions (editable)
  assumptions: {
    annualIncomeEstimate: number;
    taxRelief: 'standard' | 'consolidated' | 'custom';
    reliefAmount?: number;
    taxRate: number;
  };
  
  // Breakdown Details
  incomeBreakdown: {source: string, amount: number}[];
  deductionsBreakdown: {category: string, amount: number}[];
  
  // Meta
  lastCalculated: Date;
  lastUpdated: Date;
  
  // UI
  loading: boolean;
  error: string | null;
}
```

---

## PART E: API ENDPOINTS

### Income Tracker Endpoints

```
POST /api/personal-income/income
  Purpose: Add income entry
  Request: {type, source, description, grossAmount, taxPaid, ...}
  Response: {incomeId, status}

GET /api/personal-income/list
  Purpose: List income entries
  Query: ?period=...&sources=...&month=...&page=1
  Response: {entries[], total, pagination}

GET /api/personal-income/{id}
  Purpose: Get income details
  Response: {id, type, source, amount, taxPaid, ...}

PATCH /api/personal-income/{id}
  Purpose: Update income
  Request: {updates}
  Response: {success, income}

DELETE /api/personal-income/{id}
  Purpose: Delete income
  Response: {success}

POST /api/personal-income/upload-payslip
  Purpose: Upload payslip for OCR
  Request: FormData with file
  Response: {incomeId, ocrData, confidence}

POST /api/personal-income/import
  Purpose: Bulk import income
  Request: {rows[], mapping}
  Response: {created, updated, skipped, errors}

GET /api/personal-income/analytics
  Purpose: Get income analytics
  Query: ?period=...
  Response: {summary, bySource, trend, ...}

POST /api/personal-income/export
  Purpose: Export income records
  Request: {format, period, content}
  Response: File stream

GET /api/personal-income/summary
  Purpose: Get YTD summary
  Response: {ytdTotal, monthlyAverage, taxPaid, bySource[]}
```

### Expenses Endpoints

```
POST /api/personal-expenses/expense
  Purpose: Add expense
  Request: {category, description, amount, isDeductible, ...}
  Response: {expenseId, status}

GET /api/personal-expenses/list
  Purpose: List expenses
  Query: ?category=...&deductible=...&period=...
  Response: {expenses[], total, pagination}

POST /api/personal-expenses/upload-receipt
  Purpose: Upload receipt for OCR
  Request: FormData with file
  Response: {expenseId, ocrData, confidence}

POST /api/personal-expenses/import
  Purpose: Bulk import expenses
  Request: {rows[], mapping}
  Response: {created, updated, skipped}

GET /api/personal-expenses/deductibles-summary
  Purpose: Get deductibles breakdown
  Response: {total, byCategory[], receiptStatus}

POST /api/personal-expenses/export
  Purpose: Export expenses
  Request: {format, period, content}
  Response: File stream
```

### Tax Position Endpoints

```
GET /api/personal-tax/position
  Purpose: Get complete tax position
  Response: {
    calculations: {...},
    assumptions: {...},
    incomeBreakdown: [],
    deductionsBreakdown: [],
    lastCalculated: Date
  }

POST /api/personal-tax/recalculate
  Purpose: Recalculate with new assumptions
  Request: {assumptions}
  Response: {calculations, lastCalculated}

PATCH /api/personal-tax/assumptions
  Purpose: Update tax assumptions
  Request: {annualIncomeEstimate, taxRelief, ...}
  Response: {success, assumptions}

GET /api/personal-tax/calculation-detail
  Purpose: Get detailed calculation breakdown
  Response: {incomeDetail, deductionsDetail, taxDetail, ...}
```

### Filing Endpoints

```
POST /api/personal-tax/filing/new
  Purpose: Start new return
  Request: {year, includeIncome[], includeDeductions[]}
  Response: {returnId, status: "draft"}

GET /api/personal-tax/filing/{id}
  Purpose: Get return draft
  Response: {id, year, income, deductions, calculations, ...}

PATCH /api/personal-tax/filing/{id}
  Purpose: Update return draft
  Request: {income[], deductions[], adjustments}
  Response: {success, return}

POST /api/personal-tax/filing/{id}/submit
  Purpose: Submit return to FIRS
  Request: {declaration: true, documents[]}
  Response: {returnId, referenceNumber, status: "filed", timestamp}

GET /api/personal-tax/filing/history
  Purpose: Get all filed returns
  Response: {returns[], count}

GET /api/personal-tax/filing/{id}/download
  Purpose: Download return as PDF
  Response: File stream

POST /api/personal-tax/filing/{id}/export
  Purpose: Export return summary
  Request: {format: "pdf" | "excel"}
  Response: File stream
```

---

## PART E: ERROR HANDLING

### Common Error Scenarios

```
INCOME ENTRY ERRORS:

1. Duplicate Entry
   ├─ Same source + date already exists
   ├─ Error: "Income entry already exists"
   ├─ Action: Show existing entry, link to it
   └─ Toast: "Duplicate found. View [here]"

2. Invalid PAYE Amount
   ├─ PAYE > Gross Amount
   ├─ Error: "Tax paid cannot exceed gross amount"
   ├─ Action: Highlight incorrect field
   └─ Toast: "Please correct tax amount"

3. Payslip OCR Confidence Low
   ├─ If OCR < 75% confidence
   ├─ Show yellow warning
   ├─ Highlight low-confidence fields
   └─ User can correct before saving

4. CSV Import Errors
   ├─ Invalid dates, missing fields
   ├─ Error: Show row-by-row validation
   ├─ Action: User fixes and retries
   └─ Toast: "X rows have errors"

EXPENSE ENTRY ERRORS:

1. Missing Receipt (if required)
   ├─ Deductible item without evidence
   ├─ Warning: "No receipt attached"
   ├─ Action: Allow proceed OR require upload
   └─ Status: "Pending Proof"

2. Invalid Category
   ├─ Category doesn't exist
   ├─ Error: "Select valid category"
   └─ Action: Show category dropdown

TAX FILING ERRORS:

1. Incomplete Data
   ├─ Missing required income/deductions
   ├─ Error: "Cannot file - data incomplete"
   ├─ Action: Show missing items
   └─ Toast: "Add missing income/deductions"

2. FIRS Connection Error
   ├─ Cannot submit to FIRS
   ├─ Error: "FIRS connection unavailable"
   ├─ Action: Save as draft, retry later
   └─ Toast: "Return saved. Try submitting later"

3. Invalid Declaration
   ├─ User hasn't accepted all checkboxes
   ├─ Error: "You must accept all declarations"
   ├─ Action: Highlight unchecked boxes
   └─ User checks all boxes
```

---

## PART E: IMPLEMENTATION CHECKLIST

### Income Tracker Checklist

```
HEADER BUTTONS
☐ [+ Add Income ▼] dropdown works
☐ Manual entry form complete
☐ Payslip upload with OCR works
☐ CSV import wizard complete
☐ [Import CSV] direct button works
☐ [Search] filters income
☐ [Analytics] shows charts
☐ [Export] generates files
☐ [Settings] opens config

FILTERS
☐ Period filter works (YTD, This Year, Custom)
☐ Source filter works (multi-select)
☐ Month filter works
☐ [Apply Filters] applies all
☐ [Clear] resets filters
☐ Filter chips display
☐ URL reflects filters

INCOME TABLE
☐ [✎] edit icon opens modal
☐ Can edit all fields
☐ Pagination works
☐ Data loads quickly
☐ Row count displays

SIDE CARDS
☐ Income by Source card shows
☐ [View Breakdown] works
☐ YTD Comparison card shows
☐ Comparison data accurate

DATA & INTEGRATION
☐ Income entries save to DB
☐ Net amount calculated correctly (Gross - PAYE)
☐ PAYE/WHT captured accurately
☐ OCR extraction accurate
☐ CSV import parses correctly
☐ Recurring entries auto-create monthly
☐ Export formats correct

CALCULATIONS
☐ YTD total accurate
☐ Monthly average correct
☐ Total tax paid aggregates correctly
☐ By-source breakdown correct

STATE MANAGEMENT
☐ Redux store structured
☐ Actions dispatch properly
☐ Selectors memoized
☐ State persists

ERROR HANDLING
☐ Network errors handled
☐ API errors show messages
☐ Validation errors display
☐ File upload errors clear
☐ Retry buttons available

PERFORMANCE
☐ Page load < 2 seconds
☐ Filters apply < 1 second
☐ CSV import < 10 seconds
☐ Export < 5 seconds
☐ No lag on interactions
```

### Expenses Checklist

```
Similar structure to income tracker:

HEADER BUTTONS
☐ [+ Add Expense ▼] dropdown works
☐ Manual entry form complete
☐ Receipt upload with OCR works
☐ CSV import wizard complete
☐ [Upload Receipt] direct button works
☐ [Search] filters expenses
☐ [Analytics] shows charts
☐ [Export] generates files
☐ [Settings] opens config

FILTERS
☐ Category filter works (multi-select)
☐ Deductible filter works
☐ Period filter works
☐ [Apply Filters] applies all
☐ [Clear] resets filters

EXPENSE TABLE
☐ [✎] edit icon works
☐ Can edit all fields
☐ Pagination works

SIDE CARDS
☐ Deductibles by Category card shows
☐ Receipt Status card shows
☐ [Upload Missing Proofs] works

DATA & INTEGRATION
☐ Expenses save to DB
☐ Deductible status correct
☐ OCR extraction accurate
☐ CSV import works
☐ Receipt storage working

CALCULATIONS
☐ Total deductible amount correct
☐ Category breakdown correct
☐ Non-deductible items excluded from tax calculation

ERROR HANDLING
☐ All common errors handled
☐ Missing receipt warnings clear
☐ Invalid category feedback clear
```

### Tax Position Checklist

```
SUMMARY CARDS
☐ Gross Income card displays correct amount
☐ Taxable Income card shows calculation
☐ Tax Liability card accurate
☐ Tax Status card shows refund/balance correctly

CALCULATIONS
☐ Gross Income = sum of all income entries ✓
☐ Deductions = sum of all deductible expenses ✓
☐ Taxable Income = Gross - Deductions ✓
☐ Tax = Taxable × 18% (or applicable rate) ✓
☐ Tax Paid = sum of PAYE/WHT ✓
☐ Balance = Tax - Tax Paid ✓

BREAKDOWN SECTIONS
☐ Income Summary displays all sources
☐ Deductions Summary displays all categories
☐ Tax Calculation shows step-by-step math
☐ Tax Paid So Far lists all PAYE/WHT

CHARTS & VISUALS
☐ Pie chart: Income sources
☐ Pie chart: Deductions
☐ Bar chart: Tax vs Income
☐ Gauge: Tax progress

ACTION BUTTONS
☐ [Generate Full Return] launches wizard
☐ [Review Deductions] opens detail page
☐ [Adjust] opens adjustment modal
☐ [View Assumptions] shows settings
☐ [File Your Return ✓] launches filing

REAL-TIME UPDATES
☐ Updates when income added
☐ Updates when expense added
☐ Updates on adjustment changes
☐ No manual "recalculate" needed

ERROR HANDLING
☐ Handles missing data gracefully
☐ Shows warnings for incomplete info
☐ Allows filing with warnings if needed
```

### Filing Checklist

```
WIZARD FUNCTIONALITY
☐ Step 1: Data review page loads
☐ Step 1: Can edit income/deductions
☐ Step 1: Can add missing items
☐ Step 2: Tax calculation displays
☐ Step 2: Documents list shows
☐ Step 2: Can upload additional documents
☐ Step 2: Declaration checkboxes work
☐ Step 3: Summary displays correctly
☐ Step 3: Can review before submitting
☐ Step 3: Submission options clear
☐ Can navigate between steps
☐ Can save as draft at any step

FILING PROCESS
☐ Return validates before submission
☐ FIRS submission succeeds
☐ Reference number received
☐ Status updates to "Filed"
☐ Confirmation email sent
☐ Receipt PDF generated
☐ Can download receipt

FILING HISTORY
☐ All filed returns display
☐ Status shows correctly (filed, acknowledged, etc.)
☐ Can download return PDFs
☐ Can view acknowledgement letters
☐ Timeline of events displays

STATE MANAGEMENT
☐ Redux store structured
☐ Return data persists during wizard
☐ Step state maintained
☐ Can resume incomplete returns

ERROR HANDLING
☐ FIRS connection errors handled
☐ Incomplete data errors show clearly
☐ Invalid field errors highlight properly
☐ Retry mechanisms work

PERFORMANCE
☐ Wizard loads quickly
☐ Page navigation is smooth
☐ File submission < 30 seconds
☐ Download/export < 5 seconds
```

---

## SUMMARY

This document provides **complete implementation guides** for Individual Tax Management:

### **PART A: INCOME TRACKER PAGE**
✅ **6 Header buttons** - Add Income, Import CSV, Search, Analytics, Export, Settings  
✅ **3 Filter controls** - Period, Source, Month  
✅ **Income table** with edit, pagination  
✅ **2 Side cards** - Income by Source, YTD Comparison  

### **PART B: EXPENSES & DEDUCTIBLES PAGE**
✅ **6 Header buttons** - Add Expense, Upload Receipt, Search, Analytics, Export, Settings  
✅ **3 Filter controls** - Category, Deductible Status, Period  
✅ **Expense table** with edit, pagination  
✅ **2 Side cards** - Deductibles by Category, Receipt Status  

### **PART C: TAX POSITION PAGE**
✅ **4 Summary cards** - Gross Income, Taxable Income, Tax Liability, Tax Status  
✅ **5 Breakdown sections** - Income, Deductions, Calculations, Tax Paid, Details  
✅ **4 Charts** - Pie, Pie, Bar, Gauge  
✅ **6 Action buttons** - Generate Return, Review, Adjust, View Assumptions, File  

### **PART D: FILING & RETURNS**
✅ **3-step filing wizard** - Review Data, Confirm Calc, Final Review  
✅ **Auto-populated data** from income/expenses  
✅ **Document upload** for supporting proof  
✅ **FIRS submission** with reference number  
✅ **Filing history** tracking  

### **PART E: INTEGRATION**
✅ Complete data flow from income tracking → tax filing  
✅ Page interconnections via sidebar  
✅ Real-time tax calculations  
✅ Redux state management structure  
✅ **25+ API endpoints** for all operations  
✅ Comprehensive error handling  
✅ **Full implementation checklist** (150+ items)  

---

**Ready for development!** This is a simplified but complete individual tax product.

---

**Document Version:** 1.0  
**Status:** Production Ready  
**Date:** December 30, 2025  
**Product:** TaxGee Personal