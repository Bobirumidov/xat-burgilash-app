import Link from "next/link";
export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col print:hidden">
      <div className="p-4 text-xl font-bold border-b border-gray-700">Xat_Burgilash.uz</div>
      <nav className="flex-1 p-4 space-y-2">
        <Link href="/" className="block p-2 rounded hover:bg-gray-700">Dashboard</Link>
        <Link href="/incoming" className="block p-2 rounded hover:bg-gray-700">Kiruvchi xatlar</Link>
        <Link href="/outgoing" className="block p-2 rounded hover:bg-gray-700">Chiquvchi xatlar</Link>
        <Link href="/control" className="block p-2 rounded hover:bg-gray-700">Ijro nazorati</Link>
        <Link href="/reports" className="block p-2 rounded hover:bg-gray-700">Hisobotlar</Link>
        <Link href="/users" className="block p-2 rounded hover:bg-gray-700">Foydalanuvchilar</Link>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <a href="/api/auth/signout?callbackUrl=/login" className="block p-2 text-center text-red-400 border border-red-400 rounded hover:bg-red-400 hover:text-white transition">Tizimdan chiqish</a>
      </div>
    </div>
  )
}

