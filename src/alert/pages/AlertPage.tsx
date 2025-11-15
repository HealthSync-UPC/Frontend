import { useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { AlertFilters } from '../model/types';
import { SectionCard } from '../components/ui';
import { ActiveAlertsCard } from '../components/ActiveAlertsCard';


export function AlertPage() {
    const [filters, setFilters] = useState<AlertFilters>({
        query: '',
        status: 'all',
        severity: 'all',
    });

    return (
        <div className="flex flex-col gap-10">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-2xl font-semibold">Alerts</p>
                    <p className="text-base text-[#67737C]">Monitor and manage system alerts and notifications</p>
                </div>
            </div>

            {/* Filters & Search */}
            <SectionCard>
                <div className="flex items-center gap-2 mb-4">
                    <FilterListIcon fontSize="small" />
                    <p className="text-base sm:text-lg font-semibold">Filters & Search</p>
                </div>

                <div className="flex flex-col md:flex-row gap-3">
                    {/* Search */}
                    <div className="relative md:w-1/3">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fontSize="small" />
                        <input
                            placeholder="Search..."
                            value={filters.query}
                            onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
                            className="h-10 w-full rounded-md border border-gray-300 pl-10 pr-3 text-sm"
                        />
                    </div>

                    {/* Status */}
                    <div className="relative md:w-1/4">
                        <select
                            value={filters.status}
                            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value as AlertFilters['status'] }))}
                            className="h-10 w-full appearance-none rounded-md border border-gray-300 px-3 text-sm text-gray-700"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="ack">Acknowledged</option>
                            <option value="closed">Closed</option>
                        </select>
                        <ExpandMoreIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>

                    {/* Severity */}
                    <div className="relative md:w-1/4">
                        <select
                            value={filters.severity}
                            onChange={(e) => setFilters(prev => ({ ...prev, severity: e.target.value as AlertFilters['severity'] }))}
                            className="h-10 w-full appearance-none rounded-md border border-gray-300 px-3 text-sm text-gray-700"
                        >
                            <option value="all">All Severity</option>
                            <option value="critical">Critical</option>
                            <option value="warning">Warning</option>
                        </select>
                        <ExpandMoreIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>
            </SectionCard>

            {/* Active Alerts (card separada) */}
            <ActiveAlertsCard filters={filters} />
        </div>
    );
}

export default AlertPage;
