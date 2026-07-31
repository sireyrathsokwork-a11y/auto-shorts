import { MusicTrackInfo } from "./../../types/index";
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const musicTrack: MusicTrackInfo[] = [
  {
    name: 'SweetStory',
    path: '/music-track/sweet-story.mp3',
    attr: 'Music from Free To Use — Source: https://freetouse.com/music — Track by Pufino',
  },
  {
    name: 'ComingOfAge',
    path: '/music-track/coming-of-age.mp3',
    attr: 'Music from Free To Use — Source: https://freetouse.com/music — Track by Hazelwood',
  },
];

async function main() {
  for (const { name, path, attr } of musicTrack) {
    await prisma.musicTrack.create({
      data: {
        name,
        filePath: path,
        attribution: attr,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
