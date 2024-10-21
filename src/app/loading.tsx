export default function Loading() {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <div className='size-12 animate-spin rounded-full border-4 border-gray-200 border-t-primary-600'></div>
      <p className='mt-4'>Loading...</p>
    </div>
  )
};
