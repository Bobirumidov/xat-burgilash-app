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
      
      await writeFile(path.join(uploadDir, fileName), buffer).catch(async () => {
        const fs = require('fs');
        fs.mkdirSync(uploadDir, { recursive: true });
        await writeFile(path.join(uploadDir, fileName!), buffer);
      });
    }

    const letter = await prisma.letter.create({
      data: {
        type: "OUTGOING",
        regNumber,
        receiverOrg: formData.get("receiverOrg") as string,
        outgoingType: formData.get("outgoingType") as string,
        subject: formData.get("subject") as string,
        content: formData.get("content") as string,
        status: formData.get("status") as string || "Tayyorlanmoqda",
        comment: formData.get("comment") as string,
        fileName: fileName,
      }
    });
    
    return NextResponse.json(letter);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}
