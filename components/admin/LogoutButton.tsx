"use client";

export default function LogoutButton() {
  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <button
      onClick={logout}
      className="rounded-full border border-line px-4 py-2 text-xs text-muted transition-colors hover:text-text"
    >
      Log out
    </button>
  );
}
