import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';

export function TableIoT() {
    return (
        <Card className="shadow-none border rounded-2xl bg-[#F9FCFF] border-[#DFE6EB]">
            <CardContent>
                <div className="flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex flex-col justify-between items-start text-[#67737C]">
                        <p className="text-lg font-medium text-[#040C13]">Device Network Status</p>
                        <p>Real-time status of all registered IoT devices</p>
                    </div>

                    {/* Table */}
                    <div className="text-[#040C13] text-sm">
                        {/* Column titles */}
                        <div className="flex justify-between font-medium border-b border-[#DFE6EB] pb-2 text-[#67737C]">
                            <span className="w-[20%]">Device ID</span>
                            <span className="w-[35%]">Name</span>
                            <span className="w-[20%]">Type</span>
                            <span className="w-[25%] text-right">Status</span>
                        </div>

                        {/* Device rows */}
                        <div className="divide-y divide-[#DFE6EB] mt-2">

                            {/*  
                           tabla 1
                            <div className="flex justify-between items-center py-4">
                                <span className="w-[20%] font-semibold">TEMP-001</span>
                                <div className="w-[35%] flex flex-col">
                                    <span>Cold Storage A Monitor</span>
                                    <span className="text-[#67737C] text-xs">v2.1.4</span>
                                </div>
                                <div className="w-[20%] border border-[#DFE6EB] rounded-lg px-3 py-1 text-center">
                                    Temperature
                                </div>
                                <div className="w-[25%] flex items-center justify-end gap-2">
                                    <WifiIcon className="text-[#00C950]" />
                                    <div className="bg-[#DCFCE7] rounded-lg px-3 py-1 text-[#016630] text-xs font-medium">
                                        Online
                                    </div>
                                </div>
                            </div>

                            tabla 2
                            <div className="flex justify-between items-center py-4">
                                <span className="w-[20%] font-semibold">HUM-002</span>
                                <div className="w-[35%] flex flex-col">
                                    <span>Storage Room Humidity Sensor</span>
                                    <span className="text-[#67737C] text-xs">v1.8.2</span>
                                </div>
                                <div className="w-[20%] border border-[#DFE6EB] rounded-lg px-3 py-1 text-center">
                                    Humidity
                                </div>
                                <div className="w-[25%] flex items-center justify-end gap-2">
                                    <WifiIcon className="text-[#00C950]" />
                                    <div className="bg-[#DCFCE7] rounded-lg px-3 py-1 text-[#016630] text-xs font-medium">
                                        Online
                                    </div>
                                </div>
                            </div>

                          tabla 3
                            <div className="flex justify-between items-center py-4">
                                <span className="w-[20%] font-semibold">DOOR-003</span>
                                <div className="w-[35%] flex flex-col">
                                    <span>Laboratory Fridge Door Monitor</span>
                                    <span className="text-[#67737C] text-xs">v1.5.1</span>
                                </div>
                                <div className="w-[20%] border border-[#DFE6EB] rounded-lg px-3 py-1 text-center">
                                    Door
                                </div>
                                <div className="w-[25%] flex items-center justify-end gap-2">
                                    <WifiIcon className="text-[#FACC15]" />
                                    <div className="bg-[#FEF9C3] rounded-lg px-3 py-1 text-[#854D0E] text-xs font-medium">
                                        Warning
                                    </div>
                                </div>
                            </div>

                           tabla 4
                            <div className="flex justify-between items-center py-4">
                                <span className="w-[20%] font-semibold">PWR-004</span>
                                <div className="w-[35%] flex flex-col">
                                    <span>Blood Bank Power Monitor</span>
                                    <span className="text-[#67737C] text-xs">v2.0.3</span>
                                </div>
                                <div className="w-[20%] border border-[#DFE6EB] rounded-lg px-3 py-1 text-center">
                                    Power
                                </div>
                                <div className="w-[25%] flex items-center justify-end gap-2">
                                    <WifiIcon className="text-[#00C950]" />
                                    <div className="bg-[#DCFCE7] rounded-lg px-3 py-1 text-[#016630] text-xs font-medium">
                                        Online
                                    </div>
                                </div>
                            </div>

                          tabla 5
                            <div className="flex justify-between items-center py-4">
                                <span className="w-[20%] font-semibold">MULTI-005</span>
                                <div className="w-[35%] flex flex-col">
                                    <span>Vaccine Storage Multi-Sensor</span>
                                    <span className="text-[#67737C] text-xs">v2.2.1</span>
                                </div>
                                <div className="w-[20%] border border-[#DFE6EB] rounded-lg px-3 py-1 text-center">
                                    Multi
                                </div>
                                <div className="w-[25%] flex items-center justify-end gap-2">
                                    <WifiOffIcon className="text-[#DC2626]" />
                                    <div className="bg-[#FEE2E2] rounded-lg px-3 py-1 text-[#B91C1C] text-xs font-medium">
                                        Offline
                                    </div>
                                </div>
                            </div> 
                            */}

                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
