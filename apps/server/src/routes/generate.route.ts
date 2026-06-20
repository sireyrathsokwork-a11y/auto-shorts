import { prisma } from '@autoshorts/db';
import { Router } from 'express';
import { generateScenes } from '../services/claude.service';
import { renderVideo } from '../services/renderVideo';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { projectId, theme, niche } = req.body;

    if (!projectId || !theme || !niche) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const generated = await generateScenes({ theme, niche });

    const video = await prisma.video.create({
      data: {
        title: generated.title,
        script: JSON.stringify(generated.scenes),
        scenes: generated.scenes,
        projectId: projectId,
      },
    });

   try {
    const outputPath = await renderVideo(video.id, generated.scenes);

    const videoResult = await prisma.video.update({
      where: {
        id: video.id,
      },
      data: {
        videoUrl: outputPath,
      },
    });

    return res.status(201).json({
      success: true,
      video: videoResult,
    });
   } catch (error) {

    if (video.id) await prisma.video.delete({
      where : {
        id : video.id
      }
    })
    return res.status(500).json({ error: 'Failed to render video' });
   }
  } catch (error) {

    console.error(error);
    return res.status(500).json({ error: 'Failed to generate' });
  }
});

export default router;
