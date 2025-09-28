import { ArrowRight } from "lucide-react";
import siginImage from "../assets/signup-img.png";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function SignupPage() {
    const [isSentOtp, setIsSentOtp] = useState(false);
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center font-inter">
            {/* card */}
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
                {/* LEFT: form */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <header className="mb-6 flex md: justify-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                                HD
                            </div>
                        </div>
                    </header>

                    <h2 className="text-3xl font-semibold text-slate-900 mb-2 flex md: justify-center">Sign up</h2>
                    <p className="text-sm text-slate-500 mb-8 flex md: justify-center">
                        Sign up to enjoy the feature of HD
                    </p>

                    <form className="space-y-5 w-full" onSubmit={(e) => e.preventDefault()}>
                        <label className="block">
                            <span className="text-xs text-slate-500">Your Name</span>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    placeholder="Jonas Khanwald"
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                                    required
                                />
                            </div>
                        </label>

                        <label className="block">
                            <span className="text-xs text-slate-500">Date of Birth</span>
                            <div className="mt-2">
                                <input
                                    type="date"
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                                    required
                                />
                            </div>
                        </label>

                        <label className="block">
                            <span className="text-xs text-slate-500">Email</span>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    placeholder="jonas_kahnwald@gmail.com"
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                                    required
                                />
                            </div>
                        </label>

                        <div>
                            {
                                isSentOtp ? <>
                                    <label className="block">
                                        <span className="text-xs text-slate-500">OTP</span>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                placeholder="jonas_kahnwald@gmail.com"
                                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                                                required
                                            />
                                        </div>
                                    </label>
                                    <button
                                        type="submit"
                                        className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 mt-4"
                                    >
                                        Sign Up
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                </> : <>
                                    <button
                                        onClick={()=>setIsSentOtp(true)}
                                        type="button"
                                        className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    >
                                        Get OTP
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                </>
                            }
                        </div>

                        <p className="text-center text-sm text-slate-500">
                            Already have an account?{" "}
                            <Link to={"/signin"} className="text-blue-600 font-medium">
                                Sign in
                            </Link>
                        </p>
                    </form>

                    <footer className="mt-6 text-xs text-slate-400">
                        <p>
                            By signing up you agree to our{" "}
                            <a href="/" className="text-sky-500">
                                Terms
                            </a>{" "}
                            and{" "}
                            <a href="/" className="text-sky-500">
                                Privacy
                            </a>
                            .
                        </p>
                    </footer>
                </div>

                {/* RIGHT: image */}
                <div className="hidden md:block">
                    <img
                        src={siginImage}
                        alt="abstract hero"
                        className="w-full h-full object-fill rounded-r-2xl"
                    />
                </div>
            </div>
        </div>
    );
}
