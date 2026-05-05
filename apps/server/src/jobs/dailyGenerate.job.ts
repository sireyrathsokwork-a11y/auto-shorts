import 'dotenv/config';
import { CronJob } from 'cron';
import { prisma } from '@autoshorts/db';
import { generateScenes } from '../services/claude.service';
import { renderVideo } from '../services/renderVideo';
import { uploadVideo } from '../services/youtube.service';

export const job = new CronJob(
  '0 */1 * * * *',
  async function () {
    const time = new Date().toTimeString().slice(0, 5);
    const dueProjects = await prisma.project.findMany({
      where: {
        postingTime: time,
      },
    });

    console.log('cron is checking');

    if (dueProjects) {
      console.log('dueProjects :', dueProjects);
    }

    if (dueProjects.length > 0) {
      for (const project of dueProjects) {
        try {
          if (!project.theme || !project.niche) continue;
          const generated = await generateScenes({
            theme: project.theme,
            niche: project.niche,
          });

          console.log('generated: ', generated);

          const video = await prisma.video.create({
            data: {
              title: generated.title,
              script: JSON.stringify(generated.scenes),
              scenes: generated.scenes,
              projectId: project.id,
            },
          });

          const outputPath = await renderVideo(video.id, generated.scenes);

          await prisma.video.update({
            where: {
              id: video.id,
            },
            data: {
              videoUrl: outputPath,
            },
          });

          console.log('uploading video-----');
          await uploadVideo(video.id, project.userId);
          console.log('uploaded succefully....Yayyyyyy :))');
        } catch (error) {
          console.log(error);
          continue;
        }
      }
    }
  }, // onTick
  null, // onComplete
  true, // start
  'Asia/Phnom_Penh',
);
