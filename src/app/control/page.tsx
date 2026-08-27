export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { format, differenceInDays } from "date-fns";
import DeleteLetterButton from "@/components/DeleteLetterButton";

export default async function ControlPage() {
  const letters = await prisma.letter.findMany({
    where: {
      type: "INCOMING",
      deadline: { not: null },
      status: { notIn: ["Bajarildi", "Nazoratdan chiqarildi"] }
    },
    orderBy: { deadline: "asc" }
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Ijro nazorati (Muddati yaqinlashgan xatlar)</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 font-semibold text-gray-700">No</th>
              <th className="p-3 font-semibold text-gray-700">Raqami</th>
              <th className="p-3 font-semibold text-gray-700">Tashkilot</th>
              <th className="p-3 font-semibold text-gray-700">Mavzu</th>
              <th className="p-3 font-semibold text-gray-700">Ijro muddati</th>
              <th className="p-3 font-semibold text-gray-700">Holat</th>
              <th className="p-3 font-semibold text-gray-700">Amallar</th>
            </tr>
          </thead>
          <tbody>
            {letters.map((letter, idx) => {
              const daysLeft = differenceInDays(new Date(letter.deadline!), new Date());
              const isLate = daysLeft < 0;
              const isWarning = daysLeft >= 0 && daysLeft <= 3;
              
              let rowClass = "border-b hover:bg-gray-50";
              if (isLate) rowClass = "border-b bg-red-50 hover:bg-red-100";
              else if (isWarning) rowClass = "border-b bg-yellow-50 hover:bg-yellow-100";

              return (
                <tr key={letter.id} className={rowClass}>
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3 font-medium">{letter.regNumber}</td>
                  <td className="p-3">{letter.senderOrg}</td>
                  <td className="p-3">{letter.subject}</td>
                  <td className="p-3 font-bold">
                    {format(new Date(letter.deadline!), "dd.MM.yyyy")}
                    {isLate && <span className="ml-2 text-xs text-red-600">(Muddati o'tgan)</span>}
                    {isWarning && <span className="ml-2 text-xs text-yellow-600">({daysLeft} kun qoldi)</span>}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-200 text-gray-800">
                      {letter.status}
                    </span>
                  </td>
                  <td className="p-3 space-x-2 text-sm">
                    {letter.fileName && (
                      <a href={`/uploads/${letter.fileName}`} target="_blank" className="text-purple-600 hover:underline">Fayl</a>
                    )}
                    <Link href={`/incoming/${letter.id}`} className="text-blue-600 hover:underline">Ko'rish</Link>
                    <Link href={`/incoming/${letter.id}/edit`} className="text-yellow-600 hover:underline">Tahrirlash</Link>
                    <DeleteLetterButton id={letter.id} />
                  </td>
                </tr>
              );
            })}
            {letters.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500">Nazoratga olingan ochiq xatlar yo'q.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

