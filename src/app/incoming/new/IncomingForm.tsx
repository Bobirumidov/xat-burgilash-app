"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function IncomingForm({ users, departments }: { users: any[], departments: any[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    await fetch("/api/letters/incoming", {
      method: "POST",
      body: formData, // Sending FormData directly for file upload
    });
    
    router.push("/incoming");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow max-w-4xl space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Registratsiya raqami</label>
          <input required name="regNumber" type="text" placeholder="Masalan: 29-01" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Yuboruvchi tashkilot</label>
          <input required name="senderOrg" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Yuboruvchi xat raqami</label>
          <input required name="senderRegNumber" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Yuboruvchi xat sanasi</label>
          <input required name="senderDate" type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Xat mavzusi</label>
          <input required name="subject" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Qisqacha mazmuni</label>
          <textarea name="content" rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2"></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Kimga yo'naltirilgani</label>
          <select name="directedTo" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2">
            <option value="">Tanlang...</option>
            {users.map((u: any) => (
              <option key={u.id} value={u.name}>{u.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Rezolyutsiya</label>
          <input name="resolution" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Ijro muddati</label>
          <input name="deadline" type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select name="status" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2">
            <option value="Yangi">Yangi</option>
            <option value="Rahbariyat ko'rib chiqmoqda">Rahbariyat ko'rib chiqmoqda</option>
            <option value="Ijroga berildi">Ijroga berildi</option>
            <option value="Ijroda">Ijroda</option>
            <option value="Bajarildi">Bajarildi</option>
            <option value="Nazoratdan chiqarildi">Nazoratdan chiqarildi</option>
          </select>
        </div>
        <div className="col-span-2 border-t pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Xat faylini biriktirish (PDF, Word, JPG)</label>
          <input name="file" type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
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
