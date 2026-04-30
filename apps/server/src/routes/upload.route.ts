import { Router } from 'express';
import { uploadVideo } from '../services/youtube.service';

const router = Router();

router.post('/', async (req, res) => {
  const { videoId, userId } = req.body;

  if (!videoId || !userId)
    return res
      .status(400)
      .json({ error: 'Missing required fields: videoId, userId' });

  try {
    const result = await uploadVideo(videoId, userId);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Upload error:', error);
    return res
      .status(500)
      .json({ error: error instanceof Error ? error.message : String(error) });
  }
});

export default router;
