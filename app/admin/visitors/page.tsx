import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { verifySessionToken, ADMIN_COOKIE_NAME } from "@/lib/admin-auth";
import VisitorsTable from "@/components/admin/VisitorsTable";
import LogoutButton from "@/components/admin/LogoutButton";

export const metadata: Metadata = {
  title: "Visitors - Admin",
  robots: { index: false, follow: false },
};

export default function AdminVisitorsPage() {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    redirect("/admin/login?from=/admin/visitors");
  }

  return (
    <div className="min-h-screen bg-surface px-6 py-10 pt-32 text-text">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="display text-2xl">Visitor data</h1>
            <p className="mt-1 text-sm text-muted">
              Live - new visitors appear in real time.
            </p>
          </div>
          <LogoutButton />
        </div>
        <VisitorsTable />
      </div>
    </div>
  );
}
