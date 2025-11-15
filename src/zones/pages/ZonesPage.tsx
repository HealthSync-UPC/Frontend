import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import { ZoneMainSection } from '../components/ZoneMainSection';
import { ZoneDetailsModal } from '../components/ZoneDetailsModal';
import { FilterModal, type ZoneFilters } from '../components/FilterModal';
import { ZoneStats } from '../components/ZoneStats';
import { AddZoneModal } from '../components/AddZoneModal';
import type { Zone } from '../model/zone';
import { useGlobalStore } from '../../shared/stores/globalstore';
/* import { ZoneStats } from './components/ZoneStats';
import {
    ZoneMainSection,
    type ZoneRow,
    type AccessRow,
} from './components/ZoneMainSection';
import { AddZoneModal } from './components/AddZoneModal';
import { FilterModal, type ZoneFilters } from './components/FilterModal';
import {
    ZoneDetailsModal,
    type ZoneDetails,
} from './components/ZoneDetailsModal'; */

// ---- MOCK ZONES ----
/* const ZONES: ZoneRow[] = [
    { id: 1, name: 'Pharmacy Cold Storage', devices: 2, items: 2, members: 3 },
    { id: 2, name: 'Laboratory Refrigerators', devices: 1, items: 1, members: 2 },
    { id: 3, name: 'Blood Bank', devices: 1, items: 1, members: 1 },
    { id: 4, name: 'Vaccine Storage', devices: 1, items: 1, members: 1 },
]; */

// ---- MOCK ACCESOS GLOBALES (para el panel Recent Access + filtros) ----
/* const ACCESS: AccessRow[] = [
    {
        user: 'Unknown User',
        when: '14/11/2024, 10:45:00 a. m.',
        status: 'denied',
        location: 'Pharmacy Cold Storage',
        daysAgo: 0,
    },
    {
        user: 'Pharmacist Mike Chen',
        when: '14/11/2024, 9:15:00 a. m.',
        status: 'granted',
        location: 'Laboratory Refrigerators',
        daysAgo: 0,
    },
    {
        user: 'Dr. Sarah Johnson',
        when: '14/11/2024, 8:30:00 a. m.',
        status: 'granted',
        location: 'Pharmacy Cold Storage',
        daysAgo: 0,
    },
    {
        user: 'Vaccine Coordinator',
        when: '10/11/2024, 8:00:00 a. m.',
        status: 'granted',
        location: 'Vaccine Storage',
        daysAgo: 4,
    },
    {
        user: 'Lab Tech John Smith',
        when: '05/11/2024, 7:00:00 a. m.',
        status: 'granted',
        location: 'Blood Bank',
        daysAgo: 9,
    },
]; */

// ---- MOCK DETALLES POR ZONA (para el modal de View) ----
/* const ZONE_DETAILS: Record<number, ZoneDetails> = {
    1: {
        id: 1,
        name: 'Pharmacy Cold Storage',
        devices: [
            {
                name: 'Temperature Sensor A1',
                serial: 'SN-001',
                type: 'Temperature',
                location: 'Pharmacy Cold Storage',
                latestReading: '4.5 °C',
                status: 'active',
            },
            {
                name: 'Humidity Monitor H1',
                serial: 'SN-002',
                type: 'Humidity',
                location: 'Pharmacy Cold Storage',
                latestReading: '45 %',
                status: 'active',
            },
        ],
        items: [
            {
                code: 'MED-001',
                name: 'Insulin Vial 10ml',
                quantity: 45,
                unit: 'units',
                status: 'Enabled',
            },
            {
                code: 'MED-002',
                name: 'Antibiotic Tablets',
                quantity: 120,
                unit: 'tablets',
                status: 'Enabled',
            },
        ],
        members: [
            {
                initials: 'DSJ',
                name: 'Dr. Sarah Johnson',
                role: 'Doctor',
                memberId: 1,
            },
            {
                initials: 'PMC',
                name: 'Pharmacist Mike Chen',
                role: 'Pharmacist',
                memberId: 2,
            },
            {
                initials: 'NER',
                name: 'Nurse Emily Rodriguez',
                role: 'Nurse',
                memberId: 3,
            },
        ],
        accessLogs: [
            {
                user: 'Dr. Sarah Johnson',
                timestamp: '14/11/2024, 8:30:00 a. m.',
                status: 'granted',
            },
            {
                user: 'Pharmacist Mike Chen',
                timestamp: '14/11/2024, 9:15:00 a. m.',
                status: 'granted',
            },
            {
                user: 'Unknown User',
                timestamp: '14/11/2024, 10:45:00 a. m.',
                status: 'denied',
            },
        ],
    },
    // para las otras zonas puedes poner mocks simples:
    2: {
        id: 2,
        name: 'Laboratory Refrigerators',
        devices: [],
        items: [],
        members: [],
        accessLogs: [],
    },
    3: {
        id: 3,
        name: 'Blood Bank',
        devices: [],
        items: [],
        members: [],
        accessLogs: [],
    },
    4: {
        id: 4,
        name: 'Vaccine Storage',
        devices: [],
        items: [],
        members: [],
        accessLogs: [],
    },
}; */

const DEFAULT_FILTERS: ZoneFilters = {
    status: 'All Statuses',
    location: 'All Locations',
    dateRange: 'All Time',
};

export default function ZoneManagementPage() {
    const [query, setQuery] = useState('');
    const [openAddZone, setOpenAddZone] = useState(false);
    const [openFilters, setOpenFilters] = useState(false);
    const [filters, setFilters] = useState<ZoneFilters>(DEFAULT_FILTERS);

    const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
    const { zones } = useGlobalStore();

    // búsqueda por nombre
    /*  const zonesFiltered = ZONES.filter((z) =>
         z.name.toLowerCase().includes(query.trim().toLowerCase())
     ); */

    // filtros para Recent Access
    /* const accessFiltered = ACCESS.filter((a) => {
        if (filters.status === 'Access Granted' && a.status !== 'granted') return false;
        if (filters.status === 'Access Denied' && a.status !== 'denied') return false;

        if (filters.location !== 'All Locations' && a.location !== filters.location) return false;

        if (filters.dateRange === 'Last 24 Hours' && a.daysAgo > 1) return false;
        if (filters.dateRange === 'Last 7 Days' && a.daysAgo > 7) return false;

        return true;
    }); */

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
            <ZoneStats
                totalZones={zones.length}
                totalMembers={zones.flatMap(z => z.members).length}
                devices={zones.flatMap(z => z.devices).length}
                items={zones.flatMap(z => z.items).length} />
            <ZoneMainSection
                onViewZone={setSelectedZone}
            />

            {/* Modales */}
            <AddZoneModal open={openAddZone} onClose={() => setOpenAddZone(false)} />

            <FilterModal
                open={openFilters}
                filters={filters}
                onApply={handleApplyFilters}
                onReset={handleResetFilters}
                onClose={() => setOpenFilters(false)}
            />

            <ZoneDetailsModal
                open={selectedZone != null}
                zone={selectedZone!!}
                onClose={() => setSelectedZone(null)}
            />
        </div>
    );
}
