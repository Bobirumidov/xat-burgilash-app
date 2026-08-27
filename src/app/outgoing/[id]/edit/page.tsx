import { prisma } from "@/lib/prisma";
import Link from "next/link";
import EditOutgoingForm from "./EditOutgoingForm";

export default async function EditOutgoingLetterPage({ params }: { params: Promise<{ id: string }> }) {
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
        <h1 className="text-3xl font-bold">Chiquvchi xatni tahrirlash</h1>
        <Link href={`/outgoing`} className="bg-gray-600 text-white px-4 py-2 rounded shadow hover:bg-gray-700">Orqaga</Link>
      </div>
      <EditOutgoingForm letter={letter} />
    </div>
  );
}
