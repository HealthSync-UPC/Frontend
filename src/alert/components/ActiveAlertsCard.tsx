import dayjs from 'dayjs';
import { useState } from 'react';
import { Pagination } from '@mui/material';
import { useGlobalStore } from '../../shared/stores/globalstore';

export function ActiveAlertsCard({ typeFilter, locationFilter }: { typeFilter?: string; locationFilter?: string }) {
    const { alerts } = useGlobalStore();

    const [page, setPage] = useState(1);
    const pageSize = 5;

    let rows = alerts;

    if (typeFilter && typeFilter !== 'all') {
        rows = rows.filter(r => (r.type || '').toUpperCase() === typeFilter.toUpperCase());
    }

    if (locationFilter && locationFilter !== 'all') {
        rows = rows.filter(r => (r.location || '') === locationFilter);
    }

    const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
    if (page > totalPages) setPage(1);
    const visibleRows = rows.slice((page - 1) * pageSize, page * pageSize);

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="font-medium">Alerts {rows.length}</p>
            <p className="text-sm text-[#67737C] mb-4">Real-time monitoring alerts from your medical equipment</p>

            <div>
                <div className="flex text-gray-600 border-b text-sm px-4 py-2">
                    <label className="flex-1 font-medium">Alert ID</label>
                    <label className="flex-1 font-medium">Type</label>
                    <label className="flex-1 font-medium">Location</label>
                    <label className="flex-1 font-medium">Registered At</label>
                </div>

                <div className="h-80">
                    {visibleRows.map(row => {
                        const rawType = row.type || '';
                        const formattedType = rawType.replace(/[_-]/g, ' ').toLowerCase().split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                        const getVariant = (t: string) => {
                            const up = t.toUpperCase();
                            if (up.includes('HIGH')) return 'high';
                            if (up.includes('LOW')) return 'low';
                            return 'gray';
                        };
                        const variant = getVariant(rawType);
                        const colorClasses = variant === 'low'
                            ? 'bg-[#E6F4FF] text-[#1E90FF]'
                            : variant === 'high'
                                ? 'bg-[#FFF3E8] text-[#FF4500]'
                                : 'bg-gray-100 text-gray-700';

                        return (
                            <div key={row.id} className="flex my-5 text-gray-600 border-b text-sm px-4 py-2">
                                <label className="flex-1 font-medium">{row.id}</label>
                                <label className="flex-1 font-medium">
                                    <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs ${colorClasses}`}>
                                        {formattedType}
                                    </span>
                                </label>
                                <label className="flex-1 font-medium">{row.location}</label>
                                <label className="flex-1 font-medium">{dayjs(row.registeredAt).format('LLL')}</label>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="mt-3 flex justify-center">
                <Pagination count={totalPages} page={page} onChange={(_, value) => setPage(value)} />
            </div>
        </div>
    );
}
