import dayjs from 'dayjs';
import { useGlobalStore } from '../../shared/stores/globalstore';

export function ActiveAlertsCard({ typeFilter, locationFilter }: { typeFilter?: string; locationFilter?: string }) {
    const { alerts } = useGlobalStore();

    let rows = alerts;

    if (typeFilter && typeFilter !== 'all') {
        rows = rows.filter(r => (r.type || '').toUpperCase() === typeFilter.toUpperCase());
    }

    if (locationFilter && locationFilter !== 'all') {
        rows = rows.filter(r => (r.location || '') === locationFilter);
    }

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="font-medium">Alerts {rows.length}</p>
            <p className="text-sm text-[#67737C] mb-4">Real-time monitoring alerts from your medical equipment</p>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="text-left text-gray-600 border-b">
                            <th className="py-3 pr-4 font-medium">Alert ID</th>
                            <th className="py-3 pr-4 font-medium">Type</th>
                            <th className="py-3 pr-4 font-medium">Location</th>
                            <th className="py-3 pr-4 font-medium">Registered At</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {rows.map(row => {
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
                                <tr key={row.id} className="align-middle">
                                    <td className="py-4 pr-4 font-mono tracking-wider">{row.id}</td>
                                    <td className="py-4 pr-4">
                                        <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs ${colorClasses}`}>
                                            {formattedType}
                                        </span>
                                    </td>
                                    <td className="py-4 pr-4">{row.location}</td>
                                    <td className="py-4 pr-4">{dayjs(row.registeredAt).format('LLL')}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
