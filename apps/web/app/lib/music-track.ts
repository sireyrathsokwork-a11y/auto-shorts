import { prisma } from '@autoshorts/db';

export const getMusicTrack = async () => {
  return await prisma.musicTrack.findMany();
};
