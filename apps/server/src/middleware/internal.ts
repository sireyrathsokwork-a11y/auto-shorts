import { Request, Response, NextFunction } from 'express';

export const verifyInternalSecret = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.headers['x-internal-secret'] !== process.env.INTERNAL_SECRET) {
    return res.status(401).json({
      status: 401,
      message: 'Unauthorized',
    });
  }
  next();
};
