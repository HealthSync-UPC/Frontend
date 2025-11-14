import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import { ZoneMainSection, type AccessRow, type ZoneRow } from '../components/ZoneMainSection';
import { ZoneStats } from '../components/ZoneStats';


// ---- Mock data (solo aquí) ----
const ZONES: ZoneRow[] = [
    { name: 'Pharmacy Cold Storage', devices: 2, items: 2, members: 3 },
    { name: 'Laboratory Refrigerators', devices: 1, items: 1, members: 2 },
    { name: 'Blood Bank', devices: 1, items: 1, members: 1 },
    { name: 'Vaccine Storage', devices: 1, items: 1, members: 1 },
];

const ACCESS: AccessRow[] = [
    { user: 'Unknown User', when: '14/11/2024, 10:45:00 a. m.', status: 'denied' },
    { user: 'Pharmacist Mike Chen', when: '14/11/2024, 9:15:00 a. m.', status: 'granted' },
    { user: 'Dr. Sarah Johnson', when: '14/11/2024, 8:30:00 a. m.', status: 'granted' },
    { user: 'Vaccine Coordinator', when: '14/11/2024, 8:00:00 a. m.', status: 'granted' },
    { user: 'Lab Tech John Smith', when: '14/11/2024, 7:00:00 a. m.', status: 'granted' },
];

export default function ZoneManagementPage() {
    const [query, setQuery] = useState('');

    const zonesFiltered = ZONES.filter((z) =>
        z.name.toLowerCase().includes(query.trim().toLowerCase())
    );

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
                <button className="inline-flex items-center gap-2 rounded-md bg-[#1E4288] px-4 py-2 text-white hover:bg-[#163568]">
                    <AddIcon fontSize="small" />
                    Add Zone
                </button>
            </div>

            {/* Search / Actions */}
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
                <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
                    <TuneIcon fontSize="small" />
                    Filter
                </button>
                <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
                    Export
                </button>
            </div>

            {/* Stats y contenido principal */}
            <ZoneStats
                totalZones={ZONES.length}
                totalMembers={7}
                devices={5}
                items={5}
            />
            <ZoneMainSection zones={zonesFiltered} access={ACCESS} />
        </div>
    );
}
