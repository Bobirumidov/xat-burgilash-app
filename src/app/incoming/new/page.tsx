import { prisma } from "@/lib/prisma";
import IncomingForm from "./IncomingForm";

export default async function NewIncoming() {
  const users = await prisma.user.findMany({ select: { id: true, name: true } });
  const departments = await prisma.department.findMany({ select: { id: true, name: true } });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Yangi Kiruvchi Xat Qo`shish</h1>
      <IncomingForm users={users} departments={departments} />
    </div>
  );
}

