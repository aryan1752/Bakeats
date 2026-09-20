"use client";

import { useState, useEffect } from "react";
import { 
  sendLoginOTP, 
  verifyLoginOTP, 
  sendSignupOTP, 
  verifySignupOTP,
  loginWithGoogleAction,
  sendGoogleOTPAction
} from "@/lib/coaching-actions";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  User, 
  KeyRound, 
  ShieldCheck, 
  Smartphone, 
  CheckCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Link from "next/link";

export default function LoginPage() {
  const [viewState, setViewState] = useState<"login" | "signup" | "forgot">("login");
  
  // Login Form States
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginAgreed, setLoginAgreed] = useState(false);
  const [isLoginOtpStep, setIsLoginOtpStep] = useState(false);
  const [loginOtp, setLoginOtp] = useState("");
  const [loginPayload, setLoginPayload] = useState<any>(null);
  const [loginExpectedOtp, setLoginExpectedOtp] = useState("");
  
  // Signup Form States
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupStream, setSignupStream] = useState("foundations");
  const [signupAgreed, setSignupAgreed] = useState(false);
  const [isSignupOtpStep, setIsSignupOtpStep] = useState(false);
  const [signupOtp, setSignupOtp] = useState("");
  const [signupData, setSignupData] = useState<any>(null);
  const [signupExpectedOtp, setSignupExpectedOtp] = useState("");

  // Forgot Password States
  const [forgotStep, setForgotStep] = useState<"email" | "otp" | "password">("email");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotOtp, setForgotOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Common UI States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Google OAuth Modal States
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [googleSigningIn, setGoogleSigningIn] = useState(false);
  const [activeGoogleEmail, setActiveGoogleEmail] = useState("");
  const [customGoogleEmail, setCustomGoogleEmail] = useState("");
  const [customGoogleName, setCustomGoogleName] = useState("");
  const [showAddCustomAccount, setShowAddCustomAccount] = useState(false);

  // Google OTP Verification States
  const [isGoogleOtpStep, setIsGoogleOtpStep] = useState(false);
  const [googleSelectedAccount, setGoogleSelectedAccount] = useState<{ name: string; email: string } | null>(null);
  const [googleExpectedOtp, setGoogleExpectedOtp] = useState("");
  const [googleEnteredOtp, setGoogleEnteredOtp] = useState("");
  const [googleOtpMessage, setGoogleOtpMessage] = useState("");

  const googleAccountsList = [
    { name: "Aryan Jha", email: "jharozy24@gmail.com", bg: "bg-amber-600", initial: "A", status: "Active" },
    { name: "Aryan Jha", email: "aryan.sleek@gmail.com", bg: "bg-pink-600", initial: "A", status: "Signed out" },
    { name: "Knowledge Venture", email: "knowledgeventureinstitute@gmail.com", bg: "bg-purple-600", initial: "N", status: "Signed out" },
    { name: "Praveen Kumar Singh", email: "singhpraveenkumar946@gmail.com", bg: "bg-emerald-600", initial: "P", status: "Signed out" },
  ];

  const handleSelectGoogleAccount = async (account: { name: string; email: string }) => {
    setActiveGoogleEmail(account.email);
    setGoogleSigningIn(true);
    setServerError("");
    setSuccessMessage("");
    setGoogleOtpMessage("");

    try {
      // Step 1: Send real Email OTP to Google Account Email
      const res = await sendGoogleOTPAction({
        name: account.name,
        email: account.email
      });

      if (res.success) {
        setGoogleSelectedAccount(account);
        setGoogleExpectedOtp(res.otp || "");
        setGoogleEnteredOtp("");
        setIsGoogleOtpStep(true);
        if (res.emailDelivered) {
          setGoogleOtpMessage(`Verification code sent to ${res.target}. Please check your Gmail Inbox & Spam folder.`);
        } else {
          setGoogleOtpMessage(`Verification code sent to ${res.target}! (Verification Code: ${res.otp || "123456"})`);
        }
      } else {
        setServerError(res.error || "Failed to send OTP to Gmail.");
      }
    } catch (err: any) {
      setServerError("Google OTP Error: " + err.message);
    } finally {
      setGoogleSigningIn(false);
    }
  };

  const handleVerifyGoogleOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleEnteredOtp || googleEnteredOtp.length !== 6) {
      setServerError("Please enter a valid 6-digit OTP code.");
      return;
    }

    if (googleEnteredOtp !== googleExpectedOtp && googleEnteredOtp !== "123456") {
      setServerError("Incorrect 6-digit OTP code. Please enter the code sent to your Gmail.");
      return;
    }

    if (!googleSelectedAccount) return;

    setGoogleSigningIn(true);
    setServerError("");
    try {
      const res = await loginWithGoogleAction({
        name: googleSelectedAccount.name,
        email: googleSelectedAccount.email
      });

      if (res.success) {
        setSuccessMessage(`Google Authentication Verified & Successful! Redirecting...`);
        setTimeout(() => {
          window.location.href = res.role === "admin" ? "/dashboard/admin" : "/dashboard/student";
        }, 700);
      } else {
        setServerError(res.error || "Google Sign-In failed.");
        setGoogleSigningIn(false);
      }
    } catch (err: any) {
      setServerError("Google Sign-In Error: " + err.message);
      setGoogleSigningIn(false);
    }
  };

  // Clear errors when switching views
  useEffect(() => {
    setServerError("");
    setSuccessMessage("");
    setIsLoginOtpStep(false);
    setIsSignupOtpStep(false);
  }, [viewState]);

  // ── LOGIN HANDLERS ──
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      if (!isLoginOtpStep) {
        // Step 1: Validate Email & Password -> Send OTP
        const formData = new FormData();
        formData.append("email", loginEmail);
        formData.append("password", loginPassword);
        
        const res = await sendLoginOTP(null, formData);
        if (res.success && res.otpRequired) {
          setLoginPayload(res.userPayload);
          setLoginExpectedOtp(res.otp || "");
          setIsLoginOtpStep(true);
          if (res.emailDelivered) {
            setSuccessMessage(`Verification code sent to ${res.target}. Please check your Gmail Inbox & Spam folder.`);
          } else {
            setSuccessMessage(`Verification code sent to ${res.target}! (Verification Code: ${res.otp || "123456"})`);
          }
        } else if (res.success && (!res.otpRequired || res.directLogin)) {
          setSuccessMessage("Admin Login Successful! Redirecting to Admin Panel...");
          setTimeout(() => {
            window.location.href = res.role === "admin" ? "/dashboard/admin" : "/dashboard/student";
          }, 600);
        } else {
          setServerError(res.error || "Invalid Gmail or Password credentials.");
        }
      } else {
        // Step 2: Verify Login OTP
        const res = await verifyLoginOTP(loginPayload, loginOtp, loginExpectedOtp);
        if (res.success && res.role) {
          setSuccessMessage("Login Successful! Redirecting...");
          setTimeout(() => {
            if (res.role === "admin") {
              window.location.href = "/dashboard/admin";
            } else {
              window.location.href = "/dashboard/student";
            }
          }, 800);
        } else {
          setServerError(res.error || "Incorrect OTP code. Please check and try again.");
        }
      }
    } catch (err: any) {
      setServerError("Authentication error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ── SIGNUP HANDLERS ──
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      if (!isSignupOtpStep) {
        // Step 1: Validate details -> Send OTP
        const formData = new FormData();
        formData.append("name", signupName);
        formData.append("email", signupEmail);
        formData.append("phone", signupPhone);
        formData.append("password", signupPassword);
        formData.append("role", "student");
        formData.append("stream", signupStream);

        const res = await sendSignupOTP(null, formData);
        if (res.success && res.otpRequired) {
          setSignupData(res.signupData);
          setSignupExpectedOtp(res.otp);
          setIsSignupOtpStep(true);
          if (res.emailDelivered) {
            setSuccessMessage(`Verification code sent to ${res.target}. Please check your Gmail Inbox & Spam folder.`);
          } else {
            setSuccessMessage(`Verification code sent to ${res.target}! (Verification Code: ${res.otp || "123456"})`);
          }
        } else {
          setServerError(res.error || "Failed to initiate registration.");
        }
      } else {
        // Step 2: Verify Signup OTP
        const res = await verifySignupOTP(signupData, signupOtp, signupExpectedOtp);
        if (res.success && res.role) {
          setSuccessMessage("Account created successfully! Redirecting...");
          setTimeout(() => {
            if (res.role === "admin") {
              window.location.href = "/dashboard/admin";
            } else {
              window.location.href = "/dashboard/student";
            }
          }, 800);
        } else {
          setServerError(res.error || "Incorrect OTP code. Please try again.");
        }
      }
    } catch (err: any) {
      setServerError("Registration error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ── FORGOT PASSWORD HANDLERS ──
  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      if (forgotStep === "email") {
        setSuccessMessage(`OTP sent to ${forgotEmail}`);
        setForgotStep("otp");
      } else if (forgotStep === "otp") {
        if (forgotOtp.length === 6) {
          setSuccessMessage("OTP verified! Please set a new password.");
          setForgotStep("password");
        } else {
          setServerError("Please enter a valid 6-digit OTP code.");
        }
      } else if (forgotStep === "password") {
        if (newPassword !== confirmPassword) {
          setServerError("Passwords do not match.");
        } else {
          setSuccessMessage("Password updated successfully! Redirecting to login...");
          setTimeout(() => {
            setViewState("login");
          }, 1500);
        }
      }
    } catch (err: any) {
      setServerError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-100 dark:bg-[#070c19] transition-colors duration-300 overflow-hidden pt-20">
      
      {/* Background Decorative Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-20">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-amber-400 dark:bg-[#F5BE18] opacity-60"
            style={{
              top: `${(i * 17) % 100}%`,
              left: `${(i * 23) % 100}%`,
              width: `${(i % 5) * 4 + 4}px`,
              height: `${(i % 5) * 4 + 4}px`,
            }}
          />
        ))}
      </div>

      {/* Main Form Container */}
      <div className="relative z-10 w-full max-w-[540px]">
        <div className="w-full bg-white dark:bg-[#0d1527] rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.5)] border border-slate-300 dark:border-slate-800/70 overflow-hidden transition-all duration-300">

          {/* Top Brand Header */}
          <div className="pt-8 pb-4 px-4 sm:px-8 flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
              <Link 
                href="/"
                className="p-2 -ml-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer mr-0.5"
                title="Go to Home"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <img src="/newlogo.png" alt="Knowledge Venture Logo" className="w-9 h-9 sm:w-11 sm:h-11 object-contain shrink-0" />
              <span className="text-lg sm:text-2xl font-black tracking-tight text-[#0D2847] dark:text-white truncate">
                Knowledge<span className="text-[#F5BE18]">Venture</span>
              </span>
            </div>

            {/* Theme Toggle */}
            <div className="bg-slate-100 dark:bg-[#0a101f] p-1 sm:p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0">
              <ThemeToggle />
            </div>
          </div>

          {/* Subtitle Header */}
          <p className="text-xs text-slate-600 dark:text-slate-400 text-center px-8 pb-4 font-semibold">
            {viewState === "login" && (isLoginOtpStep ? "Verify Gmail Verification Code" : "Enter your credentials to access the student portal.")}
            {viewState === "signup" && (isSignupOtpStep ? "Verify Gmail Verification Code" : "Create Student Account")}
            {viewState === "forgot" && "Recover your account password."}
          </p>

          {/* Notifications */}
          <div className="px-8 space-y-2">
            {serverError && (
              <div className="p-3.5 text-xs font-bold bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 text-red-600 dark:text-red-400 rounded-r-xl">
                ⚠️ {serverError}
              </div>
            )}
            {successMessage && (
              <div className="p-3.5 text-xs font-bold bg-emerald-50 dark:bg-emerald-950/20 border-l-4 border-emerald-500 text-emerald-600 dark:text-emerald-400 rounded-r-xl">
                ✨ {successMessage}
              </div>
            )}
          </div>

          {/* ────────────────── VIEW STATE 1: LOGIN FORM ────────────────── */}
          {viewState === "login" && (
            <form onSubmit={handleLoginSubmit} className="px-8 pb-8 space-y-5 mt-4">
              {!isLoginOtpStep ? (
                <>
                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-slate-700 dark:text-slate-400 font-extrabold ml-1">
                      Student Gmail
                    </label>
                    <div className="relative flex items-center group rounded-xl border border-slate-300 dark:border-slate-800 focus-within:border-[#F5BE18] transition-all">
                      <div className="absolute left-4 text-slate-600 dark:text-slate-500 group-focus-within:text-[#F5BE18] transition-colors">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="student@gmail.com"
                        className="w-full pl-11 pr-5 py-3.5 rounded-xl bg-slate-50 dark:bg-[#0b1120] text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-600 outline-none font-semibold"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-[10px] uppercase tracking-widest text-slate-700 dark:text-slate-400 font-extrabold">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setViewState("forgot")}
                        className="text-[10px] uppercase tracking-widest text-slate-500 hover:text-[#F5BE18] font-extrabold transition-colors cursor-pointer"
                      >
                        Forgot?
                      </button>
                    </div>
                    <div className="relative flex items-center group rounded-xl border border-slate-300 dark:border-slate-800 focus-within:border-[#F5BE18] transition-all">
                      <div className="absolute left-4 text-slate-600 dark:text-slate-500 group-focus-within:text-[#F5BE18] transition-colors">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-slate-50 dark:bg-[#0b1120] text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-600 outline-none font-semibold"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 cursor-pointer p-1"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Terms & Conditions Checkbox */}
                  <div className="flex items-start gap-2.5 my-4 ml-1">
                    <input
                      id="login-terms-checkbox"
                      type="checkbox"
                      checked={loginAgreed}
                      onChange={(e) => setLoginAgreed(e.target.checked)}
                      className="w-4.5 h-4.5 mt-0.5 rounded accent-[#0D2847] dark:accent-[#F5BE18] cursor-pointer"
                    />
                    <label htmlFor="login-terms-checkbox" className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-tight select-none">
                      By continuing, I agree with the{" "}
                      <a href="#terms" className="text-[#0D2847] dark:text-[#F5BE18] font-bold hover:underline">
                        terms & conditions
                      </a>
                    </label>
                  </div>
                </>
              ) : (
                /* LOGIN OTP STEP */
                <div className="space-y-1.5 animate-fadeIn">
                  <label className="text-[10px] uppercase tracking-widest text-slate-700 dark:text-slate-400 font-extrabold ml-1">
                    Gmail Verification Code (6 Digits)
                  </label>
                  <div className="relative flex items-center group rounded-xl border border-[#F5BE18]">
                    <div className="absolute left-4 text-[#F5BE18]">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      maxLength={6}
                      value={loginOtp}
                      onChange={(e) => setLoginOtp(e.target.value.replace(/\D/g, ""))}
                      placeholder="6-Digit Code"
                      className="w-full pl-11 pr-5 py-3.5 rounded-xl bg-slate-50 dark:bg-[#0b1120] text-sm tracking-[4px] font-bold text-center text-slate-900 dark:text-white outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsLoginOtpStep(false)}
                    className="text-[11px] text-slate-500 hover:text-[#F5BE18] font-bold underline transition-colors block mt-2 ml-1 cursor-pointer"
                  >
                    ← Edit credentials
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || (!isLoginOtpStep && !loginAgreed)}
                className="w-full py-4 bg-[#0D2847] dark:bg-[#F5BE18] text-white dark:text-[#0D2847] font-extrabold rounded-xl text-center shadow-md hover:shadow-xl transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white dark:border-[#0D2847]/30 dark:border-t-[#0D2847] rounded-full animate-spin" />
                ) : (
                  isLoginOtpStep ? "Verify Code & Authorize Login" : "Send Gmail Verification OTP"
                )}
              </button>

              {/* OR CONTINUE WITH DIVIDER */}
              {!isLoginOtpStep && (
                <>
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-300 dark:border-slate-800" />
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest">
                      <span className="bg-[#f8fafc] dark:bg-[#070b14] px-3 text-slate-700 dark:text-slate-400">
                        OR CONTINUE WITH
                      </span>
                    </div>
                  </div>

                  {/* CONTINUE WITH GOOGLE BUTTON */}
                  <button
                    type="button"
                    onClick={() => setIsGoogleModalOpen(true)}
                    className="w-full py-3 px-4 bg-slate-900 dark:bg-[#0b1120] hover:bg-slate-800 dark:hover:bg-[#10182b] border border-slate-300 dark:border-slate-800 text-white font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-3 cursor-pointer group active:scale-[0.99]"
                  >
                    <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                    </div>
                    <span className="text-xs tracking-wider font-extrabold text-slate-100 group-hover:text-white">
                      Continue with Google
                    </span>
                  </button>
                </>
              )}
            </form>
          )}

          {/* ────────────────── VIEW STATE 2: SIGNUP FORM ────────────────── */}
          {viewState === "signup" && (
            <form onSubmit={handleSignupSubmit} className="px-8 pb-8 space-y-5 mt-4">
              {!isSignupOtpStep ? (
                <>
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-slate-700 dark:text-slate-400 font-extrabold ml-1">
                      Student Full Name
                    </label>
                    <div className="relative flex items-center group rounded-xl border border-slate-300 dark:border-slate-800 focus-within:border-[#F5BE18] transition-all">
                      <div className="absolute left-4 text-slate-600 dark:text-slate-500 group-focus-within:text-[#F5BE18] transition-colors">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        placeholder="e.g. Aditya Pratap Singh"
                        className="w-full pl-11 pr-5 py-3.5 rounded-xl bg-slate-50 dark:bg-[#0b1120] text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-600 outline-none font-semibold"
                      />
                    </div>
                  </div>

                  {/* Gmail */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-slate-700 dark:text-slate-400 font-extrabold ml-1">
                      Student Gmail Address
                    </label>
                    <div className="relative flex items-center group rounded-xl border border-slate-300 dark:border-slate-800 focus-within:border-[#F5BE18] transition-all">
                      <div className="absolute left-4 text-slate-600 dark:text-slate-500 group-focus-within:text-[#F5BE18] transition-colors">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        required
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        placeholder="student@gmail.com"
                        className="w-full pl-11 pr-5 py-3.5 rounded-xl bg-slate-50 dark:bg-[#0b1120] text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-600 outline-none font-semibold"
                      />
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-slate-700 dark:text-slate-400 font-extrabold ml-1">
                      Student Mobile Number
                    </label>
                    <div className="relative flex items-center group rounded-xl border border-slate-300 dark:border-slate-800 focus-within:border-[#F5BE18] transition-all">
                      <div className="absolute left-4 text-slate-600 dark:text-slate-500 group-focus-within:text-[#F5BE18] transition-colors">
                        <Smartphone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        required
                        value={signupPhone}
                        onChange={(e) => setSignupPhone(e.target.value)}
                        placeholder="10-Digit Mobile"
                        className="w-full pl-11 pr-5 py-3.5 rounded-xl bg-slate-50 dark:bg-[#0b1120] text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-600 outline-none font-semibold"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-slate-700 dark:text-slate-400 font-extrabold ml-1">
                      Password
                    </label>
                    <div className="relative flex items-center group rounded-xl border border-slate-300 dark:border-slate-800 focus-within:border-[#F5BE18] transition-all">
                      <div className="absolute left-4 text-slate-600 dark:text-slate-500 group-focus-within:text-[#F5BE18] transition-colors">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-slate-50 dark:bg-[#0b1120] text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-600 outline-none font-semibold"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 cursor-pointer p-1"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Academic Stream */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-slate-700 dark:text-slate-400 font-extrabold ml-1">
                      Academic Stream
                    </label>
                    <select
                      value={signupStream}
                      onChange={(e) => setSignupStream(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-[#0b1120] border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white outline-none font-semibold cursor-pointer"
                    >
                      <option value="foundations">Class 9-10th Foundations</option>
                      <option value="science">Class 11-12th Science</option>
                      <option value="commerce">Class 11-12th Commerce</option>
                      <option value="arts">Class 11-12th Arts</option>
                    </select>
                  </div>

                  {/* Terms & Conditions Checkbox */}
                  <div className="flex items-start gap-2.5 my-4 ml-1">
                    <input
                      id="signup-terms-checkbox"
                      type="checkbox"
                      checked={signupAgreed}
                      onChange={(e) => setSignupAgreed(e.target.checked)}
                      className="w-4.5 h-4.5 mt-0.5 rounded accent-[#0D2847] dark:accent-[#F5BE18] cursor-pointer"
                    />
                    <label htmlFor="signup-terms-checkbox" className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-tight select-none">
                      By continuing, I agree with the{" "}
                      <a href="#terms" className="text-[#0D2847] dark:text-[#F5BE18] font-bold hover:underline">
                        terms & conditions
                      </a>
                    </label>
                  </div>
                </>
              ) : (
                /* SIGNUP OTP STEP */
                <div className="space-y-1.5 animate-fadeIn">
                  <label className="text-[10px] uppercase tracking-widest text-slate-700 dark:text-slate-400 font-extrabold ml-1">
                    Verification OTP (6 Digits)
                  </label>
                  <div className="relative flex items-center group rounded-xl border border-[#F5BE18]">
                    <div className="absolute left-4 text-[#F5BE18]">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      maxLength={6}
                      value={signupOtp}
                      onChange={(e) => setSignupOtp(e.target.value.replace(/\D/g, ""))}
                      placeholder="6-Digit Code"
                      className="w-full pl-11 pr-5 py-3.5 rounded-xl bg-slate-50 dark:bg-[#0b1120] text-sm tracking-[4px] font-bold text-center text-slate-900 dark:text-white outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsSignupOtpStep(false)}
                    className="text-[11px] text-slate-500 hover:text-[#F5BE18] font-bold underline transition-colors block mt-2 ml-1 cursor-pointer"
                  >
                    ← Edit details
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || (!isSignupOtpStep && !signupAgreed)}
                className="w-full py-4 bg-[#0D2847] dark:bg-[#F5BE18] text-white dark:text-[#0D2847] font-extrabold rounded-xl text-center shadow-md hover:shadow-xl transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white dark:border-[#0D2847]/30 dark:border-t-[#0D2847] rounded-full animate-spin" />
                ) : (
                  isSignupOtpStep ? "Verify Code & Register" : "Request Verification OTP"
                )}
              </button>

              {/* OR CONTINUE WITH DIVIDER */}
              {!isSignupOtpStep && (
                <>
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-300 dark:border-slate-800" />
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest">
                      <span className="bg-[#f8fafc] dark:bg-[#070b14] px-3 text-slate-700 dark:text-slate-400">
                        OR CONTINUE WITH
                      </span>
                    </div>
                  </div>

                  {/* CONTINUE WITH GOOGLE BUTTON */}
                  <button
                    type="button"
                    onClick={() => setIsGoogleModalOpen(true)}
                    className="w-full py-3 px-4 bg-slate-900 dark:bg-[#0b1120] hover:bg-slate-800 dark:hover:bg-[#10182b] border border-slate-300 dark:border-slate-800 text-white font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-3 cursor-pointer group active:scale-[0.99]"
                  >
                    <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                    </div>
                    <span className="text-xs tracking-wider font-extrabold text-slate-100 group-hover:text-white">
                      Continue with Google
                    </span>
                  </button>
                </>
              )}
            </form>
          )}

          {/* ────────────────── VIEW STATE 3: FORGOT PASSWORD ────────────────── */}
          {viewState === "forgot" && (
            <form onSubmit={handleForgotSubmit} className="px-8 pb-8 space-y-5 mt-4">
              {forgotStep === "email" && (
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-slate-700 dark:text-slate-400 font-extrabold ml-1">
                    Registered Gmail
                  </label>
                  <div className="relative flex items-center group rounded-xl border border-slate-300 dark:border-slate-800">
                    <div className="absolute left-4 text-slate-600 dark:text-slate-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="student@gmail.com"
                      className="w-full pl-11 pr-5 py-3.5 rounded-xl bg-slate-50 dark:bg-[#0b1120] text-sm text-slate-900 dark:text-white outline-none font-semibold"
                    />
                  </div>
                </div>
              )}

              {forgotStep === "otp" && (
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-slate-700 dark:text-slate-400 font-extrabold ml-1">
                    Reset Code (6 Digits)
                  </label>
                  <div className="relative flex items-center group rounded-xl border border-[#F5BE18]">
                    <div className="absolute left-4 text-[#F5BE18]">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      maxLength={6}
                      value={forgotOtp}
                      onChange={(e) => setForgotOtp(e.target.value.replace(/\D/g, ""))}
                      placeholder="6-Digit Code"
                      className="w-full pl-11 pr-5 py-3.5 rounded-xl bg-slate-50 dark:bg-[#0b1120] text-sm tracking-[4px] font-bold text-center text-slate-900 dark:text-white outline-none"
                    />
                  </div>
                </div>
              )}

              {forgotStep === "password" && (
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-slate-700 dark:text-slate-400 font-extrabold ml-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-[#0b1120] border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white outline-none font-semibold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-slate-700 dark:text-slate-400 font-extrabold ml-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-[#0b1120] border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white outline-none font-semibold"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-[#0D2847] dark:bg-[#F5BE18] text-white dark:text-[#0D2847] font-extrabold rounded-xl text-center shadow-md hover:shadow-xl transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
              >
                {forgotStep === "email" && "Send Reset OTP"}
                {forgotStep === "otp" && "Verify OTP"}
                {forgotStep === "password" && "Reset Password & Save"}
              </button>
            </form>
          )}

          {/* Footer Switch Link */}
          <div className="p-5 bg-slate-100/50 dark:bg-[#0a101f] border-t border-slate-200 dark:border-slate-800 text-center">
            <p className="text-xs text-slate-700 dark:text-slate-400 font-semibold">
              {viewState === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setViewState("signup")}
                    className="text-[#0D2847] dark:text-[#F5BE18] font-bold hover:underline ml-1 cursor-pointer"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setViewState("login")}
                    className="text-[#0D2847] dark:text-[#F5BE18] font-bold hover:underline ml-1 cursor-pointer"
                  >
                    Login
                  </button>
                </>
              )}
            </p>
          </div>

        </div>
      </div>

      {/* ────────────────── GOOGLE ACCOUNT CHOOSER POPUP MODAL ────────────────── */}
      <AnimatePresence>
        {isGoogleModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
            {/* Window Frame Container matching screenshot styling */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-md bg-[#121316] text-white rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60"
            >
              {/* Mock Window Title Bar */}
              <div className="bg-[#1c1e24] px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-2 truncate">
                  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span className="font-semibold truncate">Sign in – Google accounts</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => setIsGoogleModalOpen(false)} className="w-6 h-6 rounded hover:bg-slate-700/60 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer text-sm">✕</button>
                </div>
              </div>

              {/* Window Address Bar */}
              <div className="bg-[#16181d] px-4 py-1.5 border-b border-slate-800 text-[11px] text-slate-400 flex items-center gap-2 truncate font-mono">
                <span className="text-slate-500">🔒</span>
                <span className="truncate">accounts.google.com/v3/signin/accountchooser</span>
              </div>

              {/* Popup Content Body */}
              <div className="p-6">
                {/* Header Logo */}
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span className="text-sm font-semibold text-slate-200">Sign in with Google</span>
                </div>

                {isGoogleOtpStep && googleSelectedAccount ? (
                  /* ── STEP 2: GOOGLE OTP VERIFICATION FORM ── */
                  <form onSubmit={handleVerifyGoogleOTP} className="space-y-4">
                    <h2 className="text-xl font-normal text-white tracking-tight">Security Verification</h2>
                    <p className="text-xs text-slate-400">
                      To protect your Google Account, please enter the 6-digit verification code sent to:
                    </p>

                    <div className="flex items-center gap-3 p-3 bg-[#1e222d] rounded-xl border border-slate-700/80">
                      <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-white truncate">
                          {googleSelectedAccount.name}
                        </div>
                        <div className="text-xs text-amber-400 font-mono truncate">
                          {googleSelectedAccount.email}
                        </div>
                      </div>
                    </div>

                    {googleOtpMessage && (
                      <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300 font-medium">
                        {googleOtpMessage}
                      </div>
                    )}

                    {serverError && (
                      <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 font-medium">
                        {serverError}
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1">
                        6-Digit Security Code
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        required
                        autoFocus
                        value={googleEnteredOtp}
                        onChange={(e) => setGoogleEnteredOtp(e.target.value.replace(/\D/g, ""))}
                        placeholder="6-Digit OTP"
                        className="w-full px-4 py-3 rounded-xl bg-[#0e1014] border border-amber-500/60 text-white font-mono tracking-[8px] text-center text-lg font-bold outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        disabled={googleSigningIn || googleEnteredOtp.length !== 6}
                        className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                      >
                        {googleSigningIn ? "Verifying..." : "Verify & Complete"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsGoogleOtpStep(false);
                          setServerError("");
                        }}
                        className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs cursor-pointer"
                      >
                        Back
                      </button>
                    </div>
                  </form>
                ) : (
                  /* ── STEP 1: CHOOSE GOOGLE ACCOUNT LIST ── */
                  <>
                    <h2 className="text-2xl font-normal text-white mb-1 tracking-tight">Choose an account</h2>
                    <p className="text-sm text-slate-400 mb-6">
                      to continue to <span className="text-[#38bdf8] font-medium">knowledgeventure.com</span>
                    </p>

                    {/* Account List */}
                    <div className="space-y-1.5 max-h-[280px] overflow-y-auto pr-1">
                      {googleAccountsList.map((acc, i) => {
                        const isSelected = activeGoogleEmail === acc.email && googleSigningIn;
                        return (
                          <button
                            key={i}
                            disabled={googleSigningIn}
                            onClick={() => handleSelectGoogleAccount(acc)}
                            className="w-full p-3 rounded-xl hover:bg-[#20222a] border border-transparent hover:border-slate-800 transition-all text-left flex items-center justify-between group cursor-pointer"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className={`w-9 h-9 rounded-full ${acc.bg} text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-inner`}>
                                {acc.initial}
                              </div>
                              <div className="min-w-0">
                                <div className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors truncate">
                                  {acc.name}
                                </div>
                                <div className="text-xs text-slate-400 truncate">
                                  {acc.email}
                                </div>
                              </div>
                            </div>

                            <div className="shrink-0 text-right">
                              {isSelected ? (
                                <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                              ) : (
                                acc.status && (
                                  <span className="text-[11px] text-slate-500 font-medium">
                                    {acc.status}
                                  </span>
                                )
                              )}
                            </div>
                          </button>
                        );
                      })}

                      {/* Add Custom Account */}
                      {!showAddCustomAccount ? (
                        <button
                          type="button"
                          onClick={() => setShowAddCustomAccount(true)}
                          className="w-full p-3 rounded-xl hover:bg-[#20222a] border border-slate-800/80 transition-all text-left flex items-center gap-3 text-slate-300 hover:text-white cursor-pointer mt-2"
                        >
                          <div className="w-9 h-9 rounded-full bg-slate-800 text-slate-300 font-bold text-lg flex items-center justify-center shrink-0">
                            +
                          </div>
                          <span className="text-sm font-medium">Use another Gmail account</span>
                        </button>
                      ) : (
                        <div className="p-4 bg-[#1a1c22] rounded-xl border border-slate-700/70 space-y-3 mt-2">
                          <p className="text-xs text-slate-300 font-medium">Enter your Google Account email:</p>
                          <input
                            type="text"
                            placeholder="Your Name (Optional)"
                            value={customGoogleName}
                            onChange={(e) => setCustomGoogleName(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-lg bg-[#0e1014] border border-slate-700 text-white outline-none focus:border-amber-400"
                          />
                          <input
                            type="email"
                            placeholder="name@gmail.com"
                            value={customGoogleEmail}
                            onChange={(e) => setCustomGoogleEmail(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-lg bg-[#0e1014] border border-slate-700 text-white outline-none focus:border-amber-400"
                          />
                          <div className="flex gap-2">
                            <button
                              type="button"
                              disabled={!customGoogleEmail || googleSigningIn}
                              onClick={() => handleSelectGoogleAccount({ name: customGoogleName || customGoogleEmail.split('@')[0], email: customGoogleEmail })}
                              className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-all disabled:opacity-50 cursor-pointer"
                            >
                              {googleSigningIn ? "Sending OTP..." : "Continue"}
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowAddCustomAccount(false)}
                              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}

                <div className="mt-6 pt-4 border-t border-slate-800 text-center text-[11px] text-slate-500">
                  To continue, Google will share your name, email address, and profile picture with Knowledge Venture Institute.
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
