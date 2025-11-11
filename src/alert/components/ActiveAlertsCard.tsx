
import { SectionCard, Chip, SeverityBadge, StatusBadge } from './ui';
import type { AlertFilters, AlertRow } from '../model/types';

const ALL_ALERTS: AlertRow[] = [
    { id: 'ALT-001', type: 'High Temperature', severity: 'Critical', status: 'Active', location: 'Pharmacy Cold Storage A' },
    { id: 'ALT-002', type: 'Door Open', severity: 'Warning', status: 'Acknowledged', location: 'Laboratory Refrigerator' },
    { id: 'ALT-003', type: 'High Humidity', severity: 'Warning', status: 'Active', location: 'Storage Room C' },
    { id: 'ALT-004', type: 'Power Failure', severity: 'Critical', status: 'Closed', location: 'Blood Bank Storage' },
];

function applyFilters(list: AlertRow[], f: AlertFilters | undefined) {
    if (!f) return list;
    return list.filter(a => {
        let ok = true;

        if (f.query) {
            const q = f.query.toLowerCase();
            ok = a.id.toLowerCase().includes(q) || a.type.toLowerCase().includes(q) || a.location.toLowerCase().includes(q);
        }
        if (ok && f.status !== 'all') {
            if (f.status === 'active') ok = a.status === 'Active';
            if (f.status === 'ack') ok = a.status === 'Acknowledged';
            if (f.status === 'closed') ok = a.status === 'Closed';
        }
        if (ok && f.severity !== 'all') {
            if (f.severity === 'critical') ok = a.severity === 'Critical';
            if (f.severity === 'warning') ok = a.severity === 'Warning';
        }
        return ok;
    });
}

export function ActiveAlertsCard({ filters }: { filters?: AlertFilters }) {
    const rows = applyFilters(ALL_ALERTS, filters);

    return (
        <SectionCard>
            <p className="font-medium">Active Alerts ({rows.length})</p>
            <p className="text-sm text-[#67737C] mb-4">Real-time monitoring alerts from your medical equipment</p>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="text-left text-gray-600 border-b">
                            <th className="py-3 pr-4 font-medium">Alert ID</th>
                            <th className="py-3 pr-4 font-medium">Type</th>
                            <th className="py-3 pr-4 font-medium">Severity</th>
                            <th className="py-3 pr-4 font-medium">Status</th>
                            <th className="py-3 pr-4 font-medium">Location</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {rows.map(row => (
                            <tr key={row.id} className="align-middle">
                                <td className="py-4 pr-4 font-mono tracking-wider">{row.id}</td>
                                <td className="py-4 pr-4"><Chip>{row.type}</Chip></td>
                                <td className="py-4 pr-4"><SeverityBadge level={row.severity} /></td>
                                <td className="py-4 pr-4"><StatusBadge status={row.status} /></td>
                                <td className="py-4 pr-4">{row.location}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </SectionCard>
    );
}
