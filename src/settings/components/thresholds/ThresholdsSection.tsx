import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import { useGlobalStore } from '../../../shared/stores/globalstore';
import type { Zone } from '../../../zones/model/zone';
import { SectionCard } from '../navbar/ui';

export function ThresholdsSection() {
    const { zones, updateZoneTemperature, updateZoneHumidity, getZones } = useGlobalStore();

    const [selectedZoneTemp, setSelectedZoneTemp] = useState<Zone | null>(null);
    const [selectedZoneHum, setSelectedZoneHum] = useState<Zone | null>(null);
    const [thresholdPage, setThresholdPage] = useState(1);
    const thresholdPageSize = 5;

    useEffect(() => {
        getZones();
    }, []);

    useEffect(() => {
        if (zones.length > 0) {
            setSelectedZoneTemp(zones[0]);
            setSelectedZoneHum(zones[0]);
        }
    }, [zones]);

    return (
        <div className="flex flex-col gap-8">

            <div className='flex w-full justify-between'>
                {/* Temperature */}
                <SectionCard>
                    <div className="flex items-center gap-2 mb-1">
                        <DeviceThermostatIcon fontSize="small" />
                        <p className="text-base sm:text-lg font-semibold">Temperature Thresholds</p>
                    </div>
                    <p className="text-sm text-[#67737C] mb-5">
                        Configure temperature limits for different storage areas
                    </p>

                    <div className="flex flex-col lg:flex-row lg:items-end gap-3">
                        <label className="text-xs text-[#67737C] flex flex-col gap-1">
                            Location
                            <select
                                value={selectedZoneTemp?.name || ""}
                                onChange={(e) => {
                                    const selected = zones.find((t) => t.name === e.target.value);
                                    if (selected) setSelectedZoneTemp(selected);
                                }}
                                className="h-10 min-w-[220px] rounded-md border border-gray-300 px-3"
                            >
                                {zones.map((opt) => (
                                    <option key={opt.id} value={opt.name}>
                                        {opt.name}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="text-xs text-[#67737C] flex flex-col gap-1">
                            Min Temperature (°C)
                            <input
                                type="number"
                                className="h-10 w-24 rounded-md border border-gray-300 px-3 text-center"
                                value={selectedZoneTemp?.minTemperature ?? ""}
                                onChange={(e) =>
                                    setSelectedZoneTemp((z) => (z ? { ...z, minTemperature: Number(e.target.value) } : z))
                                }
                            />
                        </label>

                        <label className="text-xs text-[#67737C] flex flex-col gap-1">
                            Max Temperature (°C)
                            <input
                                type="number"
                                className="h-10 w-24 rounded-md border border-gray-300 px-3 text-center"
                                value={selectedZoneTemp?.maxTemperature ?? ""}
                                onChange={(e) =>
                                    setSelectedZoneTemp((z) => (z ? { ...z, maxTemperature: Number(e.target.value) } : z))
                                }
                            />
                        </label>

                        <div className="flex gap-3 lg:ml-auto">
                            <button
                                onClick={() => selectedZoneTemp && updateZoneTemperature(selectedZoneTemp)}
                                className="h-10 px-4 rounded-md bg-[#00648E] text-white text-sm hover:bg-[#005273]"
                            >
                                Update Threshold
                            </button>
                        </div>
                    </div>
                </SectionCard>

                {/* Humidity */}
                <SectionCard>
                    <div className="flex items-center gap-2 mb-1">
                        <OpacityIcon fontSize="small" />
                        <p className="text-base sm:text-lg font-semibold">Humidity Thresholds</p>
                    </div>
                    <p className="text-sm text-[#67737C] mb-5">Configure humidity limits for storage areas</p>

                    <div className="flex flex-col lg:flex-row lg:items-end gap-3">
                        <label className="text-xs text-[#67737C] flex flex-col gap-1">
                            Location
                            <select
                                value={selectedZoneHum?.name || ""}
                                onChange={(e) => {
                                    const selected = zones.find((t) => t.name === e.target.value);
                                    if (selected) setSelectedZoneHum(selected);
                                }}
                                className="h-10 min-w-[220px] rounded-md border border-gray-300 px-3"
                            >
                                {zones.map((opt) => (
                                    <option key={opt.id} value={opt.name}>
                                        {opt.name}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="text-xs text-[#67737C] flex flex-col gap-1">
                            Min Humidity (%RH)
                            <input
                                type="number"
                                className="h-10 w-28 rounded-md border border-gray-300 px-3 text-center"
                                value={selectedZoneHum?.minHumidity ?? ""}
                                onChange={(e) =>
                                    setSelectedZoneHum((z) => (z ? { ...z, minHumidity: Number(e.target.value) } : z))
                                }
                            />
                        </label>

                        <label className="text-xs text-[#67737C] flex flex-col gap-1">
                            Max Humidity (%RH)
                            <input
                                type="number"
                                className="h-10 w-28 rounded-md border border-gray-300 px-3 text-center"
                                value={selectedZoneHum?.maxHumidity ?? ""}
                                onChange={(e) =>
                                    setSelectedZoneHum((z) => (z ? { ...z, maxHumidity: Number(e.target.value) } : z))
                                }
                            />
                        </label>

                        <div className="lg:ml-auto">
                            <button
                                onClick={() => selectedZoneHum && updateZoneHumidity(selectedZoneHum)}
                                className="h-10 px-6 rounded-md bg-[#00648E] text-white text-sm hover:bg-[#005273]"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </SectionCard>
            </div>

            <div>
                <p className="font-medium mb-3">Current Thresholds</p>
                <div className="flex flex-col gap-3">
                    {zones.length === 0 && (
                        <p className="text-sm text-gray-500">No zones configured</p>
                    )}

                    <div className="h-110 overflow-y-auto flex flex-col gap-5">
                        {(zones.length > 0) && (
                            zones
                                .slice((thresholdPage - 1) * thresholdPageSize, thresholdPage * thresholdPageSize)
                                .map((t) => (
                                    <div
                                        key={t.id}
                                        className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3"
                                    >
                                        <div className="min-w-0">
                                            <p className="font-medium truncate">{t.name}</p>
                                            <p className="text-sm text-[#67737C]">
                                                Temperature : {t.minTemperature}°C – {t.maxTemperature}°C | Humidity : {t.minHumidity}% – {t.maxHumidity}%
                                            </p>
                                        </div>
                                    </div>
                                ))
                        )}
                    </div>

                    <div className="mt-3 flex justify-center">
                        <Pagination count={Math.max(1, Math.ceil(zones.length / thresholdPageSize))} page={thresholdPage} onChange={(_, value) => setThresholdPage(value)} />
                    </div>
                </div>
            </div>

        </div>
    );
}