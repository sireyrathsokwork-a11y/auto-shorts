import { renderMedia, selectComposition } from '@remotion/renderer'
import { bundleLocation } from '../index'
import path from 'path'

export const renderVideo = async (videoId: string, scenes: any[]) => {
  const inputProps = { scenes }

  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: 'MyComp',
    inputProps,
  })

  const outputLocation = path.resolve(`outputs/${videoId}.mp4`)
  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: 'h264',
    outputLocation,
    inputProps,
  })

  return outputLocation
}