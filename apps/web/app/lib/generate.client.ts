export const generateVideo = async ({ projectId }: { projectId: string }) => {
  const payload = {
    projectId,
  };
  try {
    const result = await fetch('/api/generate', {
      body: JSON.stringify(payload),
      method: 'POST',
    });

    if (result.ok) {
      return result.json();
    }
  } catch (error) {
    throw error;
  }
};
