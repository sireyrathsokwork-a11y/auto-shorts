import { google } from 'googleapis';
import { prisma } from '@autoshorts/db';
import fs from 'fs';
import path from 'path';

export async function uploadVideo(videoId: string, userId: string) {
  const video = await prisma.video.findUnique({
    where: {
      id: videoId,
    },
  });

  if (!video) throw new Error(`Video not found : ${videoId}`);
  const userAccount = await prisma.account.findFirst({
    where: {
      userId: userId,
      provider: 'google',
    },
  });
  if (!userAccount)
    throw new Error(`No google account linked for user : ${userId}`);

  const oauth2Client = new google.auth.OAuth2({
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
  });

  oauth2Client.setCredentials({
    access_token: userAccount.access_token,
    refresh_token: userAccount.refresh_token,
  });

  const { credentials } = await oauth2Client.refreshAccessToken();

  await prisma.account.update({
    where: { id: userAccount.id },
    data: { access_token: credentials.access_token },
  });

  oauth2Client.on('tokens', async (tokens) => {
    if (tokens.access_token) {
      await prisma.account.update({
        where: {
          id: userAccount.id,
          provider: 'google',
        },
        data: {
          access_token: tokens.access_token,
        },
      });
    }
  });

  // initialize the Youtube API library
  const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

  const fileName = path.resolve(video.videoUrl as string);

  const res = await youtube.videos.insert({
    part: ['snippet', 'status'],
    requestBody: {
      snippet: {
        title: video.title,
        description: 'Testing YouTube upload via Google APIs Node.js Client',
      },
      status: {
        privacyStatus: 'private',
      },
    },
    media: {
      body: fs.createReadStream(fileName),
    },
  });

  if (res) {
    await prisma.video.update({
      where: { id: videoId },
      data: {
        youtubeVideoId: res.data.id,
        status: 'POSTED',
      },
    });
  }
  return res.data;
}
