import { prisma } from "@/lib/prisma";
import ReportClient from "./ReportClient";

export default async function ReportsPage({ searchParams }: { searchParams: Promise<{ from?: string, to?: string, type?: string }> }) {
  const params = await searchParams;
  const from = params?.from;
  const to = params?.to;
  const type = params?.type;
  
  const whereClause: any = {};
  if (type && type !== "ALL") whereClause.type = type;
  if (from || to) {
    whereClause.regDate = {};
    if (from) whereClause.regDate.gte = new Date(from);
    if (to) {
      const toDate = new Date(to);
      toDate.setHours(23, 59, 59, 999);
      whereClause.regDate.lte = toDate;
    }
  }

  const letters = await prisma.letter.findMany({
    where: whereClause,
    orderBy: { regDate: "desc" }
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 print:hidden">Xatlar Hisoboti</h1>
      <ReportClient letters={letters} defaultValues={{ from: from || "", to: to || "", type: type || "ALL" }} />
    </div>
  );
}
