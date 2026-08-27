import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";
import DeleteLetterButton from "@/components/DeleteLetterButton";

export default async function IncomingLetters({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = await searchParams;
  const q = params?.q || "";
  
  const letters = await prisma.letter.findMany({
    where: { 
      type: "INCOMING",
      ...(q ? {
        OR: [
          { regNumber: { contains: q } },
          { senderOrg: { contains: q } },
          { subject: { contains: q } },
          { status: { contains: q } },
        ]
      } : {})
    },
    orderBy: { regDate: "desc" }
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Kiruvchi xatlar</h1>
        <Link href="/incoming/new" className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
          + Yangi xat qo'shish
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden p-6 mb-6">
        <form method="GET" action="/incoming" className="flex gap-4">
          <input 
            type="text" 
            name="q" 
            defaultValue={q} 
            placeholder="Raqam, tashkilot, mavzu yoki status bo'yicha qidirish..." 
            className="flex-1 rounded-md border-gray-300 shadow-sm border p-2"
          />
          <button type="submit" className="bg-gray-800 text-white px-6 py-2 rounded shadow hover:bg-gray-900">
            Qidirish
          </button>
          {q && (
            <Link href="/incoming" className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600">
              Tozalash
            </Link>
          )}
        </form>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 font-semibold text-gray-700">No</th>
              <th className="p-3 font-semibold text-gray-700">Registratsiya raqami</th>
              <th className="p-3 font-semibold text-gray-700">Sana</th>
              <th className="p-3 font-semibold text-gray-700">Tashkilot</th>
              <th className="p-3 font-semibold text-gray-700">Mavzu</th>
              <th className="p-3 font-semibold text-gray-700">Status</th>
              <th className="p-3 font-semibold text-gray-700">Amallar</th>
            </tr>
          </thead>
          <tbody>
            {letters.map((letter, idx) => (
              <tr key={letter.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{idx + 1}</td>
                <td className="p-3">{letter.regNumber}</td>
                <td className="p-3">{format(letter.regDate, "dd.MM.yyyy")}</td>
                <td className="p-3">{letter.senderOrg}</td>
                <td className="p-3">{letter.subject}</td>
                <td className="p-3">
                  <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-800">
                    {letter.status}
                  </span>
                </td>
                <td className="p-3 space-x-2 text-sm">
                  {letter.fileName && (
                    <a href={`/api/uploads/${letter.fileName}`} target="_blank" className="text-purple-600 hover:underline">Fayl</a>
                  )}
                  <Link href={`/incoming/${letter.id}`} className="text-blue-600 hover:underline">Ko'rish</Link>
                  <Link href={`/incoming/${letter.id}/edit`} className="text-yellow-600 hover:underline">Tahrirlash</Link>
                  <DeleteLetterButton id={letter.id} />
                </td>
              </tr>
            ))}
            {letters.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500">Hech qanday xat topilmadi.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
