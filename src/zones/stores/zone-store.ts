import { create } from "zustand";
import { Zone } from "../model/zone";
import { immer } from "zustand/middleware/immer";
import { zonesService } from "../services/zones-services";

interface ZoneStore {
    selectedZone: Zone | null;
    setSelectedZone: (zone: Zone | null) => void;
    getZoneById: (id: number) => Promise<Zone | null>;
}

export const useZoneStore = create(immer<ZoneStore>((set) => ({
    selectedZone: null,
    setSelectedZone: (zone) => set((state) => {
        state.selectedZone = zone;
    }),
    getZoneById: async (id: number) => {
        const response = await zonesService.getZoneById(id);

        if (response.status === 200) {
            return response.data;
        }

        return null;
    }
})));