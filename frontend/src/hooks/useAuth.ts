"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/utils/auth";

export default function useAuth(role: "student" | "admin") {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const login = (credentials: any) => { }

  useEffect(() => {
    const u = getUser();
    if (!u || u.role !== role) {
      router.push("/login");
    } else {
      setUser(u);
    }
    setLoading(false);
  }, [router, role]);

  return { user, loading };
}
