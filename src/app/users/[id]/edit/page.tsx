import { prisma } from "@/lib/prisma";
import EditUserForm from "./EditUserForm";

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const user = await prisma.user.findUnique({
    where: { id: resolvedParams.id }
  });

  if (!user) {
    return <div className="p-8">Foydalanuvchi topilmadi</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Foydalanuvchini Tahrirlash</h1>
      <EditUserForm user={user} />
    </div>
  );
}
