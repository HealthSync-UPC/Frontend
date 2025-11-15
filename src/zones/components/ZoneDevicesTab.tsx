import type { Iot } from "../../iot/model/iot";

const typeUI: Record<string, string> = {
    TEMPERATURE: "Temperature",
    HUMIDITY: "Humidity",
    ACCESS_NFC: "Access NFC",
};

type StatusKey = "ONLINE" | "OFFLINE" | "WARNING";

const statusUI: Record<StatusKey, {
    bg: string;
    text: string;
    label: string;
}> = {
    ONLINE: {
        bg: "bg-[#DCFCE7]",
        text: "text-[#016630]",
        label: "Online",
    },
    OFFLINE: {
        bg: "bg-[#FEE2E2]",
        text: "text-[#B91C1C]",
        label: "Offline",
    },
    WARNING: {
        bg: "bg-[#FEF9C3]",
        text: "text-[#854D0E]",
        label: "Warning",
    },
};

export function ZoneDevicesTab({ devices }: { devices: Iot[] }) {
    if (devices.length === 0) {
        return (
            <div className="p-4 text-sm text-gray-500">
                No devices assigned to this zone yet.
            </div>
        );
    }

    return (
        <div className="space-y-4 p-4">
            {devices.map((d) => {
                const statusKey = (d.status as StatusKey) || "OFFLINE";
                const st = statusUI[statusKey];

                return (
                    <div
                        key={d.serialNumber}
                        className="flex justify-between items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3"
                    >
                        <div className="flex flex-col justify-center">
                            <div>
                                <p className="font-medium">{d.name}</p>
                                <p className="text-xs text-gray-500">Serial: {d.serialNumber}</p>
                            </div>
                            <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
                                <div>
                                    <p className="text-xs text-gray-500">Type</p>
                                    <p className="font-medium">{typeUI[d.type] ?? d.type}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Location</p>
                                    <p className="font-medium">{d.location}</p>
                                </div>
                            </div>
                        </div>

                        <div className={`${st.bg} rounded-lg px-3 py-1 ${st.text} text-xs font-medium h-fit w-fit`}>
                            {st.label}
                        </div>
                    </div>
                )
            })}
        </div>
    );
}
