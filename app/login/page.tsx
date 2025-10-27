"use client";
import { useState } from "react";
import InputField from "../../components/InputField";
import AuthButton from "../../components/AuthButton";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    console.log("Login:", { email, password });
    // Backend API call ekhane
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-900">
      <div className="w-80 bg-green-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>
        <InputField
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <AuthButton text="Login" onClick={handleLogin} />
        <p className="text-white text-sm mt-4 text-center">
          Don't have an account?{" "}
          <Link href="/signup" className="text-green-300 underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
