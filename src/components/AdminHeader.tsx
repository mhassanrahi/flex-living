import Link from "next/link";
import Image from "next/image";

interface AdminHeaderProps {
  title?: string;
  subtitle?: string;
}

export default function AdminHeader({
  title = "FlexLiving Reviews Dashboard",
  subtitle = "Manage and analyze guest reviews across all properties",
}: AdminHeaderProps) {
  return (
    <div className='bg-white shadow-sm border-b border-gray-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-6'>
          <div className='flex items-center'>
            <div className='flex items-center space-x-3'>
              <Link href='/dashboard'>
                <Image
                  src='/favicon-dark-green.webp'
                  alt='FlexLiving Logo'
                  width={32}
                  height={32}
                  className='w-8 h-8'
                />
              </Link>
              <div>
                <h1 className='text-3xl font-bold text-gray-900'>{title}</h1>
                <p className='text-gray-600 mt-1'>{subtitle}</p>
              </div>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <Link
              href='/'
              className='text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors'
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
