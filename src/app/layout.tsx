import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Xat Registratsiya" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role;
  const userName = session?.user?.name;
  
  // We need to fetch the user from DB to get the avatar since session doesn't have it
  let avatar = null;
  if (session?.user?.email) {
    const dbUser = await prisma.user.findUnique({ where: { email: session.user.email }});
    avatar = dbUser?.avatar;
  }

  return (
    <html lang="uz">
      <body className="flex h-screen bg-gray-100">
        <Sidebar role={role} userName={userName || ""} avatar={avatar} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </body>
    </html>
  );
}

