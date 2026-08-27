import UserForm from "./UserForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function NewUserPage() {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Yangi Foydalanuvchi Qo`shish</h1>
      <UserForm />
    </div>
  );
}
