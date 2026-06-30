import jwt from 'jsonwebtoken';

export const generateApprovalToken = (userId: string, videoId: string) => {
  try {
    return jwt.sign(
      {
        userId,
        videoId,
      },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: '1d' },
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const verifyApprovalToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY as string);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
