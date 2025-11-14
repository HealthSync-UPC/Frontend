import type { ZoneDevice } from './ZoneDetailsModal';

type Props = {
    devices: ZoneDevice[];
};

export function ZoneDevicesTab({ devices }: Props) {
    if (devices.length === 0) {
        return (
            <div className="p-4 text-sm text-gray-500">
                No devices assigned to this zone yet.
            </div>
        );
    }

    return (
        <div className="space-y-4 p-4">
            {devices.map((d) => (
                <div
                    key={d.serial}
                    className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">{d.name}</p>
                            <p className="text-xs text-gray-500">Serial: {d.serial}</p>
                        </div>
                        <span className="rounded-full bg-[#1E4288] px-3 py-1 text-xs font-medium text-white">
                            {d.status}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
                        <div>
                            <p className="text-xs text-gray-500">Type</p>
                            <p className="font-medium">{d.type}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Location</p>
                            <p className="font-medium">{d.location}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Latest Reading</p>
                            <p className="font-medium">{d.latestReading}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
