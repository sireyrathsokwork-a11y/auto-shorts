import { Project } from '@autoshorts/db/generated/prisma/client';
import {
  APIErrorResponse,
  APIResponse,
  ProjectPayload,
} from '@autoshorts/types';
export const createProject = async (
  payload: ProjectPayload,
): Promise<APIResponse<Project> | APIErrorResponse> => {
  const res = await fetch('/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return await res.json();
};
