import React from 'react';
import IncomeTrackerHeader from '../../components/individual/IncomeTrackerHeader';
import IncomeStatsGrid from '../../components/individual/IncomeStatsGrid';
import IncomeFilterBar from '../../components/individual/IncomeFilterBar';
import IncomeTable from '../../components/individual/IncomeTable';

const IndividualDashboard = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-12">
            <IncomeTrackerHeader
                onAddIncome={() => console.log('Add Income')}
                onImport={() => console.log('Import')}
            />

            <IncomeStatsGrid />

            <div className="mt-6 mx-auto w-full max-w-[1400px]">
                <div className="mx-6 mb-4">
                    <IncomeFilterBar />
                </div>
                <IncomeTable />
            </div>

            {/* Side Cards (Placeholder - could be grid next to table) */}
            {/* For MVP, placing table full width is fine mostly. Spec had side cards. Will add chart placeholders if needed later. */}
        </div>
    );
};

export default IndividualDashboard;
