import { Router } from 'express';
import { verifyApprovalToken } from '../util/jwt.util';
import { uploadVideo } from '../services/youtube.service';
import { prisma } from '@autoshorts/db';
import { JwtPayload } from 'jsonwebtoken';

interface ApprovalTokenPayload extends JwtPayload {
  userId: string;
  videoId: string;
}

const router = Router();

router.post('/', async (req, res) => {
  const { action } = req.body;
  const token = req.query.token as string;

  try {
    const decode = verifyApprovalToken(token) as ApprovalTokenPayload;

    if (action === 'approve') {
      await uploadVideo(decode.videoId, decode.userId);
      res.status(200).json({
        status: 200,
        message: 'Uploaded',
      });
    } else {
      await prisma.video.update({
        where: {
          id: decode.videoId,
        },
        data: {
          status: 'REJECTED',
        },
      });
      res.status(200).json({
        status: 200,
        message: 'Rejected',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
});

export default router;
