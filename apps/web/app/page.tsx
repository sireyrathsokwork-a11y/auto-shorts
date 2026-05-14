import { auth } from '@/app/lib/auth';
import { SignIn } from './(auth)/signin/page';
import { redirect } from 'next/navigation';

const Page = async () => {
  const session = await auth();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className='text-center'>
      <SignIn provider='google' />
    </div>
  );
};

export default Page;
