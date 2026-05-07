import 'dotenv/config';
import { CronJob } from 'cron';
import { prisma } from '@autoshorts/db';
import { generateScenes } from '../services/claude.service';
import { renderVideo } from '../services/renderVideo';
import { uploadVideo } from '../services/youtube.service';
import { sendEmail } from '../services/resend.service';
import { generateApprovalToken } from '../util/jwt.util';

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

          //generate approval token
          const token = generateApprovalToken(project.userId, video.id);

          const redirectLink = `https://localhost:3002/video/decision?token=${token}`;

          const user = await prisma.user.findUnique({
            where: {
              id: project.userId,
            },
          });

          if (!user) continue;
          // mail preview short to user
          console.log('user email', user.email);
          await sendEmail(user.email as string, redirectLink);
          console.log('sending email successfully ...');
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
