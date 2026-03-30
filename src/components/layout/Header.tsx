"use client";

import { createBrowserClient } from "@/lib/supabase/client";
import { User } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface HeaderProps {
  user: User;
}

export function Header({ user }: HeaderProps) {
  const router = useRouter();
  const supabase = createBrowserClient();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <header className="border-b border-border bg-card">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-primary">QA Merge Desk</h1>
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 rounded-md p-2 hover:bg-muted"
            aria-label="User menu"
            aria-expanded={isMenuOpen}
          >
            {user.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={user.name || user.email}
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                {(user.name || user.email).charAt(0).toUpperCase()}
              </div>
            )}
            <span className="hidden md:inline-block text-sm font-medium">
              {user.name || user.email}
            </span>
          </button>

          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsMenuOpen(false)}
              />

              {/* Menu */}
              <div className="absolute right-0 top-full mt-2 z-50 w-48 rounded-md border border-border bg-card shadow-lg">
                <div className="p-2">
                  <div className="px-3 py-2 text-sm">
                    <p className="font-medium">{user.name || user.email}</p>
                    <p className="text-muted-foreground text-xs mt-1">
                      {user.role}
                    </p>
                  </div>
                  <div className="border-t border-border my-2" />
                  <button
                    onClick={handleLogout}
                    className="w-full px-3 py-2 text-left text-sm rounded-md hover:bg-muted"
                  >
                    Log out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
