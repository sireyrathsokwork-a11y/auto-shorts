import { ProjectPayload } from '@autoshorts/types';
import { prisma } from '@autoshorts/db';
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const userId = req.headers['x-user-id'];
  if (!userId) {
    return res.status(400).json({
      status: 400,
      message: 'userId is required',
    });
  }

  try {
    const projects = await prisma.project.findMany({
      where: { userId: userId as string },
    });

    if( projects.length === 0 ){
      return res.status(200).json({
        status : 200 ,
        message : 'No project found'
      })
    }

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
  const userId = req.headers['x-user-id']
  try {
    const project = await prisma.project.create({
      data: {
        channelName: payload.channelName,
        niche: payload.niche,
        theme: payload.theme,
        trackId: payload.musicTrack,
        userId: String(userId),
      },
    });

    return res.status(201).json({ status: 201, project });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create project' });
  }
});

export default router;
