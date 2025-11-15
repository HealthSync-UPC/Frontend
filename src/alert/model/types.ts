export type Severity = 'Critical' | 'Warning';
export type Status = 'Active' | 'Acknowledged' | 'Closed';

export type AlertRow = {
    id: string;
    type: string;
    severity: Severity;
    status: Status;
    location: string;
};

export type AlertFilters = {
    query: string;
    status: 'all' | 'active' | 'ack' | 'closed';
    severity: 'all' | 'critical' | 'warning';
};
