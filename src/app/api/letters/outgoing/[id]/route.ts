import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const formData = await req.formData();
    
    // Determine what to update
    const updateData: any = {
      regNumber: formData.get("regNumber") as string,
      receiverOrg: formData.get("receiverOrg") as string,
      outgoingType: formData.get("outgoingType") as string,
      subject: formData.get("subject") as string,
      content: formData.get("content") as string,
      status: formData.get("status") as string,
      comment: formData.get("comment") as string,
    };

    // Handle File Upload if a new file is provided
    const file = formData.get("file") as File;
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${Date.now()}_${file.name.replace(/\\s+/g, '_')}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      
      await writeFile(path.join(uploadDir, fileName), buffer).catch(async () => {
        const fs = require('fs');
        fs.mkdirSync(uploadDir, { recursive: true });
        await writeFile(path.join(uploadDir, fileName), buffer);
      });
      updateData.fileName = fileName;
    }

    const letter = await prisma.letter.update({
      where: { id },
      data: updateData
    });
    
    return NextResponse.json(letter);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}
