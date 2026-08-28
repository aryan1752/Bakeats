"use client";

import { useActionState, useEffect, useState } from "react";
import { loginUser, verifyStudentLogin, registerUser } from "@/lib/coaching-actions";
import { LogIn, ShieldAlert, Key, User, BookOpen, Smartphone, Mail, Sparkles, CheckCircle, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Login() {
  const [loginTab, setLoginTab] = useState<"signin" | "signup">("signin");
  
  // Sign-in states
  const [loginState, loginAction, isLoginPending] = useActionState(loginUser, null);

  // Registration state
  const [registerState, registerAction, isRegisterPending] = useActionState(registerUser, null);
  const [signupRole, setSignupRole] = useState("student");
  
  // Google Sign-In / Sign-Up state
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleEmail, setGoogleEmail] = useState("");
  const [googlePurpose, setGooglePurpose] = useState<"signin" | "signup">("signin");
  const [googleStatus, setGoogleStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [googleError, setGoogleError] = useState("");

  // Redirect on successful login
  useEffect(() => {
    if (loginState?.success && loginState?.role) {
      if (loginState.role === "admin") {
        window.location.href = "/dashboard/admin";
      } else if (loginState.role === "parent") {
        window.location.href = "/dashboard/parent";
      } else {
        window.location.href = "/dashboard/student";
      }
    }
  }, [loginState]);

  // Redirect on successful signup
  useEffect(() => {
    if (registerState?.success && registerState?.role) {
      if (registerState.role === "admin") {
        window.location.href = "/dashboard/admin";
      } else if (registerState.role === "parent") {
        window.location.href = "/dashboard/parent";
      } else {
        window.location.href = "/dashboard/student";
      }
    }
  }, [registerState]);

  // Google Sign-in/up simulation
  const handleGoogleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGoogleStatus("loading");
    setGoogleError("");
    await new Promise((r) => setTimeout(r, 1200));

    if (googlePurpose === "signin") {
      let matchedStream = "foundations";
      let matchedPhone = "7011731649";
      let isParent = false;
      
      if (googleEmail.includes("diya")) {
        matchedStream = "commerce";
        matchedPhone = "8585575250";
      } else if (googleEmail.includes("parent")) {
        isParent = true;
      }

      if (googleEmail === "kvadmin@gmail.com") {
        const res = await verifyStudentLogin("foundations", "kvadmin@gmail.com", "Kvadmin3511");
        if (res.success) {
          setGoogleStatus("success");
          setTimeout(() => {
            window.location.href = "/dashboard/admin";
          }, 800);
          return;
        }
      }

      const res = await verifyStudentLogin(
        isParent ? "foundations" : matchedStream,
        googleEmail,
        isParent ? "9876543210" : matchedPhone
      );

      if (res.success) {
        setGoogleStatus("success");
        setTimeout(() => {
          window.location.href = isParent ? "/dashboard/parent" : "/dashboard/student";
        }, 800);
      } else {
        setGoogleStatus("error");
        setGoogleError("Gmail address not registered. Please sign up first.");
      }
    } else {
      setGoogleStatus("success");
      setTimeout(() => {
        setShowGoogleModal(false);
      }, 500);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-800 py-16 px-4 md:px-8 mt-10 flex flex-col justify-start items-center relative">
      
      {/* Container Card */}
      <div className="max-w-md w-full bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden p-6 md:p-8">
        
        {/* Header Branding */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="h-14 aspect-[3/2] border border-[#F5BE18] rounded-lg p-1 bg-[#0D2847] shadow-md flex items-center justify-center">
              <img
                src="/kvi_logo.png"
                alt="Knowledge Venture Institute Logo"
                className="h-full w-full object-contain select-none"
              />
            </div>
          </div>
          <h1 className="text-lg font-black text-[#0D2847] leading-none uppercase">Knowledge Venture Institute</h1>
          <p className="text-[10px] text-gray-400 font-bold tracking-[1.5px] mt-1.5">Where Concepts Become Clear</p>
        </div>

        {/* Tab 1: Gmail and Password Sign-In */}
        {loginTab === "signin" && (
          <form action={loginAction} className="flex flex-col gap-4 text-xs">
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-gray-500 uppercase tracking-wider">Gmail Address</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. student1@gmail.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 pl-9 text-xs outline-none focus:border-[#F5BE18] focus:bg-white transition"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-gray-500 uppercase tracking-wider">Password</label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Enter account password"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 pl-9 text-xs outline-none focus:border-[#F5BE18] focus:bg-white transition"
                />
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {loginState && !loginState.success && (
              <div className="p-3 rounded-lg text-xs bg-red-50 text-red-700 font-semibold flex items-start gap-2">
                <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{loginState.error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoginPending}
              className="w-full bg-[#F5BE18] hover:bg-[#E2AD07] disabled:bg-[#F5BE18]/50 text-[#0D2847] font-black py-3 rounded-lg text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-md mt-2"
            >
              <LogIn className="h-4 w-4" />
              <span>{isLoginPending ? "Authenticating..." : "Login to Portal"}</span>
            </button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-[10px] uppercase font-bold">Or Sign-In With</span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>

            <button
              type="button"
              onClick={() => {
                setGooglePurpose("signin");
                setShowGoogleModal(true);
                setGoogleStatus("idle");
                setGoogleError("");
                setGoogleEmail("");
              }}
              className="w-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 py-3 rounded-lg font-bold text-xs flex items-center justify-center gap-2.5 transition"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.68 1.54 14.98 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.85 2.99C6.16 7.43 8.87 5.04 12 5.04z" />
                <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.58l3.76 2.91c2.2-2.03 3.67-5.01 3.67-8.64z" />
                <path fill="#FBBC05" d="M5.24 14.88c-.24-.72-.38-1.49-.38-2.28s.14-1.56.38-2.28L1.39 7.33C.5 9.17 0 11.17 0 13.25s.5 4.08 1.39 5.92l3.85-2.29z" />
                <path fill="#34A853" d="M12 23c3.24 0 5.97-1.08 7.96-2.91l-3.76-2.91c-1.04.7-2.39 1.12-4.2 1.12-3.13 0-5.84-2.39-6.76-5.51L1.39 15.08C3.37 18.97 7.35 21.64 12 21.64z" />
              </svg>
              <span>Login with Google</span>
            </button>

            {/* Signup Toggle Link */}
            <p className="text-center text-[11px] text-gray-500 mt-4">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setLoginTab("signup")}
                className="text-[#E2AD07] hover:text-[#B38804] hover:underline font-bold"
              >
                Sign Up with Google
              </button>
            </p>
          </form>
        )}

        {/* Tab 2: Google Sign-Up and Account Creation */}
        {loginTab === "signup" && (
          <div className="flex flex-col gap-4 text-xs">
            
            <button
              type="button"
              onClick={() => {
                setGooglePurpose("signup");
                setShowGoogleModal(true);
                setGoogleStatus("idle");
                setGoogleError("");
                setGoogleEmail("");
              }}
              className="w-full bg-[#4285F4] hover:bg-[#4285F4]/90 text-white py-3.5 rounded-lg font-bold text-xs flex items-center justify-center gap-2.5 transition shadow-md shadow-[#4285F4]/20"
            >
              <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
                <path d="M12 11h11.23c.12.63.18 1.3.18 2.03 0 6.97-4.67 11.97-11.41 11.97C5.38 25 0 19.62 0 13S5.38 1 12 1c3.24 0 5.95 1.19 8.04 3.12l-3.23 3.23c-.87-.84-2.39-1.81-4.81-1.81-4.12 0-7.48 3.42-7.48 7.64s3.36 7.64 7.48 7.64c4.78 0 6.56-3.43 6.84-5.2H12v-4.8z" />
              </svg>
              <span>Sign Up with Google</span>
            </button>

            {googleEmail ? (
              <motion.form 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                action={registerAction} 
                className="flex flex-col gap-3 mt-4 border-t border-gray-100 pt-4"
              >
                <div className="bg-green-50 text-green-700 p-2.5 rounded-lg font-bold text-[10px] uppercase flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4" />
                  <span>Google Gmail Authorized: {googleEmail}</span>
                </div>
                <input type="hidden" name="email" value={googleEmail} />

                <div className="flex flex-col gap-1">
                  <label className="font-bold text-gray-500 uppercase">Select Role</label>
                  <select
                    name="role"
                    value={signupRole}
                    onChange={(e) => setSignupRole(e.target.value)}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#F5BE18] text-gray-700 font-semibold"
                  >
                    <option value="student">Student Profile</option>
                    <option value="parent">Parent Profile</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-bold text-gray-500 uppercase">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter full name"
                    className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#F5BE18] text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-gray-500 uppercase">Username</label>
                    <input
                      type="text"
                      name="username"
                      required
                      placeholder="Choose username"
                      className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#F5BE18] text-xs"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-gray-500 uppercase">Password</label>
                    <input
                      type="password"
                      name="password"
                      required
                      placeholder="Set password"
                      className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#F5BE18] text-xs"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-bold text-gray-500 uppercase">Mobile Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Your contact number"
                    className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#F5BE18] text-xs"
                  />
                </div>

                {signupRole === "student" && (
                  <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-2.5">
                    <div className="flex flex-col gap-1">
                      <label className="font-bold text-gray-500 uppercase">Choose Stream</label>
                      <select name="stream" className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none text-gray-700">
                        <option value="foundations">Class 9-10th Foundations</option>
                        <option value="commerce">Class 11-12th Commerce</option>
                        <option value="arts">Class 11-12th Arts</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-bold text-gray-500 uppercase">Parent Mobile</label>
                      <input
                        type="tel"
                        name="parentPhone"
                        required
                        placeholder="Parent's phone"
                        className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#F5BE18] text-xs"
                      />
                    </div>
                  </div>
                )}

                {signupRole === "parent" && (
                  <div className="flex flex-col gap-1 border-t border-gray-100 pt-2.5">
                    <label className="font-bold text-gray-500 uppercase">Child/Ward Registered Mobile</label>
                    <input
                      type="tel"
                      name="wardPhone"
                      required
                      placeholder="Ward's mobile e.g. 7011731649"
                      className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#F5BE18] text-xs"
                    />
                  </div>
                )}

                {registerState && !registerState.success && (
                  <div className="p-2.5 rounded-lg text-xs bg-red-50 text-red-700 font-semibold">
                    {registerState.error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isRegisterPending}
                  className="w-full bg-[#F5BE18] hover:bg-[#E2AD07] text-[#0D2847] font-black py-3 rounded-lg text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow mt-2"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>{isRegisterPending ? "Registering account..." : "Complete KVI Google Registration"}</span>
                </button>
              </motion.form>
            ) : (
              <p className="text-[10px] text-gray-400 text-center italic mt-2">
                *Please authorize your Google account first to complete the registration details form.
              </p>
            )}

            {/* Signin Toggle Link */}
            <p className="text-center text-[11px] text-gray-500 mt-4">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setLoginTab("signin")}
                className="text-[#E2AD07] hover:text-[#B38804] hover:underline font-bold"
              >
                Sign In / Login
              </button>
            </p>

          </div>
        )}

        {/* Quick Testing Cheatsheet */}
        <div className="mt-8 border-t border-gray-100 pt-6 text-[10px] text-gray-400">
          <span className="font-bold text-gray-700 block mb-1">Student testing profiles:</span>
          <div className="flex flex-col gap-1 italic">
            <span>• Stream Foundations: Gmail: <span className="font-bold text-gray-600">aarav@gmail.com</span> | Password: <span className="font-bold text-gray-600">student123</span></span>
            <span>• Stream Commerce: Gmail: <span className="font-bold text-gray-600">diya@gmail.com</span> | Password: <span className="font-bold text-gray-600">student234</span></span>
          </div>
          <span className="font-bold text-gray-700 block mt-3 mb-1">Secret Admin Access:</span>
          <span className="italic">• Enter Gmail: <span className="font-bold text-gray-600">kvadmin@gmail.com</span> | Password: <span className="font-bold text-gray-600">Kvadmin3511</span></span>
        </div>

      </div>

      {/* ── GOOGLE AUTHENTICATION POPUP OVERLAY ── */}
      <AnimatePresence>
        {showGoogleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white max-w-sm w-full border border-gray-100 rounded-2xl p-6 shadow-2xl relative text-center text-xs"
            >
              <div className="flex justify-center mb-3">
                <svg className="h-8 w-8" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.68 1.54 14.98 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.85 2.99C6.16 7.43 8.87 5.04 12 5.04z" />
                  <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.58l3.76 2.91c2.2-2.03 3.67-5.01 3.67-8.64z" />
                  <path fill="#FBBC05" d="M5.24 14.88c-.24-.72-.38-1.49-.38-2.28s.14-1.56.38-2.28L1.39 7.33C.5 9.17 0 11.17 0 13.25s.5 4.08 1.39 5.92l3.85-2.29z" />
                  <path fill="#34A853" d="M12 23c3.24 0 5.97-1.08 7.96-2.91l-3.76-2.91c-1.04.7-2.39 1.12-4.2 1.12-3.13 0-5.84-2.39-6.76-5.51L1.39 15.08C3.37 18.97 7.35 21.64 12 21.64z" />
                </svg>
              </div>
              <h3 className="text-base font-extrabold text-gray-700">Sign {googlePurpose === "signin" ? "in" : "up"} with Google</h3>
              <p className="text-gray-400 mt-1">Enter your Gmail address to simulate Google verification.</p>

              <form onSubmit={handleGoogleSubmit} className="flex flex-col gap-3 my-5 text-left">
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-gray-500 uppercase">Google Email</label>
                  <input
                    type="email"
                    required
                    value={googleEmail}
                    onChange={(e) => setGoogleEmail(e.target.value)}
                    placeholder="e.g. aarav@gmail.com"
                    className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-[#4285F4] focus:bg-white text-xs"
                  />
                </div>

                {googleStatus === "error" && (
                  <div className="text-red-700 bg-red-50 p-2.5 rounded-lg font-bold text-center">
                    {googleError}
                  </div>
                )}

                {googleStatus === "success" && (
                  <div className="text-green-700 bg-green-50 p-2.5 rounded-lg font-bold text-center flex items-center justify-center gap-1.5">
                    <CheckCircle className="h-4 w-4" />
                    <span>Authorized successfully!</span>
                  </div>
                )}

                <div className="flex gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowGoogleModal(false)}
                    className="w-1/2 py-2.5 border border-gray-200 hover:bg-gray-50 rounded-lg font-bold transition text-gray-500 text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={googleStatus === "loading" || googleStatus === "success"}
                    className="w-1/2 py-2.5 bg-[#4285F4] hover:bg-[#4285F4]/90 text-white font-bold rounded-lg transition"
                  >
                    {googleStatus === "loading" ? "Connecting..." : "Continue"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
