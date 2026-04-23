import { prisma } from '@autoshorts/db'
import { Router } from 'express'
import { generateScenes } from '../services/claude.service'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const { projectId, theme, niche } = req.body

    if (!projectId || !theme || !niche) {
      return res.status(400).json({ error: 'Missing fields' })
    }

    const scenes = await generateScenes({theme, niche})

    const video = await prisma.video.create({
      data: {
        title: scenes.title,
        script: JSON.stringify(scenes.scenes),
        scenes: scenes.scenes , 
        projectId: projectId
      }
    })

    return res.status(201).json({
      success: true,
      video: video
    })
    
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to generate' })
  }
})

export default router