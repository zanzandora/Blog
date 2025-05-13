import { SignUp } from '@clerk/clerk-react';
import React from 'react';

type Props = {};

const RegisterPage = (props: Props) => {
  return (
    <div className='flex h-screen items-center justify-center '>
      <SignUp signInUrl='/login' />
    </div>
  );
};

export default RegisterPage;
