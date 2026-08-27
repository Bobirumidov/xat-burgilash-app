import { prisma } from "@/lib/prisma";
import EditUserForm from "./EditUserForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== "ADMIN") {
    redirect("/");
  }

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
