import Link from "next/link";
import Image from "next/image";

export default function PublicHeader() {
  return (
    <div className='bg-white shadow-sm border-b border-gray-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-6'>
          <div className='flex items-center'>
            <div className='flex items-center space-x-3'>
              <Link href='/'>
                <Image
                  src='/favicon-dark-green.webp'
                  alt='FlexLiving Logo'
                  width={32}
                  height={32}
                  className='w-8 h-8'
                />
              </Link>
              <Link
                href='/'
                className='text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors'
              >
                FlexLiving
              </Link>
            </div>
          </div>
          <nav className='flex space-x-8'>
            <Link
              href='/dashboard'
              className='text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors'
            >
              Dashboard
            </Link>
            <Link
              href='/properties'
              className='text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors'
            >
              Properties
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
