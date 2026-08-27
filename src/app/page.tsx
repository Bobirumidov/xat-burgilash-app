export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma";

export default async function Dashboard() {
  const incomingCount = await prisma.letter.count({ where: { type: "INCOMING" } });
  const outgoingCount = await prisma.letter.count({ where: { type: "OUTGOING" } });
  
  // Bugungi xatlar
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const todayCount = await prisma.letter.count({ where: { regDate: { gte: startOfDay } } });
  
  const inProgressCount = await prisma.letter.count({ where: { status: "Ijroda" } });
  const completedCount = await prisma.letter.count({ where: { status: "Bajarildi" } });
  
  // Muddati o'tgan xatlar (faqat ijroda bo'lgan va muddati o'tgan)
  const overdueCount = await prisma.letter.count({ 
    where: { status: "Ijroda", deadline: { lt: new Date() } } 
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h2 className="text-gray-500 text-sm font-semibold">Jami Kiruvchi</h2>
          <p className="text-3xl font-bold">{incomingCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h2 className="text-gray-500 text-sm font-semibold">Jami Chiquvchi</h2>
          <p className="text-3xl font-bold">{outgoingCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <h2 className="text-gray-500 text-sm font-semibold">Bugungi Xatlar</h2>
          <p className="text-3xl font-bold">{todayCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <h2 className="text-gray-500 text-sm font-semibold">Ijrodagi Xatlar</h2>
          <p className="text-3xl font-bold">{inProgressCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
          <h2 className="text-gray-500 text-sm font-semibold">Muddati O'tgan Xatlar</h2>
          <p className="text-3xl font-bold">{overdueCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-teal-500">
          <h2 className="text-gray-500 text-sm font-semibold">Bajarilgan Xatlar</h2>
          <p className="text-3xl font-bold">{completedCount}</p>
        </div>
      </div>
    </div>
  );
}

