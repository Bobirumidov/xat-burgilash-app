"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    const res = await fetch("/api/users", {
      method: "POST",
      body: formData,
    });
    
    if (res.ok) {
      router.push("/users");
      router.refresh();
    } else {
      const err = await res.json();
      setError(err.error || "Xatolik yuz berdi");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow max-w-lg space-y-4">
      {error && <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>}
      
      <div>
        <label className="block text-sm font-medium text-gray-700">F.I.Sh</label>
        <input required name="name" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Login</label>
        <input required name="email" type="text" placeholder="Masalan: b.umidov" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Parol</label>
        <input required name="password" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Huquq (Rol)</label>
        <select name="role" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2">
          <option value="ADMIN">Administrator</option>
          <option value="REGISTRAR">Registrator</option>
          <option value="USER">Foydalanuvchi</option>
          <option value="MANAGEMENT">Rahbariyat</option>
        </select>
      </div>
      <div className="border-t pt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Rasm yuklash (Avatar)</label>
        <input name="file" type="file" accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
      </div>
      
      <div className="pt-4 flex justify-end">
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 disabled:opacity-50">
          {loading ? "Saqlanmoqda..." : "Saqlash"}
        </button>
      </div>
    </form>
  );
}
