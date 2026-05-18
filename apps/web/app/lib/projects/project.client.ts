import { Project } from '@autoshorts/db/generated/prisma/client';
import {
  APIErrorResponse,
  APIResponse,
  ProjectPayload,
} from '@autoshorts/types';
export const createProject = async (
  payload: ProjectPayload,
): Promise<APIResponse<Project> | APIErrorResponse> => {
  const res = await fetch('/api/projects/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return await res.json();
};
