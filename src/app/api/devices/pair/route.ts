import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { deviceId } = await req.json();

  try {
    const exists = await prisma.device.findUnique({ where: { id: deviceId } });
    if (exists) return NextResponse.json({ message: "Already registered" });

    await prisma.device.create({
      data: {
        id: deviceId,
        name: "Unclaimed Device",
        registeredToId: null,
      },
    });

    return NextResponse.json({ message: "Device registered" });
  } catch (error) {
    console.error("Error pairing device:", error);

    return NextResponse.json({
      error: "Failed to pair device"
    }, {
      status: 500
    });
  }
}
