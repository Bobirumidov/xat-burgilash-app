import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Ruxsat yo'q" }, { status: 403 });
  }

  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const data = await req.json();
    
    const updateData: any = {
      name: data.name,
      email: data.email,
      role: data.role,
    };

    if (data.password && data.password.trim() !== "") {
      updateData.password = data.password;
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
