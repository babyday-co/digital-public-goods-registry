import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateSHA256Hash } from "@/lib/hash";
import { registerKnowledgeOnChain } from "@/lib/blockchain";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, contributor } = body as {
      title: string;
      content: string;
      contributor: string;
    };

    if (!title || !content || !contributor) {
      return NextResponse.json(
        { error: "title, content, and contributor are required" },
        { status: 400 }
      );
    }

    const contentHash = generateSHA256Hash(content);

    const existing = await prisma.knowledge.findUnique({
      where: { contentHash },
    });
    if (existing) {
      return NextResponse.json(
        { error: "This exact content is already registered" },
        { status: 409 }
      );
    }

    const txHash = await registerKnowledgeOnChain(contentHash, title);

    const entry = await prisma.knowledge.create({
      data: { title, content, contributor, contentHash, txHash },
    });

    return NextResponse.json({ success: true, entry }, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
