import { useMemo, useState } from 'react';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import GroupIcon from '@mui/icons-material/Group';
import { AddUserForm } from './AddUserForm';


type TabKey =
    | 'thresholds'
    | 'notifications'
    | 'users'
    | 'devices'
    | 'integrations'
    | 'security';

export function SettingsPage() {
    // Top navigation
    const [activeTab, setActiveTab] = useState<TabKey>('thresholds');
    const [showAddUserForm, setShowAddUserForm] = useState(false);

    // Mock data
    const [temp, setTemp] = useState([
        {
            title: 'Pharmacy Cold Storage A',
            description: '2°C to 8°C',
            min: 2,
            max: 8,
            unit: '°C',
        },
        {
            title: 'Vaccine Storage Unit',
            description: '2°C to 8°C',
            min: 2,
            max: 8,
            unit: '°C',
        },
        {
            title: 'Blood Bank Storage',
            description: '1°C to 6°C',
            min: 1,
            max: 6,
            unit: '°C',
        },
        {
            title: 'Laboratory Refrigerator',
            description: '2°C to 8°C',
            min: 2,
            max: 8,
            unit: '°C',
        },
    ]);

    const [humidity, setHumidity] = useState([
        {
            title: 'Storage Room C',
            description: 'Max 60 %RH',
            min: 0,
            max: 60,
            unit: '%RH',
        },
    ]);

    const [users, setUsers] = useState([
        { firstName: 'Ana', lastName: 'Silva', position: 'Nurse', email: 'ana@hospital.com' },
        { firstName: 'Carlos', lastName: 'Ramos', position: 'Lab Tech', email: 'carlos@hospital.com' },
    ]);

    // Derived options (para selects de ejemplo)
    const locationsTemp = useMemo(
        () => ['Pharmacy Cold Storage A', 'Vaccine Storage Unit', 'Blood Bank Storage', 'Laboratory Refrigerator'],
        []
    );
    const [selectedTempLocation, setSelectedTempLocation] = useState(locationsTemp[0]);

    const locationsHum = useMemo(() => ['Storage Room C', 'Storage Room D', 'Archive A'], []);
    const [selectedHumLocation, setSelectedHumLocation] = useState(locationsHum[0]);

    // Handlers
    const addUser = (newUser: { firstName: string; lastName: string; position: string; email: string }) => {
        setUsers((prev) => [...prev, newUser]);
        setShowAddUserForm(false);
    };

    const updateTemp = (i: number, key: 'min' | 'max', val: number) => {
        setTemp((prev) => prev.map((t, idx) => (idx === i ? { ...t, [key]: val } : t)));
    };

    const updateHum = (i: number, key: 'min' | 'max', val: number) => {
        setHumidity((prev) => prev.map((h, idx) => (idx === i ? { ...h, [key]: val } : h)));
    };

    const saveThresholds = () => {
        console.log('Saving thresholds (mock):', { temp, humidity });
        alert('Thresholds saved (mock)');
    };

    // UI helpers
    const TabButton = ({
        label,
        isActive,
        onClick,
        Icon,
    }: {
        label: string;
        isActive: boolean;
        onClick: () => void;
        Icon?: React.ElementType;
    }) => (
        <button
            onClick={onClick}
            className={[
                'px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2',
                isActive ? 'bg-[#E6F2F7] text-[#00648E]' : 'text-[#4B5563] hover:text-[#00648E] hover:bg-gray-100',
            ].join(' ')}
        >
            {Icon ? <Icon fontSize="small" /> : null}
            {label}
        </button>
    );

    const SectionCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
        <div className={`rounded-xl border border-gray-200 bg-white p-5 shadow-sm ${className || ''}`}>{children}</div>
    );

    const Field = ({
        label,
        children,
    }: {
        label: string;
        children: React.ReactNode;
    }) => (
        <label className="text-xs text-[#67737C] flex flex-col gap-1">
            {label}
            {children}
        </label>
    );

    // Sections
    const renderThresholdsSection = () => (
        <div className="flex flex-col gap-8">
            {/* Temperature Thresholds */}
            <SectionCard>
                <div className="flex items-center gap-2 mb-1">
                    <DeviceThermostatIcon fontSize="small" />
                    <p className="text-base sm:text-lg font-semibold">Temperature Thresholds</p>
                </div>
                <p className="text-sm text-[#67737C] mb-5">
                    Configure temperature limits for different storage areas
                </p>

                {/* Inline form */}
                <div className="flex flex-col lg:flex-row lg:items-end gap-3">
                    <Field label="Location">
                        <select
                            value={selectedTempLocation}
                            onChange={(e) => setSelectedTempLocation(e.target.value)}
                            className="h-10 min-w-[220px] rounded-md border border-gray-300 px-3"
                        >
                            {locationsTemp.map((opt) => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                    </Field>

                    <Field label="Min Temperature (°C)">
                        <input
                            type="number"
                            className="h-10 w-24 rounded-md border border-gray-300 px-3 text-center"
                            value={2}
                            onChange={() => { }}
                        />
                    </Field>

                    <Field label="Max Temperature (°C)">
                        <input
                            type="number"
                            className="h-10 w-24 rounded-md border border-gray-300 px-3 text-center"
                            value={8}
                            onChange={() => { }}
                        />
                    </Field>

                    <div className="flex gap-3 lg:ml-auto">
                        <button className="h-10 px-4 rounded-md bg-[#00648E] text-white text-sm hover:bg-[#005273]">
                            Update Threshold
                        </button>
                        <button className="h-10 px-4 rounded-md border border-gray-300 text-sm hover:bg-gray-50">
                            Add Location
                        </button>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-200 my-5" />

                {/* Current thresholds list */}
                <p className="font-medium mb-3">Current Thresholds</p>
                <div className="flex flex-col gap-3">
                    {temp.map((t, i) => (
                        <div
                            key={t.title + i}
                            className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3"
                        >
                            <div className="min-w-0">
                                <p className="font-medium truncate">{t.title}</p>
                                <p className="text-sm text-[#67737C]">{t.min}°C to {t.max}°C</p>
                            </div>
                            <button className="h-9 px-4 rounded-md border border-gray-300 text-sm hover:bg-gray-50">
                                Edit
                            </button>
                        </div>
                    ))}
                </div>
            </SectionCard>

            {/* Humidity Thresholds */}
            <SectionCard>
                <div className="flex items-center gap-2 mb-1">
                    <OpacityIcon fontSize="small" />
                    <p className="text-base sm:text-lg font-semibold">Humidity Thresholds</p>
                </div>
                <p className="text-sm text-[#67737C] mb-5">
                    Configure humidity limits for storage areas
                </p>

                <div className="flex flex-col lg:flex-row lg:items-end gap-3">
                    <Field label="Location">
                        <select
                            value={selectedHumLocation}
                            onChange={(e) => setSelectedHumLocation(e.target.value)}
                            className="h-10 min-w-[220px] rounded-md border border-gray-300 px-3"
                        >
                            {locationsHum.map((opt) => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                    </Field>

                    <Field label="Max Humidity (%RH)">
                        <input
                            type="number"
                            className="h-10 w-28 rounded-md border border-gray-300 px-3 text-center"
                            value={humidity[0].max}
                            onChange={(e) => updateHum(0, 'max', Number(e.target.value))}
                        />
                    </Field>

                    <div className="lg:ml-auto">
                        <button className="h-10 px-6 rounded-md bg-[#00648E] text-white text-sm hover:bg-[#005273]">
                            Update
                        </button>
                    </div>
                </div>
            </SectionCard>

            {/* Save */}
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

    const renderUsersSection = () => (
        <div className="flex flex-col gap-6">
            <SectionCard>
                <div className="flex items-center gap-2 mb-1">
                    <GroupIcon fontSize="small" />
                    <p className="text-base sm:text-lg font-semibold">Users</p>
                </div>
                <p className="text-sm text-[#67737C] mb-4">Manage users (mock data)</p>

                {!showAddUserForm ? (
                    <div className="flex justify-end">
                        <button
                            onClick={() => setShowAddUserForm(true)}
                            className="h-10 px-6 rounded-md bg-[#00648E] text-white text-sm hover:bg-[#005273]"
                        >
                            Add User
                        </button>
                    </div>
                ) : (
                    <div className="mb-4">
                        <AddUserForm onAddUser={addUser} onCancel={() => setShowAddUserForm(false)} />
                    </div>
                )}

                <div className="rounded-lg border border-gray-200 divide-y">
                    {users.length === 0 ? (
                        <p className="text-sm text-[#67737C] text-center py-6">No users found</p>
                    ) : (
                        users.map((u, idx) => (
                            <div key={`${u.email}-${idx}`} className="flex items-center justify-between px-4 py-3">
                                <div className="min-w-0">
                                    <p className="font-medium truncate">
                                        {u.firstName} {u.lastName}
                                    </p>
                                    <p className="text-sm text-[#67737C]">{u.position}</p>
                                </div>
                                <p className="text-sm text-[#67737C]">{u.email}</p>
                            </div>
                        ))
                    )}
                </div>
            </SectionCard>
        </div>
    );

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div>
                <p className="text-2xl font-semibold">Settings</p>
                <p className="text-base text-[#67737C]">
                    Configure system preferences, thresholds, and integrations
                </p>
            </div>

            {/* Tabs nav (pill style) */}
            <div className="flex flex-wrap gap-2 rounded-xl bg-[#F5F7F9] p-2">
                <TabButton label="Thresholds" isActive={activeTab === 'thresholds'} onClick={() => setActiveTab('thresholds')} Icon={SettingsInputComponentIcon} />
                <TabButton label="Notifications" isActive={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} Icon={NotificationsNoneIcon} />
                <TabButton label="Users" isActive={activeTab === 'users'} onClick={() => setActiveTab('users')} Icon={GroupIcon} />
                <TabButton label="Devices" isActive={activeTab === 'devices'} onClick={() => setActiveTab('devices')} Icon={ElectricalServicesIcon} />
                <TabButton label="Integrations" isActive={activeTab === 'integrations'} onClick={() => setActiveTab('integrations')} Icon={SettingsInputComponentIcon} />
                <TabButton label="Security" isActive={activeTab === 'security'} onClick={() => setActiveTab('security')} Icon={SecurityIcon} />
            </div>

            {/* Content */}
            <div className="mt-2">
                {activeTab === 'thresholds' && renderThresholdsSection()}
                {activeTab === 'users' && renderUsersSection()}
                {activeTab !== 'thresholds' && activeTab !== 'users' && (
                    <SectionCard>
                        <p className="text-sm text-[#67737C]">
                            This section is a placeholder in the mock. Use “Thresholds” or “Users” to see content.
                        </p>
                    </SectionCard>
                )}
            </div>
        </div>
    );
}

export default SettingsPage;
