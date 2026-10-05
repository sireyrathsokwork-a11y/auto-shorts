// Remotion's headless browser fetches the track from this server's
// `/music-track` static route, so it needs an absolute URL.
const SERVER_URL = process.env.SERVER_URL ?? 'http://localhost:3001';

export const getMusicUrl = (filePath?: string | null) =>
  filePath ? `${SERVER_URL}${filePath}` : undefined;
