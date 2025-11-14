import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import WarningIcon from '@mui/icons-material/Warning';
import type { Iot } from "../model/iot";
import type { ReactNode } from "react";

interface TableIoTProps {
    devices: Iot[];
    onViewReadings: (device: Iot) => void;
    onAddReading: (device: Iot) => void;   // ⬅️ nuevo callback
}

type StatusKey = "ONLINE" | "OFFLINE" | "WARNING";

const statusUI: Record<StatusKey, {
    icon: ReactNode;
    bg: string;
    text: string;
    label: string;
}> = {
    ONLINE: {
        icon: <WifiIcon className="text-[#00C950]" />,
        bg: "bg-[#DCFCE7]",
        text: "text-[#016630]",
        label: "Online",
    },
    OFFLINE: {
        icon: <WifiOffIcon className="text-[#DC2626]" />,
        bg: "bg-[#FEE2E2]",
        text: "text-[#B91C1C]",
        label: "Offline",
    },
    WARNING: {
        icon: <WarningIcon className="text-[#FACC15]" />,
        bg: "bg-[#FEF9C3]",
        text: "text-[#854D0E]",
        label: "Warning",
    },
};

const typeUI: Record<string, string> = {
    TEMPERATURE: "Temperature",
    HUMIDITY: "Humidity",
    ACCESS_NFC: "Access NFC",
};

export function TableIoT({ devices, onViewReadings, onAddReading }: TableIoTProps) {
    return (
        <Card className="shadow-none border rounded-2xl bg-[#F9FCFF] border-[#DFE6EB]">
            <CardContent>
                <div className="flex flex-col gap-4">

                    {/* Header */}
                    <div className="flex flex-col items-start text-[#67737C]">
                        <p className="text-lg font-medium text-[#040C13]">Device Network Status</p>
                        <p>Real-time status of all registered IoT devices</p>
                    </div>

                    {/* Table */}
                    <div className="text-[#040C13] text-sm">

                        {/* Column titles */}
                        <div className="grid grid-cols-6 font-medium border-b border-[#DFE6EB] pb-2 text-[#67737C]">
                            <span>ID</span>
                            <span>Serial Number</span>
                            <span>Name</span>
                            <span>Type</span>
                            <span className="text-right">Status</span>
                            <span className="text-right">Readings</span>
                        </div>

                        <div className="divide-y divide-[#DFE6EB] mt-2">
                            {devices.map((d) => {
                                const statusKey = (d.status as StatusKey) || "OFFLINE";
                                const st = statusUI[statusKey];
                                const typeLabel = typeUI[d.type] ?? d.type;

                                return (
                                    <div key={d.id} className="grid grid-cols-6 items-center py-4">

                                        {/* ID */}
                                        <span className="font-semibold">
                                            {d.id}
                                        </span>

                                        {/* Serial Number */}
                                        <span className="font-medium">
                                            {d.serialNumber}
                                        </span>

                                        {/* Name */}
                                        <span>
                                            {d.name}
                                        </span>

                                        {/* Device Type */}
                                        <div className="border border-[#DFE6EB] rounded-lg px-3 py-1 text-center">
                                            {typeLabel}
                                        </div>

                                        {/* Status */}
                                        <div className="flex items-center justify-end gap-2">
                                            {st.icon}
                                            <div className={`${st.bg} rounded-lg px-3 py-1 ${st.text} text-xs font-medium`}>
                                                {st.label}
                                            </div>
                                        </div>

                                        {/* Readings Actions */}
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => onViewReadings(d)}
                                                className="px-3 py-1 text-xs font-medium border border-[#00648E] text-[#00648E] rounded-md hover:bg-[#E0F2F8] transition-colors"
                                            >
                                                View
                                            </button>

                                            <button
                                                onClick={() => onAddReading(d)}
                                                className="px-3 py-1 text-xs font-medium bg-[#00648E] text-white rounded-md hover:bg-[#005273] transition-colors"
                                            >
                                                Add
                                            </button>
                                        </div>

                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
