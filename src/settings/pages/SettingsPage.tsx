import { useState } from 'react';
import { Navbar, type TabKey } from '../components/navbar/Navbar';
import { UsersSection } from '../components/users/UsersSection';
import { ThresholdsSection } from '../components/thresholds/ThresholdsSection';


export default function SettingsPage() {
    const [active, setActive] = useState<TabKey>('thresholds');

    return (
        <div className="flex flex-col gap-6">
            <div>
                <p className="text-2xl font-semibold">Settings</p>
                <p className="text-base text-[#67737C]">
                    Configure system preferences, thresholds, and integrations
                </p>
            </div>

            <Navbar active={active} onChange={setActive} />

            <div className="mt-2">
                {active === 'thresholds' ? <ThresholdsSection /> : <UsersSection />}
            </div>
        </div>
    );
}
