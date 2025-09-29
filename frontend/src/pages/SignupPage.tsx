import { ArrowRight } from "lucide-react";
import siginImage from "../assets/signup-img.png";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

/**
 * SignupPage
 * - Sends POST /api/auth/send-otp  { email }
 * - Then POST /api/auth/signup    { name, dob, email, otp }
 *
 * Replace endpoint URLs with your backend paths and adjust payloads/response handling.
 */
export default function SignupPage() {
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [isSentOtp, setIsSentOtp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Basic email validation
    const isValidEmail = (e) =>
        typeof e === "string" && /\S+@\S+\.\S+/.test(e.trim());

    async function sendOtp() {
        setError("");
        setSuccess("");
        if (!isValidEmail(email)) {
            setError("Please enter a valid email.");
            return;
        }

        setLoading(true);
        // http://locahost:3000/api/v1/auth/sendotp
        try {
            const res = await axios.post("http://localhost:3000/api/v1/auth/sendotp", {
                email: email.trim(),
            });

            console.log("response fron frontend --> ", res.data); // response from backend


            // optional: backend might return expiration or masked email
            setIsSentOtp(true);
            setSuccess(res.data?.success || "OTP sent to your email.");
        } catch (err) {
            setError(err.message || "Something went wrong while sending OTP.");
        } finally {
            setLoading(false);
        }
    }

    async function handleSignup(e: any) {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!name.trim()) {
            setError("Please enter your name.");
            return;
        }
        if (!dob) {
            setError("Please choose your date of birth.");
            return;
        }
        if (!isValidEmail(email)) {
            setError("Please enter a valid email.");
            return;
        }
        if (!otp.trim()) {
            setError("Please enter the OTP.");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                name: name,
                dob: dob, // ISO date from input (YYYY-MM-DD)
                email: email,
                otp: otp,
            };
            console.log("printing the payload data -->", payload);


            const res = await axios.post("http://localhost:3000/api/v1/auth/signup", payload);
            if (res.data.success) {
                <Navigate to="/dashboard" />
            }

            console.log("response form signup oage--> ", res)
            if (!res.data.success) {
                throw new Error(res.data.err || "Signup failed");
            }
            setSuccess(res.data.message || "Signup successful! You can now sign in.");
            // Optionally: redirect to signin or store auth token
            // e.g. localStorage.setItem('token', data.token)
        } catch (err) {
            setError(err.message || "Error during signup.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center font-inter">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
                {/* LEFT: form */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <header className="mb-6 flex items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                                HD
                            </div>
                        </div>
                    </header>

                    <h2 className="text-3xl font-semibold text-slate-900 mb-2">Sign up</h2>
                    <p className="text-sm text-slate-500 mb-8">Sign up to enjoy the feature of HD</p>

                    <form className="space-y-5 w-full" onSubmit={handleSignup}>
                        <label className="block">
                            <span className="text-xs text-slate-500">Your Name</span>
                            <div className="mt-2">
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    placeholder="jonas_kahnwald@gmail.com"
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                                    required
                                />
                            </div>
                        </label>

                        <div>
                            {isSentOtp ? (
                                <>
                                    <label className="block">
                                        <span className="text-xs text-slate-500">OTP</span>
                                        <div className="mt-2">
                                            <input
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                type="text"
                                                placeholder="Enter OTP"
                                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                                                required
                                            />
                                        </div>
                                    </label>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 disabled:opacity-60 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 mt-4"
                                    >
                                        {loading ? "Signing up..." : "Sign Up"}
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={sendOtp}
                                        type="button"
                                        disabled={loading}
                                        className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 disabled:opacity-60 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    >
                                        {loading ? "Sending OTP..." : "Get OTP"}
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                </>
                            )}
                        </div>

                        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
                        {success && <p className="text-sm text-green-600 mt-2">{success}</p>}

                        <p className="text-center text-sm text-slate-500">
                            Already have an account?{" "}
                            <Link to={"/"} className="text-blue-600 font-medium">
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
