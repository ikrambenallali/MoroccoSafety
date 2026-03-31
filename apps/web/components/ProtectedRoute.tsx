"use client"

import { ReactNode, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { RootState } from "../features/store"

type Role = "citizen" | "authority" | "admin"

interface ProtectedRouteProps {
  children: ReactNode
  allowedRoles?: Role[]
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const router = useRouter();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace('/login');
      return;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      router.replace('/login');
    }
  }, [user, loading, allowedRoles, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
    return <div>Redirecting...</div>;
  }

  return <>{children}</>;
}