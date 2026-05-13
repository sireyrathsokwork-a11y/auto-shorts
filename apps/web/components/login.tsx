import { signIn } from '@/app/lib/auth';
import { Button } from './ui/button';
import PageContainer from '@/app/layout/PageContainer';
import GoogleIcon from '@/app/assets/google';
import Image from 'next/image';
import BgImage from '@/app/assets/bg.jpg';

export function SignIn({ provider }: { provider?: string }) {
  return (
    <PageContainer>
      <form
        action={async () => {
          'use server';
          await signIn(provider);
        }}
      >
        <main className='w-full h-screen flex'>
          <section className='relative w-1/2 h-full overflow-hidden'>
            <Image
              src={BgImage}
              alt='bg-image'
              fill
              className='opacity-80 scale-200'
              priority
            />
          </section>

          <section className='flex-1 h-full flex justify-center items-center bg-zinc-900'>
            <div className='flex flex-col gap-8 px-10 py-28 rounded-xl shadow-2xl shadow-zinc-700 bg-zinc-950 w-fit items-center'>
              <div className='flex flex-col gap-3 text-center'>
                <h1 className='text-h1'>Welcome to AutoShort</h1>
                <h2 className='text-h3'>
                  Please sign in to your AutoShort workspace
                </h2>
              </div>

              <Button
                type='submit'
                className='px-40 py-6'
              >
                <GoogleIcon />
                Continue with Google {provider}
              </Button>
            </div>
          </section>
        </main>
      </form>
    </PageContainer>
  );
}
