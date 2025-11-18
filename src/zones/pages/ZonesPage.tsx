import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import { useState } from 'react';
import { AddZoneModal } from '../components/add-zone/AddZoneModal';
import { FilterModal, type ZoneFilters } from '../components/FilterModal';
import { ZoneDetailsModal } from '../components/zone-details/ZoneDetailsModal';
import { ZoneMainSection } from '../components/ZoneMainSection';
import { ZoneStats } from '../components/ZoneStats';

const DEFAULT_FILTERS: ZoneFilters = {
    status: 'All Statuses',
    location: 'All Locations',
    dateRange: 'All Time',
};

export default function ZoneManagementPage() {
    const [query, setQuery] = useState('');
    const [openAddZone, setOpenAddZone] = useState(false);
    const [openFilters, setOpenFilters] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const [filters, setFilters] = useState<ZoneFilters>(DEFAULT_FILTERS);

    const handleApplyFilters = (f: ZoneFilters) => {
        setFilters(f);
        setOpenFilters(false);
    };

    const handleResetFilters = () => {
        setFilters(DEFAULT_FILTERS);
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="mt-2 flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Zone Management</h1>
                    <p className="text-base text-gray-600">
                        Manage zones, assign devices, items, and control member access
                    </p>
                </div>

                <button
                    onClick={() => setOpenAddZone(true)}
                    className="inline-flex items-center gap-2 rounded-md bg-[#1E4288] px-4 py-2 text-white hover:bg-[#163568]"
                >
                    <AddIcon fontSize="small" />
                    Add Zone
                </button>
            </div>

            {/* Search + acciones */}
            <div className="flex items-center gap-3">
                <div className="relative w-full">
                    <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search..."
                        className="h-11 w-full rounded-lg border border-gray-300 pl-10 pr-3 text-sm"
                    />
                </div>
                <button
                    onClick={() => setOpenFilters(true)}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
                >
                    <TuneIcon fontSize="small" />
                    Filter
                </button>
                <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
                    Export
                </button>
            </div>

            {/* Stats + main content */}
            <ZoneStats />
            <ZoneMainSection onOpenDetails={() => setOpenDetails(true)} />

            {/* Modales */}
            <AddZoneModal open={openAddZone} onClose={() => setOpenAddZone(false)} />

            <FilterModal
                open={openFilters}
                filters={filters}
                onApply={handleApplyFilters}
                onReset={handleResetFilters}
                onClose={() => setOpenFilters(false)}
            />

            <ZoneDetailsModal open={openDetails} onClose={() => setOpenDetails(false)} />
        </div>
    );
}
