import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, {
  params
}: {
  params: Promise<{ deviceID: string }>;
}) {
  const { deviceID } = await params
  
  try {
    const device = await prisma.device.findUnique({
      where: { id: deviceID }
    });
  
    if (!device) return NextResponse.json({
      error: "Device not found"
    }, {
      status: 404
    });
  
    const command = device.lastCommand;
    await prisma.device.update({
      where: { id: deviceID },
      data: { lastCommand: "none" },
    });
  
    return NextResponse.json({ command });
  } catch (error) {
    console.error("Error fetching device command:", error);

    return NextResponse.json({
      error: "Failed to fetch device command"
    }, {
      status: 500
    });
  }
}

export async function POST(req: Request, {
  params
}: {
  params: Promise<{ deviceID: string }>;
}) {
  const { deviceID } = await params
  const { command } = await req.json();

  try {
    await prisma.device.update({
      where: { id: deviceID },
      data: { lastCommand: command },
    });
  
    return NextResponse.json({ message: "Command set" });
  } catch (error) {
    console.error("Error setting device command:", error);
    
    return NextResponse.json({
      error: "Failed to set device command"
    }, {
      status: 500
    });
  }
}