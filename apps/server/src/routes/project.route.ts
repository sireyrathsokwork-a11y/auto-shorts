import { prisma } from '@autoshorts/db';
import { ProjectPayload } from '@autoshorts/types/payload.type';
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const userId = req.headers['x-user-id'];
  if (!userId) {
    return res.status(401).json({
      status: 401,
      message: 'User not found',
    });
  }

  try {
    const projects = await prisma.project.findMany({
      where: { userId: userId as string },
    });

    return res.status(200).json({
      status: 200,
      data: projects,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: 'Internal server error' });
  }
});

router.post('/create', async (req, res) => {
  const payload: ProjectPayload = req.body;

  const user = await prisma.user.findUnique({
    where: {
      id: payload.userId,
    },
  });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  } else {
    try {
      const project = await prisma.project.create({
        data: {
          channelName: payload.channelName,
          niche: payload.niche,
          theme: payload.theme,
          musicTrack: payload.musicTrack,
          userId: payload.userId,
        },
      });

      return res.status(201).json({ success: true, project });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create project' });
    }
  }
});

export default router;
