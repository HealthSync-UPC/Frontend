import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SectionCard } from './ui';
import type { Category, Filters, Location } from '../model/types';

const CATEGORIES: Category[] = ['Medications', 'Vaccines', 'Blood Products', 'PPE'];
const LOCATIONS: Location[] = ['Pharmacy Cold Storage A', 'Laboratory Refrigerator', 'Storage Room C', 'Blood Bank Storage'];

export function FiltersCard({
    filters, onChange,
}: {
    filters: Filters;
    onChange: (f: Filters) => void;
}) {
    return (
        <SectionCard>
            <div className="flex items-center gap-2 mb-4">
                <FilterListIcon fontSize="small" />
                <p className="text-base sm:text-lg font-semibold">Filters & Search</p>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
                {/* Search */}
                <div className="relative md:flex-1">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fontSize="small" />
                    <input
                        placeholder="Search items or codes..."
                        value={filters.query}
                        onChange={(e) => onChange({ ...filters, query: e.target.value })}
                        className="h-10 w-full rounded-md border border-gray-300 pl-10 pr-3 text-sm"
                    />
                </div>

                {/* Category */}
                <div className="relative md:w-64">
                    <select
                        value={filters.category}
                        onChange={(e) => onChange({ ...filters, category: e.target.value as Filters['category'] })}
                        className="h-10 w-full appearance-none rounded-md border border-gray-300 px-3 text-sm text-gray-700"
                    >
                        <option>All</option>
                        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                    <ExpandMoreIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>

                {/* Location */}
                <div className="relative md:w-64">
                    <select
                        value={filters.location}
                        onChange={(e) => onChange({ ...filters, location: e.target.value as Filters['location'] })}
                        className="h-10 w-full appearance-none rounded-md border border-gray-300 px-3 text-sm text-gray-700"
                    >
                        <option>All</option>
                        {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                    </select>
                    <ExpandMoreIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
            </div>
        </SectionCard>
    );
}
