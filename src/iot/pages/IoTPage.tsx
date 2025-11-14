import AddIcon from '@mui/icons-material/Add';
import Battery0BarIcon from '@mui/icons-material/Battery0Bar';
import MemoryIcon from "@mui/icons-material/Memory";
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import { useState } from 'react';

import { IoTCard } from "../components/IoTCard";
import { TableIoT } from "../components/TableIoT";
import { AddDeviceModal } from '../components/AddDeviceModal';
import { ReadingsModal } from '../components/ReadingsModal';
import { useGlobalStore } from '../../shared/stores/globalstore';
import type { Iot } from '../model/iot';
import { AddReadingModal } from '../components/AddReadingModal';

export function IoTPage() {
    const { devices } = useGlobalStore();

    const [openModal, setOpenModal] = useState(false);
    const [openReadings, setOpenReadings] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState<Iot | null>(null);
    const [openAddReading, setOpenAddReading] = useState(false);

    const totalDevices = devices.length;
    const onlineCount = devices.filter(device => device.status === 'ONLINE').length;
    const offlineCount = devices.filter(device => device.status === 'OFFLINE').length;
    const warningCount = devices.filter(device => device.status === 'WARNING').length;

    const onlinePercentage = totalDevices > 0
        ? Math.round((onlineCount / totalDevices) * 100)
        : 0;

    const handleViewReadings = (device: Iot) => {
        setSelectedDevice(device);
        setOpenReadings(true);
    };

    return (
        <div className="flex flex-col gap-10">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-xl font-semibold">IoT Devices</p>
                    <p className="text-lg text-[#67737C]">
                        Monitor and manage your IoT sensor network
                    </p>
                </div>
                <button
                    className="bg-[#00648E] text-white py-2 px-8 rounded-md hover:bg-[#005273] transition-colors"
                    onClick={() => setOpenModal(true)}
                >
                    <AddIcon /> Add Device
                </button>
            </div>

            {/* Grid de Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <IoTCard
                    title="Total Devices"
                    icon={<MemoryIcon />}
                    value={totalDevices.toString()}
                    description="Registered devices"
                    variant="gray"
                />

                <IoTCard
                    title="Total Online"
                    icon={<WifiIcon />}
                    value={onlineCount.toString()}
                    description={`${onlinePercentage}% operational`}
                    variant="green"
                />

                <IoTCard
                    title="Offline"
                    icon={<WifiOffIcon />}
                    value={offlineCount.toString()}
                    description="Requires attention"
                    variant="red"
                />

                <IoTCard
                    title="Low Battery"
                    icon={<Battery0BarIcon />}
                    value={warningCount.toString()}
                    description="Need replacement"
                    variant="yellow"
                />
            </div>

            {/* Tabla con callback */}
            <TableIoT
                devices={devices}
                onViewReadings={handleViewReadings}
                onAddReading={(device) => {
                    setSelectedDevice(device);
                    setOpenAddReading(true);
                }}
            />

            {/* Modal para crear device */}
            <AddDeviceModal
                open={openModal}
                onClose={() => setOpenModal(false)}
            />

            {/* Modal de readings */}
            <ReadingsModal
                open={openReadings}
                onClose={() => setOpenReadings(false)}
                device={selectedDevice}
            />

            <AddReadingModal
                open={openAddReading}
                onClose={() => setOpenAddReading(false)}
                device={selectedDevice}
            />
        </div>
    );
}
