import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // In a real app, hash the password (e.g. bcrypt.hash)
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password, 
        role: data.role,
      }
    });
    
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Xatolik yuz berdi. Email band bo`lishi mumkin." }, { status: 500 });
  }
}
