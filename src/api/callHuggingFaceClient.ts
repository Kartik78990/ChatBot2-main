// src/api/callHuggingFaceClient.ts
export async function callHuggingFace(model: string, inputs: string) {
  const response = await fetch('/api/huggingface', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model, inputs }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch from HuggingFace API');
  }

  return response.json();
}
