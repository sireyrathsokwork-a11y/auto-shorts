import { prisma } from '@autoshorts/db';
import { Router } from 'express';
import { generateScenes } from '../services/claude.service';
import { renderVideo } from '../services/renderVideo';
import { getMusicUrl } from '../util/music.util';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { projectId } = req.body;

    if (!projectId) {
      return res.status(400).json({ error: 'Project ID is required' });
    }

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: { musicTrack: true },
    });

    if (project) {
      const generated = await generateScenes({
        theme: project.theme,
        niche: project.niche,
      });

      const video = await prisma.video.create({
        data: {
          title: generated.title,
          script: JSON.stringify(generated.scenes),
          scenes: generated.scenes,
          projectId: projectId,
        },
      });

      try {
        const outputPath = await renderVideo(
          video.id,
          generated.scenes,
          getMusicUrl(project.musicTrack?.filePath),
        );

        const videoResult = await prisma.video.update({
          where: {
            id: video.id,
          },
          data: {
            videoUrl: outputPath,
          },
        });

        return res.status(201).json({
          status: 200,
          video: videoResult,
        });
      } catch (error) {
        if (video.id)
          await prisma.video.delete({
            where: {
              id: video.id,
            },
          });
        return res.status(500).json({ error: 'Failed to render video' });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to generate' });
  }
});

export default router;
