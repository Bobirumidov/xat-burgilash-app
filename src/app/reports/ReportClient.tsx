"use client";

import { format } from "date-fns";
import * as XLSX from "xlsx";

export default function ReportClient({ letters, defaultValues }: { letters: any[], defaultValues: any }) {
  
  const exportToExcel = () => {
    const data = letters.map((l, i) => ({
      "№": i + 1,
      "Turi": l.type === "INCOMING" ? "Kiruvchi" : "Chiquvchi",
      "Reg. Raqam": l.regNumber,
      "Sana": format(new Date(l.regDate), "dd.MM.yyyy"),
      "Tashkilot": l.senderOrg || l.receiverOrg || "",
      "Mavzu": l.subject,
      "Status": l.status
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Hisobot");
    XLSX.writeFile(workbook, "Hisobot.xlsx");
  };

  const exportToPdf = () => {
    window.print();
  };

  return (
    <div>
      <form method="GET" action="/reports" className="bg-white p-4 rounded-lg shadow flex flex-wrap gap-4 mb-6 print:hidden items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700">Dan</label>
          <input type="date" name="from" defaultValue={defaultValues.from} className="mt-1 block rounded-md border-gray-300 shadow-sm border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Gacha</label>
          <input type="date" name="to" defaultValue={defaultValues.to} className="mt-1 block rounded-md border-gray-300 shadow-sm border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Xat turi</label>
          <select name="type" defaultValue={defaultValues.type} className="mt-1 block rounded-md border-gray-300 shadow-sm border p-2">
            <option value="ALL">Barchasi</option>
            <option value="INCOMING">Kiruvchi</option>
            <option value="OUTGOING">Chiquvchi</option>
          </select>
        </div>
        <div>
          <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded shadow hover:bg-gray-900">
            Filtrlash
          </button>
        </div>
        <div className="flex-1 flex justify-end space-x-2">
          <button type="button" onClick={exportToExcel} className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700">
            Excel ga yuklash
          </button>
          <button type="button" onClick={exportToPdf} className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700">
            PDF / Chop etish
          </button>
        </div>
      </form>

      <div className="bg-white rounded-lg shadow overflow-hidden print:shadow-none">
        <h2 className="hidden print:block text-2xl font-bold p-4 text-center">Xatlar Hisoboti</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b print:bg-white print:border-black">
              <th className="p-3 font-semibold text-gray-700 print:border print:border-black">No</th>
              <th className="p-3 font-semibold text-gray-700 print:border print:border-black">Turi</th>
              <th className="p-3 font-semibold text-gray-700 print:border print:border-black">Registratsiya raqami</th>
              <th className="p-3 font-semibold text-gray-700 print:border print:border-black">Sana</th>
              <th className="p-3 font-semibold text-gray-700 print:border print:border-black">Tashkilot</th>
              <th className="p-3 font-semibold text-gray-700 print:border print:border-black">Mavzu</th>
              <th className="p-3 font-semibold text-gray-700 print:border print:border-black">Status</th>
            </tr>
          </thead>
          <tbody>
            {letters.map((letter, idx) => (
              <tr key={letter.id} className="border-b hover:bg-gray-50 print:border-black">
                <td className="p-3 print:border print:border-black">{idx + 1}</td>
                <td className="p-3 print:border print:border-black">{letter.type === "INCOMING" ? "Kiruvchi" : "Chiquvchi"}</td>
                <td className="p-3 print:border print:border-black">{letter.regNumber}</td>
                <td className="p-3 print:border print:border-black">{format(new Date(letter.regDate), "dd.MM.yyyy")}</td>
                <td className="p-3 print:border print:border-black">{letter.senderOrg || letter.receiverOrg}</td>
                <td className="p-3 print:border print:border-black">{letter.subject}</td>
                <td className="p-3 print:border print:border-black">{letter.status}</td>
              </tr>
            ))}
            {letters.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500">Hech qanday ma'lumot topilmadi.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
