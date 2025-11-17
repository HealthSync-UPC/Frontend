/* import { useGlobalStore } from '../../shared/stores/globalstore'; */
import type { Member } from '../model/member';
import type { Zone } from '../model/zone';

type Props = {
    zone: Zone;
    members: Member[];
};

export function ZoneMembersTab({ zone, members }: Props) {
    /* const { removeMemberFromZone } = useGlobalStore(); */
    if (members.length === 0) {
        return (
            <div className="p-4 text-sm text-gray-500">
                No members assigned to this zone yet.
            </div>
        );
    }

    const handleRemoveMember = async (member: Member) => {
        console.log('Remove member from zone', member, zone);
        /*  alert('Member removed (mock)');
         await removeMemberFromZone(zone, member); */
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
