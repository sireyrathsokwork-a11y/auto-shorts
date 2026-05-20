import { auth } from '@/app/lib/auth';
import { prisma } from '@autoshorts/db';

export const getProjects = async () => {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');

  return await prisma.project.findMany({
    where: { userId: session.user.id },
  });
};
