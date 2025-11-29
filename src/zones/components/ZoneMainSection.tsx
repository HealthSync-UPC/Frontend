import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import dayjs from 'dayjs';
import type { ReactNode } from 'react';
import { useGlobalStore } from '../../shared/stores/globalstore';
import { useZoneStore } from '../stores/zone-store';
import { useState } from 'react';
import { Pagination } from '@mui/material';

const Card = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
    <div className={`rounded-xl border border-gray-200 bg-white p-5 ${className}`}>{children}</div>
);

const CountPill = ({ n }: { n: number }) => (
    <span className="inline-flex min-w-[28px] justify-center rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700">
        {n}
    </span>
);

const AccessBadge = ({ type }: { type: 'granted' | 'denied' }) => {
    const styles =
        type === 'granted'
            ? 'bg-[#E6F4FF] text-[#0B63A9] border border-[#B9E0FF]'
            : 'bg-[#FEEAEC] text-[#B4232C] border border-[#F8C9CF]';
    return (
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${styles}`}>
            {type === 'granted' ? 'Access Granted' : 'Access Denied'}
        </span>
    );
};

function ZoneTable({ query, onOpenDetails }: { query: string; onOpenDetails: () => void }) {
    const { zones } = useGlobalStore();
    const { setSelectedZone } = useZoneStore();
    const [page, setPage] = useState(1);
    const pageSize = 5;
    const filteredZones = zones.filter((z) => z.name.toLowerCase().includes(query.toLowerCase()));
    const totalPages = Math.max(1, Math.ceil(filteredZones.length / pageSize));
    if (page > totalPages) setPage(1);
    const visibleZones = filteredZones.slice((page - 1) * pageSize, page * pageSize);

    return (
        <Card className="xl:col-span-2">
            <div className="mb-1 flex items-end justify-between">
                <div>
                    <p className="font-medium">All Zones</p>
                    <p className="text-sm text-gray-500">{zones.length} zones configured</p>
                </div>
            </div>

            <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="border-b text-left text-gray-600">
                            <th className="py-3 pr-4 font-medium">Zone Name</th>
                            <th className="py-3 pr-4 font-medium">Devices</th>
                            <th className="py-3 pr-4 font-medium">Items</th>
                            <th className="py-3 pr-4 font-medium">Members</th>
                            <th className="py-3 pr-2 font-medium">Actions</th>
                        </tr>
                    </thead>
                </table>

                <div className="h-85 overflow-y-auto">
                    <table className="min-w-full text-sm">
                        <tbody className="divide-y">
                            {visibleZones.map((z) => (
                                <tr key={z.id} className="align-middle">
                                    <td className="py-4 pr-4">
                                        <div className="flex items-center gap-2">
                                            <PlaceOutlinedIcon fontSize="small" className="text-gray-500" />
                                            <span className="font-medium">{z.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 pr-4">
                                        <CountPill n={z.devices.length} />
                                    </td>
                                    <td className="py-4 pr-4">
                                        <CountPill n={z.items.length} />
                                    </td>
                                    <td className="py-4 pr-4">
                                        <CountPill n={z.members.length} />
                                    </td>
                                    <td className="py-4 pr-2">
                                        <button
                                            onClick={() => {
                                                setSelectedZone(z);
                                                onOpenDetails();
                                            }}
                                            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50"
                                        >
                                            View
                                        </button>

                                    </td>
                                </tr>
                            ))}
                            {filteredZones.length === 0 && (
                                <tr>
                                    <td className="py-6 text-center text-sm text-gray-500" colSpan={5}>
                                        No zones match your search
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-3 flex justify-center">
                    <Pagination count={totalPages} page={page} onChange={(_, value) => setPage(value)} />
                </div>
            </div>
        </Card>
    );
}

function RecentAccess() {
    const { zones } = useGlobalStore();

    const accessLogs = zones.flatMap((zone) => zone.accessLogs);

    accessLogs.sort((a, b) => dayjs(b.accessTime).diff(a.accessTime));

    const [page, setPage] = useState(1);
    const pageSize = 5;

    const totalPages = Math.ceil(accessLogs.length / pageSize);
    const visibleAccessLogs = accessLogs.slice((page - 1) * pageSize, page * pageSize);

    return (
        <Card className='flex flex-col justify-between h-155 gap-5'>
            <div>
                <div className="mb-3 flex items-center gap-2">
                    <ShieldOutlinedIcon />
                    <p className="font-medium">Recent Access</p>
                </div>

                <div className="flex flex-col gap-3">
                    {accessLogs.length === 0 && (
                        <p className="text-sm text-gray-500">No access events match the selected filters.</p>
                    )}

                    {visibleAccessLogs.map((a, idx) => {
                        const zone = zones.find((z) => z.accessLogs.includes(a))!;

                        return (
                            <div
                                key={idx}
                                className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3"
                            >
                                <div>
                                    <p className='font-bold'>Zone: {zone.name}</p>
                                    <p className="font-medium">{a.name}</p>
                                    <p className="text-xs text-gray-500">{dayjs(a.accessTime).format('LLLL')}</p>
                                </div>
                                <AccessBadge type={a.accessGranted ? 'granted' : 'denied'} />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='mx-auto'>
                <Pagination count={totalPages} page={page} onChange={(_, value) => setPage(value)} />
            </div>
        </Card>
    );
}

export function ZoneMainSection({ query, onOpenDetails }: { query: string; onOpenDetails: () => void }) {
    return (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <ZoneTable query={query} onOpenDetails={onOpenDetails} />
            <RecentAccess />
        </div>
    );
}
