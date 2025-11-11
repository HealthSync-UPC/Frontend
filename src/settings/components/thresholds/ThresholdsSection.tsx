import { useEffect, useState } from 'react';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import { SectionCard } from '../navbar/ui';

// Ubicaciones iniciales
const INITIAL_TEMP = [
    { title: 'Pharmacy Cold Storage A', min: 2, max: 8, unit: '°C' },
    { title: 'Vaccine Storage Unit', min: 2, max: 8, unit: '°C' },
    { title: 'Blood Bank Storage', min: 1, max: 6, unit: '°C' },
    { title: 'Laboratory Refrigerator', min: 2, max: 8, unit: '°C' },
];

export function ThresholdsSection() {
    // ---- Temperature state ----
    const [temp, setTemp] = useState(INITIAL_TEMP);
    const [selectedTemp, setSelectedTemp] = useState<string>(temp[0].title);

    // Form temporal para la ubicación seleccionada
    const [tempForm, setTempForm] = useState<{ min: number; max: number }>({
        min: temp[0].min,
        max: temp[0].max,
    });

    // Cuando cambia la selección, precargar el form
    useEffect(() => {
        const current = temp.find((t) => t.title === selectedTemp);
        if (current) setTempForm({ min: current.min, max: current.max });
    }, [selectedTemp, temp]);

    // Add Location (toggle + form)
    const [showAddLoc, setShowAddLoc] = useState(false);
    const [newLoc, setNewLoc] = useState<{ title: string; min: number | ''; max: number | '' }>({
        title: '',
        min: '',
        max: '',
    });

    const handleUpdateThreshold = () => {
        if (Number.isNaN(tempForm.min) || Number.isNaN(tempForm.max)) return;
        if (tempForm.min > tempForm.max) {
            alert('Min cannot be greater than Max');
            return;
        }
        setTemp((prev) =>
            prev.map((t) =>
                t.title === selectedTemp ? { ...t, min: tempForm.min, max: tempForm.max } : t
            )
        );
        alert('Temperature threshold updated (mock)');
    };

    const handleAddLocation = () => {
        const title = newLoc.title.trim();
        const min = Number(newLoc.min);
        const max = Number(newLoc.max);

        if (!title) {
            alert('Please enter a location name');
            return;
        }
        if (Number.isNaN(min) || Number.isNaN(max)) {
            alert('Please enter numeric min/max');
            return;
        }
        if (min > max) {
            alert('Min cannot be greater than Max');
            return;
        }
        if (temp.some((t) => t.title.toLowerCase() === title.toLowerCase())) {
            alert('Location already exists');
            return;
        }

        const created = { title, min, max, unit: '°C' as const };
        setTemp((prev) => [...prev, created]);
        setSelectedTemp(created.title);
        setTempForm({ min, max });

        // limpiar y cerrar el form
        setNewLoc({ title: '', min: '', max: '' });
        setShowAddLoc(false);

        alert('Location added (mock)');
    };

    // ---- Humidity state ----
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
                <p className="text-sm text-[#67737C] mb-5">
                    Configure temperature limits for different storage areas
                </p>

                <div className="flex flex-col lg:flex-row lg:items-end gap-3">
                    <label className="text-xs text-[#67737C] flex flex-col gap-1">
                        Location
                        <select
                            value={selectedTemp}
                            onChange={(e) => setSelectedTemp(e.target.value)}
                            className="h-10 min-w-[220px] rounded-md border border-gray-300 px-3"
                        >
                            {temp.map((opt) => (
                                <option key={opt.title} value={opt.title}>
                                    {opt.title}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="text-xs text-[#67737C] flex flex-col gap-1">
                        Min Temperature (°C)
                        <input
                            type="number"
                            className="h-10 w-24 rounded-md border border-gray-300 px-3 text-center"
                            value={tempForm.min}
                            onChange={(e) => setTempForm((f) => ({ ...f, min: Number(e.target.value) }))}
                        />
                    </label>

                    <label className="text-xs text-[#67737C] flex flex-col gap-1">
                        Max Temperature (°C)
                        <input
                            type="number"
                            className="h-10 w-24 rounded-md border border-gray-300 px-3 text-center"
                            value={tempForm.max}
                            onChange={(e) => setTempForm((f) => ({ ...f, max: Number(e.target.value) }))}
                        />
                    </label>

                    <div className="flex gap-3 lg:ml-auto">
                        <button
                            onClick={handleUpdateThreshold}
                            className="h-10 px-4 rounded-md bg-[#00648E] text-white text-sm hover:bg-[#005273]"
                        >
                            Update Threshold
                        </button>
                        <button
                            onClick={() => setShowAddLoc((v) => !v)}
                            className="h-10 px-4 rounded-md border border-gray-300 text-sm hover:bg-gray-50"
                        >
                            {showAddLoc ? 'Cancel' : 'Add Location'}
                        </button>
                    </div>
                </div>

                {/* Inline Add Location form */}
                {showAddLoc && (
                    <div className="mt-4 rounded-lg border border-gray-200 p-3 bg-gray-50">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <label className="text-xs text-[#67737C] flex flex-col gap-1">
                                Location Name
                                <input
                                    className="h-10 rounded-md border border-gray-300 px-3"
                                    placeholder="e.g., Pharmacy Cold Storage B"
                                    value={newLoc.title}
                                    onChange={(e) => setNewLoc((s) => ({ ...s, title: e.target.value }))}
                                />
                            </label>
                            <label className="text-xs text-[#67737C] flex flex-col gap-1">
                                Min (°C)
                                <input
                                    type="number"
                                    className="h-10 rounded-md border border-gray-300 px-3"
                                    value={newLoc.min}
                                    onChange={(e) => setNewLoc((s) => ({ ...s, min: Number(e.target.value) }))}
                                />
                            </label>
                            <label className="text-xs text-[#67737C] flex flex-col gap-1">
                                Max (°C)
                                <input
                                    type="number"
                                    className="h-10 rounded-md border border-gray-300 px-3"
                                    value={newLoc.max}
                                    onChange={(e) => setNewLoc((s) => ({ ...s, max: Number(e.target.value) }))}
                                />
                            </label>
                        </div>
                        <div className="flex justify-end mt-3">
                            <button
                                onClick={handleAddLocation}
                                className="h-9 px-4 rounded-md bg-[#00648E] text-white text-sm hover:bg-[#005273]"
                            >
                                Save Location
                            </button>
                        </div>
                    </div>
                )}

                <div className="h-px bg-gray-200 my-5" />

                <p className="font-medium mb-3">Current Thresholds</p>
                <div className="flex flex-col gap-3">
                    {temp.map((t) => (
                        <div
                            key={t.title}
                            className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3"
                        >
                            <div className="min-w-0">
                                <p className="font-medium truncate">{t.title}</p>
                                <p className="text-sm text-[#67737C]">
                                    {t.min}°C to {t.max}°C
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedTemp(t.title)}
                                className="h-9 px-4 rounded-md border border-gray-300 text-sm hover:bg-gray-50"
                            >
                                Edit
                            </button>
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
                            {['Storage Room C', 'Storage Room D', 'Archive A'].map((opt) => (
                                <option key={opt}>{opt}</option>
                            ))}
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
                        <button className="h-10 px-6 rounded-md bg-[#00648E] text-white text-sm hover:bg-[#005273]">
                            Update
                        </button>
                    </div>
                </div>
            </SectionCard>

            <div className="flex justify-end">
                <button
                    onClick={saveThresholds}
                    className="h-10 px-8 rounded-md bg-[#00648E] text-white text-sm hover:bg-[#005273]"
                >
                    Save Thresholds (mock)
                </button>
            </div>
        </div>
    );
}
