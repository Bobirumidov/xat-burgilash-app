import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const regNumber = formData.get("regNumber") as string;
    
    // Handle File Upload
    let fileName: string | null = null;
    const file = formData.get("file") as File;
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      
      // Ensure directory exists (basic approach without fs.mkdirSync checks for brevity, but let's use a safe approach)
      await writeFile(path.join(uploadDir, fileName), buffer).catch(async () => {
        const fs = require('fs');
        fs.mkdirSync(uploadDir, { recursive: true });
        await writeFile(path.join(uploadDir, fileName), buffer);
      });
    }

    const senderDateStr = formData.get("senderDate") as string;
    const deadlineStr = formData.get("deadline") as string;

    const letter = await prisma.letter.create({
      data: {
        type: "INCOMING",
        regNumber,
        senderOrg: formData.get("senderOrg") as string,
        senderRegNumber: formData.get("senderRegNumber") as string,
        senderDate: senderDateStr ? new Date(senderDateStr) : null,
        subject: formData.get("subject") as string,
        content: formData.get("content") as string,
        directedTo: formData.get("directedTo") as string,
        resolution: formData.get("resolution") as string,
        deadline: deadlineStr ? new Date(deadlineStr) : null,
        status: formData.get("status") as string || "Yangi",
        fileName: fileName,
      }
    });
    
    return NextResponse.json(letter);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}
