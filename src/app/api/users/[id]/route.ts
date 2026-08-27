import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { writeFile } from "fs/promises";
import path from "path";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Ruxsat yo'q" }, { status: 403 });
  }

  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const formData = await req.formData();
    
    let avatarName: string | null = null;
    const file = formData.get("file") as File;
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      avatarName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      
      await writeFile(path.join(uploadDir, avatarName), buffer).catch(async () => {
        const fs = require('fs');
        fs.mkdirSync(uploadDir, { recursive: true });
        await writeFile(path.join(uploadDir, avatarName!), buffer);
      });
    }

    const password = formData.get("password") as string;
    
    const updateData: any = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as string,
    };

    if (password && password.trim() !== "") {
      updateData.password = password;
    }
    if (avatarName) {
      updateData.avatar = avatarName;
    }

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
    });
    
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Foydalanuvchini yangilashda xatolik yuz berdi" }, { status: 500 });
  }
}
