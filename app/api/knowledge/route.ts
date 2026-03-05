import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const entries = await prisma.knowledge.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        contributor: true,
        contentHash: true,
        txHash: true,
        createdAt: true,
      },
    });
    return NextResponse.json(entries);
  } catch (error) {
    console.error("Knowledge fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
