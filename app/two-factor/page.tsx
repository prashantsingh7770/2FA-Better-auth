"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TwoFactor() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const verify = async () => {
    setError("");
    const { data, error: verifyError } = await authClient.twoFactor.verifyTotp({
      code,
      trustDevice: false,
    });

    // If there's an error, show it
    if (verifyError) {
      setError(verifyError.message || "Invalid code, please try again.");
      return; // stay on page
    }

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6">
          Two-Factor Verification
        </h2>

        <input
          className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter 6-digit code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          type="text"
          maxLength={6}
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          onClick={verify}
          className="w-full bg-indigo-600 text-white font-medium py-2 rounded hover:bg-indigo-700 transition"
        >
          Verify
        </button>
      </div>
    </div>
  );
}