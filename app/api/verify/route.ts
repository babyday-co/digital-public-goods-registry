import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateSHA256Hash } from "@/lib/hash";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content } = body as { content: string };

    if (!content) {
      return NextResponse.json(
        { error: "content is required" },
        { status: 400 }
      );
    }

    const contentHash = generateSHA256Hash(content);

    const entry = await prisma.knowledge.findUnique({
      where: { contentHash },
      select: {
        id: true,
        title: true,
        contributor: true,
        contentHash: true,
        txHash: true,
        createdAt: true,
      },
    });

    if (entry) {
      return NextResponse.json({ verified: true, contentHash, entry });
    }

    return NextResponse.json({ verified: false, contentHash });
  } catch (error) {
    console.error("Verify error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
