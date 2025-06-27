import { DoorLockDashboard } from "@/components/door-lock-dashboard"
import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})

  if (!session) {
    redirect("/auth")
  }

  return (
    <DoorLockDashboard />
  )
}
