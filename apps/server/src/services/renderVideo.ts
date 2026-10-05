import { renderMedia, selectComposition } from '@remotion/renderer';
import { bundleLocation } from '../index';

export const renderVideo = async (
  videoId: string,
  scenes: any[],
  musicUrl?: string,
) => {
  const inputProps = { scenes, musicUrl };

  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: 'MyComp',
    inputProps,
  });

  const outputLocation = `outputs/${videoId}.mp4`;

  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: 'h264',
    outputLocation: `outputs/${videoId}.mp4`,
    inputProps,
  });

  return outputLocation;
};
