export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Foydalanuvchilar</h1>
        <Link href="/users/new" className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
          + Yangi foydalanuvchi qo`shish
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 font-semibold text-gray-700">No</th>
              <th className="p-3 font-semibold text-gray-700">F.I.Sh</th>
              <th className="p-3 font-semibold text-gray-700">Login</th>
              <th className="p-3 font-semibold text-gray-700">Parol</th>
              <th className="p-3 font-semibold text-gray-700">Rol</th>
              <th className="p-3 font-semibold text-gray-700">Yaratilgan sana</th>
              <th className="p-3 font-semibold text-gray-700">Amallar</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{idx + 1}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 font-mono text-gray-600">{user.password}</td>
                <td className="p-3">
                  <span className="px-2 py-1 rounded text-xs font-semibold bg-indigo-100 text-indigo-800">
                    {user.role}
                  </span>
                </td>
                <td className="p-3">{format(user.createdAt, "dd.MM.yyyy")}</td>
                <td className="p-3">
                  <Link href={`/users/${user.id}/edit`} className="text-yellow-600 hover:underline">Tahrirlash</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

