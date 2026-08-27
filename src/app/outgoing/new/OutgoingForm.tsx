"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OutgoingForm({ users, departments, currentUser }: { users: any[], departments: any[], currentUser?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Filter users to only include the current user so they can only select themselves
  const selectableUsers = users.filter((u: any) => u.name === currentUser);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    await fetch("/api/letters/outgoing", {
      method: "POST",
      body: formData, // Sending FormData directly for file upload
    });
    
    router.push("/outgoing");
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
          <label className="block text-sm font-medium text-gray-700">Yuboruvchi (Kim tomonidan)</label>
          <select name="senderOrg" defaultValue={currentUser || ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2">
            {selectableUsers.length > 0 ? (
              selectableUsers.map((u: any) => (
                <option key={u.id} value={u.name}>{u.name}</option>
              ))
            ) : (
              <option value={currentUser || ""}>{currentUser}</option>
            )}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Qabul qiluvchi tashkilot</label>
          <input required name="receiverOrg" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Xat turi</label>
          <input name="outgoingType" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Xat mavzusi</label>
          <input required name="subject" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Xat mazmuni</label>
          <textarea name="content" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2"></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select name="status" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2">
            <option value="Tayyorlanmoqda">Tayyorlanmoqda</option>
            <option value="Imzolashda">Imzolashda</option>
            <option value="Yuborildi">Yuborildi</option>
            <option value="Bajarildi">Bajarildi</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Izoh</label>
          <input name="comment" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" />
        </div>
        <div className="col-span-2 border-t pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Xat faylini biriktirish (PDF, Word, JPG)</label>
          <input name="file" type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
        </div>
      </div>
      <div className="pt-4 flex justify-end">
        <button type="submit" disabled={loading} className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 disabled:opacity-50">
          {loading ? "Saqlanmoqda..." : "Saqlash"}
        </button>
      </div>
    </form>
  );
}
