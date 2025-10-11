import AddIcon from '@mui/icons-material/Add';
import Battery0BarIcon from '@mui/icons-material/Battery0Bar';
import MemoryIcon from "@mui/icons-material/Memory";
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import { IoTCard } from "../components/IoTCard";
import { TableIoT } from "../components/TableIoT";

export function IoTPage() {
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
                <button className="bg-[#00648E] text-white py-2 px-8 rounded-md hover:bg-[#005273] transition-colors">
                    <AddIcon /> Add Device
                </button>
            </div>

            {/* Grid de Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <IoTCard
                    title="Total Devices"
                    icon={<MemoryIcon />}
                    value="5"
                    description="Registered devices"
                    variant="gray"
                />

                <IoTCard
                    title="Total Online"
                    icon={<WifiIcon />}
                    value="3"
                    description="60% operational"
                    variant="green"
                />

                <IoTCard
                    title="Offline"
                    icon={<WifiOffIcon />}
                    value="1"
                    description="Requires attention"
                    variant="red"
                />

                <IoTCard
                    title="Low Battery"
                    icon={<Battery0BarIcon />}
                    value="1"
                    description="Need replacement"
                    variant="yellow"
                />
            </div>
            <TableIoT />
        </div>
    );
}
