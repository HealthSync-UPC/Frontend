import { useMemo, useState } from 'react';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import { SectionCard } from '../navbar/ui';


export function ThresholdsSection() {
    const [temp] = useState([
        { title: 'Pharmacy Cold Storage A', min: 2, max: 8, unit: '°C' },
        { title: 'Vaccine Storage Unit', min: 2, max: 8, unit: '°C' },
        { title: 'Blood Bank Storage', min: 1, max: 6, unit: '°C' },
        { title: 'Laboratory Refrigerator', min: 2, max: 8, unit: '°C' },
    ]);

    const locationsTemp = useMemo(
        () => ['Pharmacy Cold Storage A', 'Vaccine Storage Unit', 'Blood Bank Storage', 'Laboratory Refrigerator'],
        []
    );
    const [selectedTemp, setSelectedTemp] = useState(locationsTemp[0]);

    const [humidity, setHumidity] = useState([{ title: 'Storage Room C', max: 60, unit: '%RH' }]);
    const [selectedHum, setSelectedHum] = useState('Storage Room C');

    const updateHum = (i: number, val: number) =>
        setHumidity((prev) => prev.map((h, idx) => (idx === i ? { ...h, max: val } : h)));

    const saveThresholds = () => {
        console.log('Saving thresholds (mock):', { temp, humidity });
        alert('Thresholds saved (mock)');
    };

    return (
        <div className="flex flex-col gap-8">
            {/* Temperature */}
            <SectionCard>
                <div className="flex items-center gap-2 mb-1">
                    <DeviceThermostatIcon fontSize="small" />
                    <p className="text-base sm:text-lg font-semibold">Temperature Thresholds</p>
                </div>
                <p className="text-sm text-[#67737C] mb-5">Configure temperature limits for different storage areas</p>

                <div className="flex flex-col lg:flex-row lg:items-end gap-3">
                    <label className="text-xs text-[#67737C] flex flex-col gap-1">
                        Location
                        <select
                            value={selectedTemp}
                            onChange={(e) => setSelectedTemp(e.target.value)}
                            className="h-10 min-w-[220px] rounded-md border border-gray-300 px-3"
                        >
                            {locationsTemp.map((opt) => <option key={opt}>{opt}</option>)}
                        </select>
                    </label>

                    <label className="text-xs text-[#67737C] flex flex-col gap-1">
                        Min Temperature (°C)
                        <input className="h-10 w-24 rounded-md border border-gray-300 px-3 text-center" defaultValue={2} />
                    </label>

                    <label className="text-xs text-[#67737C] flex flex-col gap-1">
                        Max Temperature (°C)
                        <input className="h-10 w-24 rounded-md border border-gray-300 px-3 text-center" defaultValue={8} />
                    </label>

                    <div className="flex gap-3 lg:ml-auto">
                        <button className="h-10 px-4 rounded-md bg-[#00648E] text-white text-sm hover:bg-[#005273]">Update Threshold</button>
                        <button className="h-10 px-4 rounded-md border border-gray-300 text-sm hover:bg-gray-50">Add Location</button>
                    </div>
                </div>

                <div className="h-px bg-gray-200 my-5" />

                <p className="font-medium mb-3">Current Thresholds</p>
                <div className="flex flex-col gap-3">
                    {temp.map((t, i) => (
                        <div key={t.title + i} className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3">
                            <div className="min-w-0">
                                <p className="font-medium truncate">{t.title}</p>
                                <p className="text-sm text-[#67737C]">{t.min}°C to {t.max}°C</p>
                            </div>
                            <button className="h-9 px-4 rounded-md border border-gray-300 text-sm hover:bg-gray-50">Edit</button>
                        </div>
                    ))}
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
                            value={selectedHum}
                            onChange={(e) => setSelectedHum(e.target.value)}
                            className="h-10 min-w-[220px] rounded-md border border-gray-300 px-3"
                        >
                            {['Storage Room C', 'Storage Room D', 'Archive A'].map((opt) => <option key={opt}>{opt}</option>)}
                        </select>
                    </label>

                    <label className="text-xs text-[#67737C] flex flex-col gap-1">
                        Max Humidity (%RH)
                        <input
                            type="number"
                            className="h-10 w-28 rounded-md border border-gray-300 px-3 text-center"
                            value={humidity[0].max}
                            onChange={(e) => updateHum(0, Number(e.target.value))}
                        />
                    </label>

                    <div className="lg:ml-auto">
                        <button className="h-10 px-6 rounded-md bg-[#00648E] text-white text-sm hover:bg-[#005273]">Update</button>
                    </div>
                </div>
            </SectionCard>

            <div className="flex justify-end">
                <button onClick={saveThresholds} className="h-10 px-8 rounded-md bg-[#00648E] text-white text-sm hover:bg-[#005273]">
                    Save Thresholds (mock)
                </button>
            </div>
        </div>
    );
}
