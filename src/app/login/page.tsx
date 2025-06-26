"use client"
import { authClient } from "@/lib/auth/auth-client"
import { redirect } from "next/navigation"

export default function Login() {
  const {
    data: session,
  } = authClient.useSession()

  if (session) {
    redirect("/")
  }

  return (
    <div>Login</div>
  )
}