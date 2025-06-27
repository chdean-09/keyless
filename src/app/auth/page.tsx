"use client"

import { useState } from "react"
import { LoginForm } from "@/components/auth/login"
import { SignupForm } from "@/components/auth/signup"
import { authClient } from "@/lib/auth/auth-client"
import { redirect } from "next/navigation"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  const { data: session } = authClient.useSession()

  if (session) {
    redirect("/")
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        {isLogin ? (
          <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
        ) : (
          <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  )
}
