"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

export default function EditIncomingForm({ letter }: { letter: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formattedSenderDate = letter.senderDate ? format(new Date(letter.senderDate), "yyyy-MM-dd") : "";
  const formattedDeadline = letter.deadline ? format(new Date(letter.deadline), "yyyy-MM-dd") : "";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    
    const res = await fetch(`/api/letters/incoming/${letter.id}`, {
      method: "PUT",
      body: formData, // Sending FormData directly for file upload
    });
    
    if (res.ok) {
      router.push("/incoming");
      router.refresh();
    } else {
      const err = await res.json();
      setError(err.error || "Xatolik yuz berdi");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow max-w-4xl space-y-4">
      {error && <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>}
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Registratsiya raqami</label>
          <input required defaultValue={letter.regNumber} name="regNumber" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Yuboruvchi tashkilot</label>
          <input required defaultValue={letter.senderOrg || ""} name="senderOrg" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Yuboruvchi xat raqami</label>
          <input required defaultValue={letter.senderRegNumber || ""} name="senderRegNumber" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Yuboruvchi xat sanasi</label>
          <input required defaultValue={formattedSenderDate} name="senderDate" type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Xat mavzusi</label>
          <input required defaultValue={letter.subject || ""} name="subject" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Qisqacha mazmuni</label>
          <textarea defaultValue={letter.content || ""} name="content" rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2"></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Kimga yo'naltirilgani</label>
          <input defaultValue={letter.directedTo || ""} name="directedTo" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Rezolyutsiya</label>
          <input defaultValue={letter.resolution || ""} name="resolution" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Ijro muddati</label>
          <input defaultValue={formattedDeadline} name="deadline" type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select defaultValue={letter.status} name="status" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2">
            <option value="Yangi">Yangi</option>
            <option value="Rahbariyat ko'rib chiqmoqda">Rahbariyat ko'rib chiqmoqda</option>
            <option value="Ijroga berildi">Ijroga berildi</option>
            <option value="Ijroda">Ijroda</option>
            <option value="Bajarildi">Bajarildi</option>
            <option value="Nazoratdan chiqarildi">Nazoratdan chiqarildi</option>
          </select>
        </div>
        <div className="col-span-2 border-t pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Yangi fayl yuklash (faqat eskisi o'rniga)</label>
          <input name="file" type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          {letter.fileName && <p className="text-sm text-gray-500 mt-2">Hozirgi fayl: {letter.fileName}</p>}
        </div>
      </div>
      <div className="pt-4 flex justify-end">
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 disabled:opacity-50">
          {loading ? "Saqlanmoqda..." : "Saqlash"}
        </button>
      </div>
    </form>
  );
}
