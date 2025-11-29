import type { Alert } from "../../alert/model/alert";
import type { AccessLog } from "../../zones/model/access-log";

export interface WSMessage<T = unknown> {
    type: "alert" | "access";
    payload: T;
}


export type WSIncoming =
    | WSMessage<Alert>
    | WSMessage<AccessLog>;
