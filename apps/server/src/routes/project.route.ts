import { prisma } from "@autoshorts/db";
import { ProjectPayload } from "@autoshorts/types/payload.type";
import { Router } from "express";

const router = Router()
router.post('/' , async(req, res)=>{
      const payload : ProjectPayload = req.body 

      const user =await prisma.user.findUnique({
        where : {
            id : payload.userId
        }
      })

      if ( !user){
        return res.status(404).json({error: 'User not found'})
      }else{
        try {
         const project =   await prisma.project.create({
              data : {
                channelName : payload.channelName,
                niche : payload.niche,
                musicTrack : payload.musicTrack,
                userId : payload.userId
              }
            })

            return res.status(201).json({ success: true, project })
            
        } catch (error) {
            return res.status(500).json({ error: 'Failed to create project' })
        }
      }
})

export default router