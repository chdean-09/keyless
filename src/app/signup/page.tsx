"use client"
import { authClient } from "@/lib/auth/auth-client"
import { redirect } from "next/navigation"

export default function Signup() {
  const {
    data: session,
  } = authClient.useSession()

  if (session) {
    redirect("/")
  }

  return (
    <div>Signup</div>
  )
}