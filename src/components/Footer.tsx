export default function Footer() {
  return (
    <div className='bg-white shadow-sm border-t border-gray-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='py-6 text-center text-gray-600'>
          &copy; {new Date().getFullYear()} FlexLiving.
        </div>
      </div>
    </div>
  );
}
