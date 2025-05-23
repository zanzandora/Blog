import { SignIn } from '@clerk/clerk-react';

const LoginPage = () => {
  return (
    <div className='flex h-[calc(100vh-80px)] items-center justify-center '>
      <SignIn signUpUrl='/register' />
    </div>
  );
};

export default LoginPage;
