export interface ProjectPayload {
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
