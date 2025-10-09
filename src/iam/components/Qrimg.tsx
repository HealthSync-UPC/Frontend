import { useGlobalStore } from "../../shared/stores/globalstore";
import { CodeAuth } from "./CodeAuth";

export function Qrimg() {
    const { qrCode } = useGlobalStore(); // base64 del QR

    return (
        <div className="flex flex-col gap-3 items-center">
            <img src={qrCode} alt="QR Code" className="w-65 h-65" />
            <CodeAuth></CodeAuth>
        </div>
    );
}
