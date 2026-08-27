"use client";

import { useRouter } from "next/navigation";

export default function DeleteLetterButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("Haqiqatan ham bu xatni o'chirmoqchimisiz?")) {
      const res = await fetch(`/api/letters/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Xatolik yuz berdi");
      }
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-600 hover:underline">
      O'chirish
    </button>
  );
}
