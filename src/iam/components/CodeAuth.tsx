import { useState } from "react";
import { useGlobalStore } from "../../shared/stores/globalstore";
import { useNavigate } from "react-router";

export function CodeAuth() {
    const { verifyCode } = useGlobalStore(); // base64 del QR
    const [code, setCode] = useState<number | null>(null); // código TOTP
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.slice(0, 6); // máximo 6 dígitos
        if (value === "") setCode(null);
        else setCode(Number(value));
    };

    const handleVerify = async () => {
        const isValid = await verifyCode(code!);

        if (isValid)
            navigate("/dashboard");
    }

    return (
        <div className="flex flex-col gap-3 items-center">

            <input
                type="number"
                value={code ?? ""}
                placeholder="XXX-XXX"
                onChange={handleChange}
                className="bg-[#e4e8ea] rounded-md py-2 px-2 text-center"
                inputMode="numeric"
            />

            <button
                onClick={handleVerify}
                className="bg-[#00648E] text-white py-2 px-4 rounded-md hover:bg-[#005473]"
                disabled={code === null}
            >
                Verificar código
            </button>
        </div>
    );
}
