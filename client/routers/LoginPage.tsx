import { SignIn } from '@clerk/clerk-react';
import React from 'react';

type Props = {};

const LoginPage = (props: Props) => {
  return (
    <div className='flex h-[calc(100vh-80px)] items-center justify-center '>
      <SignIn signUpUrl='/register' />
    </div>
  );
};

export default LoginPage;
