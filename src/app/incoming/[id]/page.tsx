import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";
import PrintButton from "@/components/PrintButton";

export default async function ViewIncomingLetterPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const letter = await prisma.letter.findUnique({
    where: { id: resolvedParams.id }
  });

  if (!letter) {
    return <div className="p-8">Xat topilmadi</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Kiruvchi xat ma'lumotlari</h1>
        <div className="space-x-2">
          <Link href={`/incoming`} className="bg-gray-600 text-white px-4 py-2 rounded shadow hover:bg-gray-700">Orqaga</Link>
          <PrintButton />
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow space-y-6">
        <div className="grid grid-cols-2 gap-6 border-b pb-6">
          <div>
            <p className="text-sm text-gray-500">Registratsiya raqami</p>
            <p className="font-semibold text-lg">{letter.regNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Registratsiya sanasi</p>
            <p className="font-semibold text-lg">{format(new Date(letter.regDate), "dd.MM.yyyy")}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Yuboruvchi tashkilot</p>
            <p className="font-semibold">{letter.senderOrg || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Holati</p>
            <p className="font-semibold">
              <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-800">
                {letter.status}
              </span>
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Yuboruvchi xat raqami va sanasi</p>
            <p className="font-semibold">{letter.senderRegNumber || "-"} ({letter.senderDate ? format(new Date(letter.senderDate), "dd.MM.yyyy") : "-"})</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Ijro muddati</p>
            <p className="font-semibold">{letter.deadline ? format(new Date(letter.deadline), "dd.MM.yyyy") : "-"}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500">Mavzu</p>
          <p className="font-semibold text-lg">{letter.subject}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Qisqacha mazmuni</p>
          <p className="whitespace-pre-wrap mt-1">{letter.content || "-"}</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Kimga yo'naltirilgani</p>
            <p className="font-semibold">{letter.directedTo || "-"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Rezolyutsiya</p>
            <p className="font-semibold">{letter.resolution || "-"}</p>
          </div>
        </div>

        {letter.fileName && (
          <div className="pt-6 border-t print:hidden">
            <p className="text-sm text-gray-500 mb-2">Ilova qilingan fayl:</p>
            <a href={`/uploads/${letter.fileName}`} target="_blank" className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded hover:bg-purple-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              <span>{letter.fileName.split('_').slice(1).join('_') || letter.fileName}</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
