import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export type ZoneFilters = {
    status: 'All Statuses' | 'Access Granted' | 'Access Denied';
    location:
    | 'All Locations'
    | 'Pharmacy Cold Storage'
    | 'Laboratory Refrigerators'
    | 'Blood Bank'
    | 'Vaccine Storage';
    dateRange: 'All Time' | 'Last 24 Hours' | 'Last 7 Days';
};

type Props = {
    open: boolean;
    filters: ZoneFilters;
    onApply: (f: ZoneFilters) => void;
    onReset: () => void;
    onClose: () => void;
};

export function FilterModal({ open, filters, onApply, onReset, onClose }: Props) {
    const [localFilters, setLocalFilters] = useState<ZoneFilters>(filters);

    if (!open) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    const handleApply = () => {
        onApply(localFilters);
    };

    const handleReset = () => {
        onReset();
        setLocalFilters(filters);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={handleBackdropClick}
        >
            <div className="relative w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:bg-gray-100"
                >
                    <CloseIcon fontSize="small" />
                </button>

                <h2 className="text-xl font-semibold">Filter Options</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Customize your view with these filter options
                </p>

                <div className="mt-5">
                    <p className="mb-1 text-sm font-medium text-gray-700">Status</p>
                    <select
                        value={localFilters.status}
                        onChange={(e) =>
                            setLocalFilters((prev) => ({
                                ...prev,
                                status: e.target.value as ZoneFilters['status'],
                            }))
                        }
                        className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-3 text-sm"
                    >
                        <option>All Statuses</option>
                        <option>Access Granted</option>
                        <option>Access Denied</option>
                    </select>
                </div>

                <div className="mt-4">
                    <p className="mb-1 text-sm font-medium text-gray-700">Location</p>
                    <select
                        value={localFilters.location}
                        onChange={(e) =>
                            setLocalFilters((prev) => ({
                                ...prev,
                                location: e.target.value as ZoneFilters['location'],
                            }))
                        }
                        className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-3 text-sm"
                    >
                        <option>All Locations</option>
                        <option>Pharmacy Cold Storage</option>
                        <option>Laboratory Refrigerators</option>
                        <option>Blood Bank</option>
                        <option>Vaccine Storage</option>
                    </select>
                </div>

                <div className="mt-4">
                    <p className="mb-1 text-sm font-medium text-gray-700">Date Range</p>
                    <select
                        value={localFilters.dateRange}
                        onChange={(e) =>
                            setLocalFilters((prev) => ({
                                ...prev,
                                dateRange: e.target.value as ZoneFilters['dateRange'],
                            }))
                        }
                        className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-3 text-sm"
                    >
                        <option>All Time</option>
                        <option>Last 24 Hours</option>
                        <option>Last 7 Days</option>
                    </select>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={handleReset}
                        className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                        Reset Filters
                    </button>
                    <button
                        onClick={handleApply}
                        className="rounded-md bg-[#1E4288] px-4 py-2 text-sm font-medium text-white hover:bg-[#163568]"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </div>
    );
}
