import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const metadata = { title: "Xat Registratsiya" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role;
  const userName = session?.user?.name;

  return (
    <html lang="uz">
      <body className="flex h-screen bg-gray-100">
        <Sidebar role={role} userName={userName || ""} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </body>
    </html>
  );
}

