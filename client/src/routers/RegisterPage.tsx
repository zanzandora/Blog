import { SignUp } from '@clerk/clerk-react';

const RegisterPage = () => {
  return (
    <div className='flex h-screen items-center justify-center '>
      <SignUp signInUrl='/login' />
    </div>
  );
};

export default RegisterPage;
