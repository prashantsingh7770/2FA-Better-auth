import { headers } from "next/headers";
import { auth } from "../lib/auth";
import SignOutButton from "./SignOutButton";
import E2FA from "./E2fa";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center shadow-xl">
          <h1 className="mb-2 text-2xl font-bold text-white">
            Access Denied
          </h1>
          <p className="text-slate-400">
            Please sign in to continue.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4">
      <div className="w-full max-w-xl rounded-3xl border border-slate-700/50 bg-slate-900/70 p-8 shadow-2xl backdrop-blur-md">
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">
            Welcome, {session.user.name.split(" ").slice(0,1)}
          </h1>

          <p className="mt-2 text-lg text-slate-300">
            {session.user.name ?? "User"}
          </p>

          <p className="text-sm text-slate-500">
            {session.user.email}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-5">
          <h2 className="mb-4 text-lg font-semibold text-white">
            Security Settings
          </h2>

          <div className="flex items-center justify-between">
            <span className="text-slate-300">
              Two-Factor Authentication
            </span>

            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                session.user.twoFactorEnabled
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {session.user.twoFactorEnabled
                ? "Enabled"
                : "Not Enabled"}
            </span>
          </div>

          <div className="mt-6">
            <E2FA session={session} />
          </div>
        </div>

        <div className="mt-6 border-t border-slate-700 pt-6">
          <SignOutButton />
        </div>
      </div>
    </main>
  );
}