import { CommonError } from '@/types';

const Error = (err: CommonError) => {
  return (
    <div className='max-w-md mx-auto p-4 border border-white rounded-lg bg-gradient-to-b from-red-100 to-red-50 flex items-start space-x-3 shadow-md'>
      <div className='flex-shrink-0'>
        <div className='w-10 h-10 flex items-center justify-center bg-white border border-red-300 rounded-full'>
          <span className='text-red-500'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='size-6'
            >
              <path
                fillRule='evenodd'
                d='M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z'
                clipRule='evenodd'
              />
            </svg>
          </span>
        </div>
      </div>
      <div>
        <h3 className='text-lg font-semibold text-gray-900'>
          This is error message
        </h3>
        <p className='text-gray-700 text-sm'>
          {err.message || 'An unexpected error occurred.'}
        </p>
      </div>
    </div>
  );
};

export default Error;
