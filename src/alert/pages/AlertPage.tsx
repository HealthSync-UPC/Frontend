import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useEffect, useState } from 'react';
import { useGlobalStore } from '../../shared/stores/globalstore';
import { ActiveAlertsCard } from '../components/ActiveAlertsCard';
import { Alert } from '../model/alert';

export function AlertPage() {
    const { zones, socket, addAlert } = useGlobalStore();
    const [typeFilter, setTypeFilter] = useState<string>('all');
    const [locationFilter, setLocationFilter] = useState<string>('all');

    useEffect(() => {
        socket?.on("alert", (data: Alert) => {
            console.log("Nuevo evento recibido:", data);
            const newAlert = new Alert(data.id, data.type, data.zoneId, data.location, new Date(data.registeredAt));
            addAlert(newAlert);
        });

        return () => {
            socket?.off("alert");
        };
    }, [socket]);

    return (
        <div className="flex flex-col gap-10">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-2xl font-semibold">Alerts</p>
                    <p className="text-base text-[#67737C]">Monitor and manage system alerts and notifications</p>
                </div>
            </div>

            {/* Filters */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm flex ">
                <div className="flex items-center gap-2 flex-1">
                    <FilterListIcon fontSize="small" />
                    <p className="text-base sm:text-lg font-semibold">Filters</p>
                </div>

                <div className="flex flex-col justify-end md:flex-row gap-5 flex-1">
                    {/* Type select */}
                    <div className="relative md:w-1/4">
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="h-10 w-full appearance-none rounded-md border border-gray-300 px-3 text-sm text-gray-700"
                        >
                            <option value="all">All Type</option>
                            <option value="LOW_HUMIDITY">Low Humidity</option>
                            <option value="HIGH_HUMIDITY">High Humidity</option>
                            <option value="HIGH_TEMPERATURE">High Temperature</option>
                            <option value="LOW_TEMPERATURE">Low Temperature</option>
                        </select>
                        <ExpandMoreIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>

                    {/* Location select (zones from store) */}
                    <div className="relative md:w-1/4">
                        <select
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                            className="h-10 w-full appearance-none rounded-md border border-gray-300 px-3 text-sm text-gray-700"
                        >
                            <option value="all">All Locations</option>
                            {zones?.map(z => (
                                <option key={z.id} value={z.name}>{z.name}</option>
                            ))}
                        </select>
                        <ExpandMoreIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Active Alerts (card separada) */}
            <ActiveAlertsCard typeFilter={typeFilter} locationFilter={locationFilter} />
        </div>
    );
}

export default AlertPage;
