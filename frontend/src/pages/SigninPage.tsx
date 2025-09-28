import { ArrowRight } from "lucide-react";
import { useState } from "react";
import loginImage from "../assets/signup-img.png";
import { Link } from "react-router-dom";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);

    const handleSignIn = (e: any) => {
        e.preventDefault();
        // Handle sign-in logic here
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center font-inter rounded">
            {/* card */}
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
                {/* LEFT: form */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <header className="mb-6 flex md:justify-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                                HD
                            </div>
                        </div>
                    </header>

                    <h2 className="text-3xl font-semibold text-slate-900 mb-2 flex md:justify-center">Sign in</h2>
                    <p className="text-sm text-slate-500 mb-8 flex md:justify-center">
                        Please login to continue to your account.
                    </p>

                    <form className="space-y-5 w-full" onSubmit={handleSignIn}>
                        {/* Email Input */}
                        <label className="block">
                            <span className="text-xs text-slate-500">Email</span>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    placeholder="youremail@gmail.com"
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </label>

                        {/* OTP Input */}
                        <label className="block">
                            <span className="text-xs text-slate-500">OTP</span>
                            <div className="mt-2 relative">
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                                {/* Optional: Add icon or button to resend OTP */}
                            </div>
                        </label>

                        {/* Keep me logged in */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="keepLoggedIn"
                                className="accent-sky-400"
                                checked={keepLoggedIn}
                                onChange={(e) => setKeepLoggedIn(e.target.checked)}
                            />
                            <label htmlFor="keepLoggedIn" className="ml-2 text-sm text-slate-700">
                                Keep me logged in
                            </label>
                        </div>

                        {/* Sign In Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                Sign in
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Sign Up Link */}
                        <p className="text-center text-sm text-slate-500">
                            Don't have an account?{" "}
                            <Link to={"/signup"} className="text-blue-600 font-medium">
                                Create one
                            </Link>
                        </p>
                    </form>
                </div>

                {/* RIGHT: image */}
                <div className="hidden md:block">
                    <img
                        src={loginImage}
                        alt="abstract hero"
                        className="w-full h-full object-fill rounded"
                    />
                </div>
            </div>
        </div>
    );
}