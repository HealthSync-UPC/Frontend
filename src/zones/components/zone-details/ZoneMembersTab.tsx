import { useGlobalStore } from '../../../shared/stores/globalstore';
import type { Member } from '../../model/member';
import { useZoneStore } from '../../stores/zone-store';


export function ZoneMembersTab() {
    const { removeMemberFromZone } = useGlobalStore();
    const { selectedZone, setSelectedZone } = useZoneStore();
    const members = selectedZone?.members || [];

    if (members.length === 0) {
        return (
            <div className="p-4 text-sm text-gray-500">
                No members assigned to this zone yet.
            </div>
        );
    }

    const handleRemoveMember = async (member: Member) => {
        const updatedZone = await removeMemberFromZone(selectedZone!!, member);
        setSelectedZone(updatedZone!!);
    }

    return (
        <div className="space-y-4 p-4">
            {members.map((m) => (
                <div
                    key={m.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3"
                >
                    <div className="flex items-center gap-3">
                        <div>
                            <p className="font-medium">{m.name}</p>
                        </div>
                    </div>
                    <button onClick={() => handleRemoveMember(m)} className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50">
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );
}
