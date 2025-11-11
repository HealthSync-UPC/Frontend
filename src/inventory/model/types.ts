export type Category =
    | 'Medications'
    | 'Vaccines'
    | 'Blood Products'
    | 'PPE';

export type Location =
    | 'Pharmacy Cold Storage A'
    | 'Laboratory Refrigerator'
    | 'Storage Room C'
    | 'Blood Bank Storage';

export type UnitLabel = 'vials' | 'doses' | 'units' | 'pieces' | 'boxes';

export type InventoryItem = {
    id: string;            // INV-001
    name: string;          // Insulin Humalog
    category: Category;
    batch: string;         // HUM2024-A
    expiryDate: string;    // 2024-11-15
    quantity: number;      // 45
    unitLabel: UnitLabel;  // 'vials'
    location: Location;
    supplier?: string;
};

export type TabKey = 'all' | '30d' | '7d' | 'expired';

export type Filters = {
    query: string;
    category: 'All' | Category;
    location: 'All' | Location;
};

