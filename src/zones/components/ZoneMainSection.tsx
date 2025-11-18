import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import dayjs from 'dayjs';
import type { ReactNode } from 'react';
import { useGlobalStore } from '../../shared/stores/globalstore';
import { useZoneStore } from '../stores/zone-store';

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

function ZoneTable({ onOpenDetails }: { onOpenDetails: () => void }) {
    const { zones } = useGlobalStore();
    const { setSelectedZone } = useZoneStore();

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
                    <tbody className="divide-y">
                        {zones.map((z) => (
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
                        {zones.length === 0 && (
                            <tr>
                                <td className="py-6 text-center text-sm text-gray-500" colSpan={5}>
                                    No zones match your search
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}

function RecentAccess() {
    const { zones } = useGlobalStore();

    const accessLogs = zones.flatMap((zone) => zone.accessLogs);

    accessLogs.sort((a, b) => dayjs(b.accessTime).diff(a.accessTime));

    return (
        <Card>
            <div className="mb-3 flex items-center gap-2">
                <ShieldOutlinedIcon />
                <p className="font-medium">Recent Access</p>
            </div>

            <div className="flex flex-col gap-3">
                {accessLogs.length === 0 && (
                    <p className="text-sm text-gray-500">No access events match the selected filters.</p>
                )}

                {accessLogs.map((a, idx) => {
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
        </Card>
    );
}

export function ZoneMainSection({ onOpenDetails }: { onOpenDetails: () => void }) {
    return (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <ZoneTable onOpenDetails={onOpenDetails} />
            <RecentAccess />
        </div>
    );
}
