import { SignIn } from '@/components/login';
import { auth } from '@/app/lib/auth';
import { prisma } from '@autoshorts/db';

const Page = async () => {
  const session = await auth();
  let user = null;
  if (session) {
    user = await prisma.user.findUnique({
      where: {
        id: session.user?.id,
      },
    });
  }

  return (
    <>
      {!session ? (
        <div className='text-center'>
          <SignIn provider='google' />
        </div>
      ) : (
        <div className='space-y-4'>welcome home</div>
      )}
    </>
  );
};

export default Page;
