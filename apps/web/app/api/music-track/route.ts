import { getMusicTrack } from "@/app/lib/music-track";
import { NextResponse } from "next/server";

export async function GET() {
    const tracks = await getMusicTrack()
    return NextResponse.json(tracks)
    
}