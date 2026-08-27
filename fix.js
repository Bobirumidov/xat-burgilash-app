const fs = require('fs');

fs.writeFileSync('src/app/outgoing/page.tsx', import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { format } from 'date-fns';

export default async function OutgoingLetters() {
  const letters = await prisma.letter.findMany({
    where: { type: 'OUTGOING' },
    orderBy: { regDate: 'desc' }
  });

  return (
    <div className='p-8'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold'>Chiquvchi xatlar</h1>
        <Link href='/outgoing/new' className='bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700'>
          + Yangi chiquvchi xat
        </Link>
      </div>

      <div className='bg-white rounded-lg shadow overflow-hidden'>
        <table className='w-full text-left border-collapse'>
          <thead>
            <tr className='bg-gray-100 border-b'>
              <th className='p-3 font-semibold text-gray-700'>No</th>
              <th className='p-3 font-semibold text-gray-700'>Registratsiya raqami</th>
              <th className='p-3 font-semibold text-gray-700'>Sana</th>
              <th className='p-3 font-semibold text-gray-700'>Tashkilot</th>
              <th className='p-3 font-semibold text-gray-700'>Mavzu</th>
              <th className='p-3 font-semibold text-gray-700'>Status</th>
              <th className='p-3 font-semibold text-gray-700'>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {letters.map((letter, idx) => (
              <tr key={letter.id} className='border-b hover:bg-gray-50'>
                <td className='p-3'>{idx + 1}</td>
                <td className='p-3'>{letter.regNumber}</td>
                <td className='p-3'>{format(letter.regDate, 'dd.MM.yyyy')}</td>
                <td className='p-3'>{letter.receiverOrg}</td>
                <td className='p-3'>{letter.subject}</td>
                <td className='p-3'>
                  <span className='px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800'>
                    {letter.status}
                  </span>
                </td>
                <td className='p-3 space-x-2 text-sm'>
                  <Link href={\/outgoing/\\} className='text-blue-600 hover:underline'>Ko\\'rish</Link>
                  <Link href={\/outgoing/\/edit\} className='text-yellow-600 hover:underline'>Tahrirlash</Link>
                </td>
              </tr>
            ))}
            {letters.length === 0 && (
              <tr>
                <td colSpan={7} className='p-6 text-center text-gray-500'>Hech qanday xat topilmadi.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

