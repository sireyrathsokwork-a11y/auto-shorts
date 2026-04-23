import { prisma } from "@autoshorts/db";
import { ProjectPayload } from "@autoshorts/types/payload.type";


export async function createProject ( data : ProjectPayload ) {

    const user = await prisma.user.findUnique({
        where : {
            id : data.userId
        }
    })

    if ( user) {
        try {
            await prisma.project.create({
                data : {
                    channelName : data.channelName,
                    niche : data.niche,
                    musicTrack : data.musicTrack,
                    userId : data.userId

                }
            })
        } catch (error) {
            
        }
    }

}