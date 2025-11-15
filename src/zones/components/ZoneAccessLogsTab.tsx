import dayjs from 'dayjs';
import type { AccessLog } from '../model/access-log';

type Props = {
    logs: AccessLog[];
};

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

export function ZoneAccessLogsTab({ logs }: Props) {
    if (logs.length === 0) {
        return (
            <div className="p-4 text-sm text-gray-500">
                No access logs for this zone yet.
            </div>
        );
    }

    return (
        <div className="space-y-4 p-4">
            {logs.map((l, idx) => (
                <div
                    key={idx}
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3"
                >
                    <div>
                        <p className="font-medium">{l.name}</p>
                        <p className="text-xs text-gray-500">{dayjs(l.accessTime).format('lll')}</p>
                    </div>
                    <AccessBadge type={l.accessGranted ? 'granted' : 'denied'} />
                </div>
            ))}
        </div>
    );
}
