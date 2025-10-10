import { useNavigate } from "react-router";
import { useGlobalStore } from "../../shared/stores/globalstore";

export function RegisterForm() {
    const navigator = useNavigate();
    const { user, setUser, register } = useGlobalStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await register();

        if (success) {
            navigator("/setup-mfa");
        }
    }


    return (
        <form
            className="flex flex-col border-1 border-gray-300 rounded-md font-arimo w-1/3 px-6 py-4 gap-5"
            onSubmit={handleSubmit}
        >
            <div>
                <h1 className="text-xl text-center font-semibold" >Sign Up</h1>
                <span className="text-md text-[#67737C]">Enter your details to create your account</span>
            </div>

            <div className="flex flex-col gap-3">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="example@mail.com"
                    className="bg-[#F2F6F8]  rounded-md py-2 px-2"
                    value={user.email}
                    onChange={(e) => setUser({ email: e.target.value })}
                />

                <label htmlFor="institution">Institution name</label>
                <input
                    type="text"
                    id="institution"
                    placeholder="General Hospital"
                    className="bg-[#F2F6F8]  rounded-md py-2 px-2"
                    value={user.organizationName}
                    onChange={(e) => setUser({ organizationName: e.target.value })}
                />

                <label htmlFor="password">Password</label>
                <input type="password"
                    id="password"
                    placeholder="*******"
                    className="bg-[#F2F6F8] rounded-md py-2 px-2"
                    value={user.password}
                    onChange={(e) => setUser({ password: e.target.value })}
                />
            </div>

            <div className="flex flex-col gap-3 border-b-1 pb-5 border-gray-300" >
                <button type="submit" className="bg-[#00648E] text-white py-2 px-2 rounded-md"                >
                    Sign Up
                </button>
            </div>

            <div className="flex flex-col gap-3 " >
                <button
                    onClick={() => { navigator("/login") }}
                    className="border-1 border-gray-300 rounded-md py-2 px-2"
                >
                    Already have an account? Sign in
                </button>

            </div>
        </form>
    )
}   