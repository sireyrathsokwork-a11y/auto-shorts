import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@autoshorts/db';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub,
    Google({
      authorization: {
        params: {
          scope:
            'openid email profile https://www.googleapis.com/auth/youtube.upload',
          access_type: 'offline', // ensures refresh_token is returned
          prompt: 'consent',
        },
      },
    }),
  ],
});
