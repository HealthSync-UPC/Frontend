import { useNavigate } from "react-router";
import { useGlobalStore } from "../../shared/stores/globalstore";

export function LoginForm() {
    const navigator = useNavigate();
    const { user, setUser, login } = useGlobalStore();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await login();
        if (success) {
            navigator("/verify");
        }
    }
    return (
        <form className="flex flex-col border-1 border-gray-300 rounded-md font-arimo w-1/3 px-6 py-4 gap-5 "
            onSubmit={handleSubmit}>
            <div>
                <h1 className="text-xl text-center" >Sign In</h1>
                <span className="text-md text-[#67737C]">Enter your credentials to access your account</span>
            </div>

            <div className="flex flex-col gap-3">
                <label htmlFor="email">Email
                </label>
                <input
                    type="email"
                    id="email"
                    placeholder="example@mail.com"
                    className="bg-[#F2F6F8] rounded-md py-2 px-2"
                    value={user.email}
                    onChange={(e) => setUser({ email: e.target.value })}
                />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="*******" className="bg-[#F2F6F8] rounded-md py-2 px-2"
                    value={user.password}
                    onChange={(e) => setUser({ password: e.target.value })}
                />
            </div>

            <div className="flex flex-col gap-3 border-b-1 pb-5 border-gray-300" >
                <button type="submit" className="bg-[#00648E] text-white py-2 px-2 rounded-md">Sign In</button>
                <span className="text-sm text-[#00648E] text-center" >Forgot Password?</span>
            </div>

            <div className="flex flex-col gap-3 " >
                <button
                    onClick={() => { navigator("/register") }}
                    className="border-1 border-gray-300 rounded-md py-2 px-2"
                >
                    Register Institution
                </button>
                <span className="text-xs text-[#67737C] text-center">New institution? Register to get started with medical monitoring</span>
            </div>
        </form>
    )
}
