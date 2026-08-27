import { prisma } from "@/lib/prisma";
import OutgoingForm from "./OutgoingForm";

export default async function NewOutgoing() {
  const users = await prisma.user.findMany({ select: { id: true, name: true } });
  const departments = await prisma.department.findMany({ select: { id: true, name: true } });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Yangi Chiquvchi Xat Qo`shish</h1>
      <OutgoingForm users={users} departments={departments} />
    </div>
  );
}

