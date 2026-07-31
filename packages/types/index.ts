export interface ProjectPayload {
  userId : string
  channelName: string;
  theme: string;
  niche: string;
  musicTrack: string;
  postingTime: string;
}

export interface ScenePayload {
  theme: string;
  niche: string;
}

export interface APIResponse<T> {
  status: number;
  data: T;
}

export interface APIErrorResponse {
  status: number;
  message: string;
}

export interface MusicTrackInfo  {
  name: string;
  path: string;
  attr: string;
};