"use client"

import { useState } from "react"
import { Wifi, Lock, Unlock, Shield, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AddDeviceDialog } from "@/components/add-device-dialog"

interface Device {
  id: string
  name: string
  ipAddress: string
  status: "locked" | "unlocked"
  isOnline: boolean
  lastSeen: string
}

interface User {
  id: string
  email: string
  deviceAccess: string[]
}

export function DoorLockDashboard() {
  const [ipAddress, setIpAddress] = useState("192.168.1.100")
  const [devices, setDevices] = useState<Device[]>([
    {
      id: "1",
      name: "Front Door",
      ipAddress: "192.168.1.101",
      status: "locked",
      isOnline: true,
      lastSeen: "2 minutes ago",
    },
    {
      id: "2",
      name: "Back Door",
      ipAddress: "192.168.1.102",
      status: "unlocked",
      isOnline: true,
      lastSeen: "1 minute ago",
    },
    {
      id: "3",
      name: "Garage Door",
      ipAddress: "192.168.1.103",
      status: "locked",
      isOnline: false,
      lastSeen: "5 minutes ago",
    },
  ])

  const [users] = useState<User[]>([
    {
      id: "1",
      email: "john@example.com",
      deviceAccess: ["1", "2"],
    },
  ])

  const [showAddDevice, setShowAddDevice] = useState(false)
  const [editingDevice, setEditingDevice] = useState<string | null>(null)
  const [editingName, setEditingName] = useState("")

  const toggleDeviceLock = (deviceId: string) => {
    setDevices(
      devices.map((device) =>
        device.id === deviceId ? { ...device, status: device.status === "locked" ? "unlocked" : "locked" } : device,
      ),
    )
  }

  const addDevice = (device: Omit<Device, "id">) => {
    const newDevice = {
      ...device,
      id: (devices.length + 1).toString(),
    }
    setDevices([...devices, newDevice])
  }

  const updateDeviceName = (deviceId: string, newName: string) => {
    setDevices(devices.map((device) => (device.id === deviceId ? { ...device, name: newName } : device)))
    setEditingDevice(null)
    setEditingName("")
  }

  const startEditing = (device: Device) => {
    setEditingDevice(device.id)
    setEditingName(device.name)
  }

  const cancelEditing = () => {
    setEditingDevice(null)
    setEditingName("")
  }

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <div className="flex h-full flex-col">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              <h1 className="text-xl font-semibold">Smart Door Lock Control</h1>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="mx-auto max-w-6xl space-y-6">
              {/* IP Address Input */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wifi className="h-5 w-5" />
                    Network Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-4">
                    <div className="flex-1">
                      <Label htmlFor="ip-address">ESP Device IP Address</Label>
                      <Input
                        id="ip-address"
                        value={ipAddress}
                        onChange={(e) => setIpAddress(e.target.value)}
                        placeholder="192.168.1.100"
                        className="mt-1"
                      />
                    </div>
                    <Button>Connect</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Devices Grid */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {devices.map((device) => (
                  <Card key={device.id} className="relative">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        {editingDevice === device.id ? (
                          <div className="flex flex-col gap-2 w-full sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex flex-col gap-2 w-full sm:flex-row sm:items-center sm:gap-2 sm:flex-1">
                              <Input
                                value={editingName}
                                onChange={(e) => setEditingName(e.target.value)}
                                className="text-lg font-semibold w-full"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    updateDeviceName(device.id, editingName)
                                  } else if (e.key === "Escape") {
                                    cancelEditing()
                                  }
                                }}
                                autoFocus
                              />
                              <div className="flex gap-2 w-full sm:w-auto">
                                <Button
                                  size="sm"
                                  onClick={() => updateDeviceName(device.id, editingName)}
                                  disabled={!editingName.trim()}
                                  className="flex-1 sm:flex-none"
                                >
                                  Save
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={cancelEditing}
                                  className="flex-1 sm:flex-none"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 group">
                            <CardTitle
                              className="text-lg cursor-pointer hover:text-primary transition-colors flex-1"
                              onClick={() => startEditing(device)}
                              title="Click to edit device name"
                            >
                              {device.name}
                            </CardTitle>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                              onClick={() => startEditing(device)}
                              title="Edit device name"
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                        {editingDevice !== device.id && (
                          <Badge
                            variant={device.isOnline ? "default" : "secondary"}
                            className={device.isOnline ? "bg-green-500" : ""}
                          >
                            {device.isOnline ? "Online" : "Offline"}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">IP: {device.ipAddress}</p>
                      <p className="text-xs text-muted-foreground">Last seen: {device.lastSeen}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {device.status === "locked" ? (
                            <Lock className="h-5 w-5 text-red-500" />
                          ) : (
                            <Unlock className="h-5 w-5 text-green-500" />
                          )}
                          <span className="font-medium capitalize">{device.status}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`toggle-${device.id}`} className="text-sm">
                            {device.status === "locked" ? "Unlock" : "Lock"}
                          </Label>
                          <Switch
                            id={`toggle-${device.id}`}
                            checked={device.status === "unlocked"}
                            onCheckedChange={() => toggleDeviceLock(device.id)}
                            disabled={!device.isOnline}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Shared Access Users */}
              {users.length > 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Shared Access</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {users.slice(1).map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-2 border rounded">
                          <span>{user.email}</span>
                          <div className="flex gap-1">
                            {user.deviceAccess.map((deviceId) => {
                              const device = devices.find((d) => d.id === deviceId)
                              return device ? (
                                <Badge key={deviceId} variant="outline" className="text-xs">
                                  {device.name}
                                </Badge>
                              ) : null
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </main>
        </div>
      </SidebarInset>

      <AddDeviceDialog open={showAddDevice} onOpenChange={setShowAddDevice} onAddDevice={addDevice} />
    </>
  )
}
